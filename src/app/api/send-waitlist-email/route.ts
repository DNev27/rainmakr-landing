import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    const html = `
      <div style="background:#0b0b0f; padding:40px; color:white; font-family:Arial; border-radius:12px;">
        <h1 style="font-size:28px; color:#ff2bbf; margin-bottom:20px;">
          Welcome to RAINMAKR ⚡🌧️
        </h1>
        <p style="font-size:16px; line-height:1.6; color:#d1d1d6;">
          You're officially locked in and confirmed on the waitlist.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "You're officially on the RAINMAKR waitlist ⚡",
      html,
    });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
