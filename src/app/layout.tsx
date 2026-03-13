// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://therainmakr.app"),
  title: "RAINMAKR — Close Smarter. Not Harder.",
  description: "AI-powered negotiation, pricing, staging, and secure escrow tools for marketplace sellers.",
  icons: {
    icon: [
      { url: "/rainmakr-favicon.webp", type: "image/webp" },
    ],
    shortcut: ["/rainmakr-favicon.webp"],
    apple: ["/rainmakr-favicon.webp"],
  },
  alternates: {
    canonical: "https://therainmakr.app",
  },
  openGraph: {
    title: "RAINMAKR — AI Negotiation for Marketplace Sellers",
    description:
      "Stop answering the same annoying questions. Let RAINMAKR handle negotiation, pricing, staging, and safer deal flow.",
    url: "https://therainmakr.app",
    siteName: "RAINMAKR",
    type: "website",
    images: [
      {
        url: "/og-rainmakr.jpg",
        width: 1200,
        height: 630,
        alt: "RAINMAKR — Close Smarter. Not Harder.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAINMAKR — AI Negotiation for Marketplace Sellers",
    description:
      "Stop answering the same annoying questions. Let RAINMAKR handle negotiation, pricing, staging, and safer deal flow.",
    images: ["/og-rainmakr.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        
      </body>
    </html>
  );
}
