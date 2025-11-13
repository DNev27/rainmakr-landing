"use client";

import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import { useIsMobile } from "@/hooks/use-mobile";

export default function RainHero({
  scaleX = 1.3,
  sizeVW = 9,
  showGlow = true,
}: {
  scaleX?: number;
  sizeVW?: number;
  showGlow?: boolean;
}) {
  const isMobile = useIsMobile();

  const baseIdleOpacity = isMobile ? 0.5 : 0.7;
  const baseGlowOpacity = isMobile ? 0.6 : 1;

  return (
    <div className="relative w-full pointer-events-none flex items-center justify-center mt-6 mb-2">
      <div
        className="w-full max-w-[1400px]"
        style={{
          transform: `scaleX(${isMobile ? 1 : scaleX})`,
          transformOrigin: "center",
        }}
      >
        <TextHoverEffect
          text="RAINMAKR"
          sizeVW={sizeVW}
          idleOpacity={baseIdleOpacity}
          glowOpacity={baseGlowOpacity}
          disableHover={isMobile}
        />
      </div>
    </div>
  );
}
