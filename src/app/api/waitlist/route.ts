import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const EMAIL_MAX = 254;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export async function POST(req: Request) {
  try {
    // 1) Parse + normalize
    const { email: raw } = await req.json().catch(() => ({ email: "" }));
    const email = (raw ?? "").toString().trim().toLowerCase();

    if (!email || email.length > EMAIL_MAX || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // 2) DO NOT CHANGE ENV NAMES
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

    // 3) Check if already present (so we can return a friendly flag)
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

    // 4) Upsert to avoid duplicate-key errors on rapid submissions
    const { error: upsertErr } = await supabase
      .from("waitlist")
      .upsert({ email }, { onConflict: "email", ignoreDuplicates: false });

    if (upsertErr) {
      console.error("Upsert error:", upsertErr);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // 5) Fire best-effort confirmation email (only for first-time adds)
    if (!alreadyOnList) {
      try {
        const origin =
          process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
        await fetch(new URL("/api/send-waitlist-email", origin), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          // best-effort: don't block the response if the email route is slow
          cache: "no-store",
        });
      } catch (e) {
        console.warn("send-waitlist-email failed (non-fatal):", e);
      }
    }

    // 6) Friendly response for your UI
    return NextResponse.json({ success: true, alreadyOnList });
  } catch (err) {
    console.error("🔥 SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
