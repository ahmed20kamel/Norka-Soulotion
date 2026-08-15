"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Replaces the generic "team high-fiving in an office" stock photo with an
// abstract connected-nodes composition (collaboration/network motif) in
// the brand palette — same gradient-mesh + grain language used elsewhere.
const NODES = [
  { x: 22, y: 30, r: 5 },
  { x: 48, y: 18, r: 7 },
  { x: 74, y: 32, r: 5 },
  { x: 34, y: 58, r: 6 },
  { x: 62, y: 62, r: 8 },
  { x: 20, y: 80, r: 4 },
  { x: 80, y: 76, r: 5 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 6],
];

export default function AboutArt({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden bg-[#060B18]", className)} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 30% 30%, #3B62FC55 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 75% 75%, #7C5CFC40 0%, transparent 55%)" }}
      />
      <div
        className="absolute inset-0 opacity-[.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
            stroke="#6384FF"
            strokeWidth={0.35}
            strokeOpacity={0.35}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 1, delay: i * 0.08, ease: "easeInOut" }}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r={n.r / 4}
            fill={i === 4 ? "#3B62FC" : "#6384FF"}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.4 + i * 0.07, type: "spring" }}
          />
        ))}
      </svg>

      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
    </div>
  );
}
