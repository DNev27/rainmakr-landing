import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Simple CSV escape
function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  // escape quotes by doubling them, wrap in quotes if contains comma/quote/newline
  if (/[,"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(req: Request) {
  // 1) Require a secret admin token (header or query)
  const url = new URL(req.url);
  const headerToken = req.headers.get("x-admin-token");
  const queryToken = url.searchParams.get("token");
  const supplied = headerToken || queryToken || "";
  const expected = process.env.ADMIN_EXPORT_SECRET;

  if (!expected || supplied !== expected) {
    // Don’t leak which part failed
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Optional filters: ?from=2025-11-01&to=2025-12-01
  const from = url.searchParams.get("from"); // ISO date or timestamp
  const to = url.searchParams.get("to");

  // 2) Create server-side Supabase client (service role only)
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

  // 3) Build the query
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

  // 4) Render CSV
  const rows = data ?? [];
  const header = ["id", "email", "created_at"];
  const lines = [header.join(",")];

  for (const r of rows) {
    lines.push([csvCell(r.id), csvCell(r.email), csvCell(r.created_at)].join(","));
  }

  const csv = lines.join("\n");
  const filename = `waitlist_${new Date().toISOString().slice(0, 10)}.csv`;

  // 5) Return as a downloadable CSV
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
