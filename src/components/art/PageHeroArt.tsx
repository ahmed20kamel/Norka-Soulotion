"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Replaces the four inner-page stock hero photos (about/services/
// portfolio/contact) with the same painterly gradient-mesh language as
// the homepage hero (src/components/home/HeroSection.tsx) — each variant
// nudges the blob positions/hues so pages stay visually distinct while
// still reading as one continuous system rather than stacked templates.
type Variant = "about" | "services" | "portfolio" | "contact";

const VARIANTS: Record<Variant, { blobs: { color: string; top: string; inset: string; size: number; blur: number; opacity: number }[] }> = {
  about: {
    blobs: [
      { color: "#3B62FC", top: "-10%", inset: "end-[20%]", size: 560, blur: 110, opacity: 0.55 },
      { color: "#7C5CFC", top: "20%", inset: "-end-16", size: 460, blur: 100, opacity: 0.4 },
      { color: "#22D3EE", top: "60%", inset: "end-[6%]", size: 420, blur: 110, opacity: 0.28 },
    ],
  },
  services: {
    blobs: [
      { color: "#3B62FC", top: "-14%", inset: "end-[30%]", size: 600, blur: 115, opacity: 0.6 },
      { color: "#22D3EE", top: "10%", inset: "-end-12", size: 420, blur: 100, opacity: 0.32 },
      { color: "#6384FF", top: "55%", inset: "end-[12%]", size: 480, blur: 110, opacity: 0.3 },
    ],
  },
  portfolio: {
    blobs: [
      { color: "#7C5CFC", top: "-8%", inset: "end-[24%]", size: 580, blur: 112, opacity: 0.5 },
      { color: "#3B62FC", top: "24%", inset: "-end-20", size: 500, blur: 105, opacity: 0.38 },
      { color: "#22D3EE", top: "58%", inset: "end-[18%]", size: 400, blur: 105, opacity: 0.26 },
    ],
  },
  contact: {
    blobs: [
      { color: "#3B62FC", top: "-12%", inset: "end-[18%]", size: 560, blur: 110, opacity: 0.58 },
      { color: "#6384FF", top: "18%", inset: "-end-14", size: 440, blur: 100, opacity: 0.34 },
      { color: "#7C5CFC", top: "62%", inset: "end-[10%]", size: 420, blur: 108, opacity: 0.28 },
    ],
  },
};

interface PageHeroArtProps {
  variant: Variant;
  className?: string;
}

export default function PageHeroArt({ variant, className }: PageHeroArtProps) {
  const prefersReduced = useReducedMotion();
  const { blobs } = VARIANTS[variant];

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-[#060B18]", className)} aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={prefersReduced ? { opacity: b.opacity } : { opacity: [b.opacity * 0.75, b.opacity, b.opacity * 0.75] }}
          transition={prefersReduced ? { duration: 0 } : { duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          className={cn("absolute rounded-full", b.inset)}
          style={{
            top: b.top,
            width: b.size,
            height: b.size,
            background: b.color,
            filter: `blur(${b.blur}px)`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
