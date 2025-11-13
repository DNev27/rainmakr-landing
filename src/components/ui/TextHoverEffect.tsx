"use client";

import React from "react";

export function TextHoverEffect({
  text,
  sizeVW = 10,
  idleOpacity = 0.9,
  glowOpacity = 1,
  disableHover = false,
}: {
  text: string;
  sizeVW?: number;
  idleOpacity?: number;
  glowOpacity?: number;
  disableHover?: boolean;
}) {
  return (
    <div className="relative flex justify-center items-center w-full">
      {/* Thin outline */}
      <span
        className="font-bold tracking-tight pointer-events-none"
        style={{
          fontSize: `${sizeVW}vw`,
          color: "transparent",
          WebkitTextStroke: "1.2px #ff27d8",
          opacity: idleOpacity,
          transition: disableHover ? "none" : "opacity 0.3s ease",
        }}
      >
        {text}
      </span>

      {/* Glow */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          fontSize: `${sizeVW}vw`,
          WebkitTextStroke: 0,
          color: "#ff27d8",
          opacity: glowOpacity,
          filter: `drop-shadow(0 0 12px rgba(255, 39, 216, 0.65))`,
        }}
      >
        {text}
      </span>
    </div>
  );
}
