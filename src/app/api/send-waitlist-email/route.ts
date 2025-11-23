// src/app/api/send-waitlist-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_MAX = 254;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export async function POST(req: Request) {
  try {
    const { email: raw } = await req.json().catch(() => ({ email: "" }));
    const email = (raw ?? "").toString().trim().toLowerCase();

    // Only reject truly bad input
    if (!email || email.length > EMAIL_MAX || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Read SMTP envs (do NOT rename these)
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.EMAIL_FROM;

    // If SMTP isn’t configured, report “skipped” but don’t fail the flow
    if (!host || !port || !user || !pass || !from) {
      console.warn("send-waitlist-email: SMTP not configured — skipping send.");
      return NextResponse.json({
        sent: false,
        reason: "smtp_not_configured",
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // ForwardEmail uses STARTTLS on 587
      auth: { user, pass },
    });

    const html = `
      <div style="background:#0b0b0f; padding:40px; color:white; font-family:Arial; border-radius:12px;">
        <h1 style="font-size:28px; color:#ff2bbf; margin-bottom:20px;">
          Welcome to RAINMAKR ⚡🌧️
        </h1>
        <p style="font-size:16px; line-height:1.6; color:#d1d1d6;">
          You're officially locked in and confirmed on the waitlist.
        </p>
        <p style="font-size:16px; line-height:1.6; color:#d1d1d6;">
          We're building the world's first AI-powered negotiation assistant that
          eliminates the stress, ghosting, and frustration of online selling.
        </p>
        <p style="margin-top:25px; color:#888;">
          — The RAINMAKR Team
        </p>
      </div>
    `;

    try {
      const info = await transporter.sendMail({
        from,
        to: email,
        subject: "You're officially on the RAINMAKR waitlist ⚡",
        html,
      });

      return NextResponse.json({
        sent: true,
        messageId: info.messageId,
        accepted: info.accepted ?? [],
        rejected: info.rejected ?? [],
      });
    } catch (e: any) {
      // Report failure details but keep status 200 so upstream flows aren’t blocked
      console.warn("send-waitlist-email: SMTP send failed:", e);
      return NextResponse.json({
        sent: false,
        reason: "smtp_send_failed",
        code: e?.code,
        responseCode: e?.responseCode,
      });
    }
  } catch (err) {
    // Catch-all: still don’t break the main flow
    console.warn("send-waitlist-email: unexpected error:", err);
    return NextResponse.json({
      sent: false,
      reason: "unexpected_error",
    });
  }
}
