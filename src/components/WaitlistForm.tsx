"use client";

import { useState, FormEvent } from "react";
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
      setAlreadyOnList(Boolean(data.alreadyOnList));
      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to join waitlist");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-sm text-center font-medium">
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

      {errorMsg && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <GlowButton
        text={loading ? "Joining..." : "Join Waitlist"}
        type="submit"
      />
    </form>
  );
}
