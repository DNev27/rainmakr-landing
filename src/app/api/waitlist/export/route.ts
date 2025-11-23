import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ----- ADDED: tiny server-side throttle (per instance) -----
const TTL_MS = 5_000; // 5 seconds
let lastHit = 0;

// Simple CSV escape (your original)
function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  if (/[,"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(req: Request) {
  // ----- ADDED: throttle -----
  const now = Date.now();
  if (now - lastHit < TTL_MS) {
    return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  }
  lastHit = now;

  // 1) Require a secret admin token (header or query)  (your original)
  const url = new URL(req.url);
  const headerToken = req.headers.get("x-admin-token");
  const queryToken = url.searchParams.get("token");
  const supplied = headerToken || queryToken || "";
  const expected = process.env.ADMIN_EXPORT_SECRET;

  if (!expected || supplied !== expected) {
    // Don’t leak which part failed
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Optional filters: ?from=2025-11-01&to=2025-12-01  (your original)
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  // 2) Create server-side Supabase client (service role only)  (your original)
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error("Export envs missing", {
      SUPABASE_URL: !!supabaseUrl,
      SUPABASE_SERVICE_ROLE_KEY: !!serviceKey,
    });
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // 3) Build the query  (your original)
  let query = supabase
    .from("waitlist")
    .select("id,email,created_at", { head: false })
    .order("created_at", { ascending: true });

  if (from) query = query.gte("created_at", from);
  if (to) query = query.lte("created_at", to);

  const { data, error } = await query;

  if (error) {
    console.error("Export query error:", error);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  // ----- ADDED: small audit log (count + requester IP only) -----
  const forwardedFor =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  console.info("[waitlist/export] ok", {
    rows: data?.length ?? 0,
    ip: forwardedFor.split(",")[0].trim(),
  });

  // 4) Render CSV  (your original)
  const rows = data ?? [];
  const header = ["id", "email", "created_at"];
  const lines = [header.join(",")];

  for (const r of rows) {
    lines.push([csvCell(r.id), csvCell(r.email), csvCell(r.created_at)].join(","));
  }

  const csv = lines.join("\n");
  const filename = `waitlist_${new Date().toISOString().slice(0, 10)}.csv`;

  // 5) Return as a downloadable CSV (now with stronger security headers)
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      // ----- ADDED: security headers -----
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "browsing-topics=()",
    },
  });
}
