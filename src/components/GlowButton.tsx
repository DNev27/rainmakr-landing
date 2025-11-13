"use client";

import React from "react";
import clsx from "clsx";

export function GlowButton({
  text,
  type = "button",
  className,
}: {
  text: string;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      className={clsx(
        "relative px-8 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600",
        "shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.7)] transition-all",
        className
      )}
    >
      {text}
    </button>
  );
}
