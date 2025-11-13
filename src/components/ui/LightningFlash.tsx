"use client";

import { useEffect, useState } from "react";
import "@/styles/lightning.css";

export default function LightningFlash() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    function scheduleFlash() {
      const timeout = Math.random() * 6000 + 3000; // 3–9 seconds

      setTimeout(() => {
        // Main flash
        setFlash(true);

        setTimeout(() => {
          setFlash(false);

          // Optional micro second-flash (real lightning)
          setTimeout(() => {
            if (Math.random() > 0.5) {
              setFlash(true);
              setTimeout(() => setFlash(false), 80);
            }
          }, 120);

          scheduleFlash();
        }, 120);
      }, timeout);
    }

    scheduleFlash();
  }, []);

  return (
    <div
      className="lightning-flash"
      style={{
        opacity: flash ? 1 : 0
      }}
    />
  );
}
