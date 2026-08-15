"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom abstract art replacing the generic desk/laptop stock photos —
// same gradient-mesh + dot-grid + grain language as the homepage hero
// (src/components/home/HeroSection.tsx), so every service card reads as
// part of one visual system instead of stock photography.
const GRADIENT_PAIRS: [string, string][] = [
  ["#3B62FC", "#6384FF"], // software
  ["#7C5CFC", "#3B62FC"], // mobile
  ["#22D3EE", "#3B62FC"], // erp
  ["#3B62FC", "#818CF8"], // web
  ["#2848D8", "#22D3EE"], // infrastructure
  ["#7C5CFC", "#818CF8"], // uiux
  ["#3B62FC", "#7C5CFC"], // marketing
  ["#2848D8", "#6384FF"], // consulting
];

interface ServiceArtProps {
  Icon: LucideIcon;
  /** Index into the fixed gradient palette above — keep stable per service key. */
  variant: number;
  className?: string;
}

export default function ServiceArt({ Icon, variant, className }: ServiceArtProps) {
  const prefersReduced = useReducedMotion();
  const [from, to] = GRADIENT_PAIRS[variant % GRADIENT_PAIRS.length];

  return (
    <div className={cn("relative overflow-hidden bg-[#060B18]", className)} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 28% 24%, ${from}59 0%, transparent 60%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 78% 82%, ${to}4d 0%, transparent 55%)` }}
      />
      <div
        className="absolute inset-0 opacity-[.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.82, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: prefersReduced ? 0 : 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Icon className="w-[58%] h-[58%] text-white/10" strokeWidth={1} />
      </motion.div>
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060B18]/70 via-transparent to-transparent" />
    </div>
  );
}
