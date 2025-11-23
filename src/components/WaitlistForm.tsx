"use client";

import React, { useState, useEffect, FormEvent } from "react";
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
      // 1) Save to Supabase via API route (server will trigger the email)
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[#16141d] border border-gray-700 focus:border-pink-500 outline-none text-white"
        disabled={loading}
      />

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
