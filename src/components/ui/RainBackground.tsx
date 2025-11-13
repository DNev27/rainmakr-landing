"use client";

import React, { useEffect, useState } from "react";
import "@/styles/rain.css";

export const RainBackground: React.FC = () => {
  const [drops, setDrops] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Generate drops ONLY on the client
    const arr: React.ReactNode[] = [];
    let inc = 0;

    while (inc < 100) {
      const randH = Math.floor(Math.random() * 98) + 1;
      const randF = Math.floor(Math.random() * 4) + 2;
      inc += randF;

      arr.push(
        <div
          key={inc}
          className="drop"
          style={{
            left: `${randH}%`,
            bottom: `${randF + randF - 1 + 100}%`,
            animationDelay: `0.${randH}s`,
            animationDuration: `0.5${randF}s`,
          }}
        />
      );
    }

    setDrops(arr);
  }, []); // Runs ONLY on client after mount

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="rain front-row">{drops}</div>
      <div className="rain back-row">{drops}</div>
    </div>
  );
};
