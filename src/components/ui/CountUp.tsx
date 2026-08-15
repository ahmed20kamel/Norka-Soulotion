"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animates 0 -> end once the number scrolls into view (via requestAnimationFrame,
 * not setInterval — smoother and cheaper). Jumps straight to `end` for
 * prefers-reduced-motion users instead of animating.
 */
export default function CountUp({ end, suffix = "", duration = 1.6, className }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      // One-time sync to the final value for reduced-motion users, not a cascading loop.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(end);
      return;
    }

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
