import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const EMAIL_MAX = 254;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// --- naive in-memory rate limit (dev/local only) ---
const WINDOW_MS = 10_000; // 10s window
const MAX_HITS = 8;       // allow 8 submits per IP per window
const hits: Record<string, { count: number; resetAt: number }> = {};

function allow(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "local";

  const now = Date.now();
  const bucket = hits[ip] ?? { count: 0, resetAt: now + WINDOW_MS };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + WINDOW_MS;
  }

  bucket.count += 1;
  hits[ip] = bucket;
  return bucket.count <= MAX_HITS;
}

// --- anti-bot knobs ---
const MIN_FILL_MS = 1500; // only enforced if client sends startedAt

export async function POST(req: Request) {
  try {
    // rate-limit: return 429 if too many in this window
    if (!allow(req)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // 1) Parse payload safely
    const body = await req.json().catch(() => ({}) as any);

    // Honeypot: common names a bot might fill (keep both for flexibility)
    const honeypot =
      (body?.website ?? body?.hp ?? "").toString().trim();

    // If honeypot is filled, silently succeed (no DB write, no email)
    if (honeypot.length > 0) {
      return new NextResponse(null, { status: 204 });
    }

    // Human-time check (only if client sent a timestamp)
    const startedAt = Number(body?.startedAt ?? NaN);
    if (Number.isFinite(startedAt)) {
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_FILL_MS) {
        // Act like success to avoid training bots
        return new NextResponse(null, { status: 204 });
      }
    }

    // 2) Normalize + validate email
    const raw = (body?.email ?? "").toString();
    const email = raw.trim().toLowerCase();

    if (!email || email.length > EMAIL_MAX || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // 3) DO NOT CHANGE ENV NAMES
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error("Waitlist envs missing", {
        SUPABASE_URL: !!supabaseUrl,
        SUPABASE_SERVICE_ROLE_KEY: !!serviceKey,
      });
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // 4) Check if already present (for friendly UI)
    const { data: existing, error: lookupErr } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (lookupErr) {
      console.error("Lookup error:", lookupErr);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const alreadyOnList = !!existing;

    // 5) Upsert to avoid duplicate-key errors on rapid submissions
    const { error: upsertErr } = await supabase
      .from("waitlist")
      .upsert({ email }, { onConflict: "email", ignoreDuplicates: false });

    if (upsertErr) {
      console.error("Upsert error:", upsertErr);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // 6) Best-effort confirmation email (only first-time adds)
    if (!alreadyOnList) {
      try {
        const origin =
          process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
        await fetch(new URL("/api/send-waitlist-email", origin), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          cache: "no-store",
        });
      } catch (e) {
        console.warn("send-waitlist-email failed (non-fatal):", e);
      }
    }

    // 7) Friendly response for your UI
    return NextResponse.json({ success: true, alreadyOnList });
  } catch (err) {
    console.error("🔥 SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
