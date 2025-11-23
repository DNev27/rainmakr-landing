import { NextResponse, type NextRequest } from "next/server";

/**
 * Simple in-memory token bucket per IP for the Middleware lifetime.
 * Middleware runs on the Edge runtime; a Map is fine but NOT shared across regions/instances.
 * This is a light guard to stop bursts & bots — we already protected the export route with a secret.
 */

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10_000); // 10s window
const MAX_HITS  = Number(process.env.RATE_LIMIT_MAX ?? 20);          // 20 requests per window

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

function getClientKey(req: NextRequest): string {
  // prefer x-forwarded-for (may contain a list), fall back to other common headers
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  // last resort: user-agent + url (weak, but better than nothing)
  return `${req.headers.get("user-agent") ?? "ua"}|${req.nextUrl.pathname}`;
}

export function middleware(req: NextRequest) {
  // Only guard write-y routes; reads are cheap. Matcher below scopes to /api/**
  const key = getClientKey(req);
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.reset) {
    buckets.set(key, { count: 1, reset: now + WINDOW_MS });
    return NextResponse.next();
  }

  if (bucket.count >= MAX_HITS) {
    const retryAfter = Math.max(1, Math.ceil((bucket.reset - now) / 1000));
    return new NextResponse(
      JSON.stringify({ error: "Too Many Requests", retryAfter }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  bucket.count += 1;
  return NextResponse.next();
}

// Run only on API routes.
// If later you want to add pages, extend this array.
export const config = {
  matcher: ["/api/:path*"],
};
