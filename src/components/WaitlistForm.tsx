"use client";

import { useState } from "react";
import { GlowButton } from "@/components/GlowButton";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success
      setSubmitted(true);
      setEmail("");

    } catch (err: any) {
      setErrorMsg(err.message || "Failed to join waitlist");
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <p className="text-sm text-green-400 text-center font-medium">
        You’re on the waitlist — we’ll notify you soon! 🚀
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
