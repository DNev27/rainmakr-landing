import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";
import { RainBackground } from "@/components/ui/RainBackground";
import RainHero from "@/components/RainHero";
import LightningFlash from "@/components/ui/LightningFlash";


export default function Page() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
  <RainBackground />
  <LightningFlash />   
</div>


      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center space-y-6">

        <Image
          src="/rainmakr-favicon.webp"
          alt="RAINMAKR Logo"
          width={110}
          height={110}
          className="mb-2"
        />

        {/* Outline text */}
        <RainHero scaleX={1.2} sizeVW={9} />

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Close Smarter.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400">
            Not Harder.
          </span>
        </h1>

        <p className="max-w-xl text-gray-300">
          RAINMAKR automates negotiation and escrow for safer, faster Marketplace deals.
          Analyze buyers, optimize pricing, and close with confidence.
        </p>

        {/* NEW: Sign up message */}
        <p className="text-sm text-gray-400 mt-2">
          Sign up and be the first to experience the power of selling with AI.
        </p>

        <div className="mt-4 w-full max-w-md">
          <WaitlistForm />
        </div>

        <p className="mt-12 text-xs text-gray-500">
          © {new Date().getFullYear()} RAINMAKR — All Rights Reserved.
        </p>
      </section>
    </main>
  );
}
