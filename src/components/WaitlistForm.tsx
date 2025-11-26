"use client";

import React, { useState, useEffect, FormEvent, useMemo } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";            // ← added
import { GlowButton } from "@/components/GlowButton";

type WaitlistResponse =
  | { success: true; alreadyOnList?: boolean }
  | { error: string };

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadyOnList, setAlreadyOnList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [count, setCount] = useState<number | null>(null);

  // --- Honeypot fields ---
  const [website, setWebsite] = useState(""); // should remain empty
  const [startedAt, setStartedAt] = useState<number | null>(null); // set on mount

  // --- hCaptcha ---
  const [captchaToken, setCaptchaToken] = useState<string>("");     // ← added

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const trapStyle = useMemo(
    () =>
      ({
        position: "absolute",
        left: "-9999px",
        width: 1,
        height: 1,
        overflow: "hidden",
      }) as React.CSSProperties,
    []
  );

  // Fetch current waitlist count (API caches for 60s)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/waitlist/count")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!cancelled && typeof d?.count === "number") setCount(d.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setAlreadyOnList(false);

    try {
      if (!captchaToken) {
        throw new Error("Please complete the captcha");
      }

      // 1) Save to Supabase via API route (server will trigger the email)
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,        // honeypot
          startedAt,      // ms timestamp; server checks minimum dwell time
          hcaptchaToken: captchaToken, // ← added
        }),
      });

      const data: WaitlistResponse = await res.json();

      if (!res.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Something went wrong");
      }

      // 2) Reflect server result in UI
      const wasAlready = Boolean(data.alreadyOnList);
      setAlreadyOnList(wasAlready);
      setSubmitted(true);
      setEmail("");

      // Reset traps + captcha after submit
      setWebsite("");
      setStartedAt(Date.now());
      setCaptchaToken("");

      // 3) Best-effort refresh of count if we just added a new person
      if (!wasAlready) {
        fetch("/api/waitlist/count")
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then((d) => {
            if (typeof d?.count === "number") setCount(d.count);
          })
          .catch(() => {});
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to join waitlist");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-2">
        <p className="text-sm font-medium">
          {alreadyOnList ? (
            <span className="text-emerald-400">
              You’re already on the waitlist — we’ll email you soon! ✅
            </span>
          ) : (
            <span className="text-green-400">
              You’re on the waitlist — we’ll notify you soon! 🚀
            </span>
          )}
        </p>
        {typeof count === "number" && (
          <p className="text-xs text-gray-400">
            Current waitlist: {count.toLocaleString()}
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center gap-3 w-full max-w-md mx-auto"
      autoComplete="off"
    >
      {/* Visible email field */}
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[#16141d] border border-gray-700 focus:border-pink-500 outline-none text-white"
        disabled={loading}
        autoComplete="off"
        inputMode="email"
      />

      {/* hCaptcha widget */}
      <div className="w-full">
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY as string}
          onVerify={(tok) => setCaptchaToken(tok)}
          reCaptchaCompat={false}
          theme="dark"
        />
      </div>

      {/* Honeypot fields (hidden off-screen & from AT) */}
      <div style={trapStyle} aria-hidden>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            name="website"
          />
        </label>
        <input
          type="text"
          tabIndex={-1}
          readOnly
          value={startedAt ?? ""}
          name="startedAt"
        />
      </div>

      {typeof count === "number" && (
        <p className="text-xs text-gray-400 self-start">
          Already {count.toLocaleString()} in line
        </p>
      )}

      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

      <GlowButton text={loading ? "Joining..." : "Join Waitlist"} type="submit" />
    </form>
  );
}
