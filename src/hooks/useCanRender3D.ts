"use client";

import { useEffect, useState } from "react";

// Extra device-memory hint some browsers expose — not in the standard
// lib.dom.d.ts Navigator type, so it's optional here.
interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
}

/**
 * Gate for the hero's React Three Fiber scene: false until proven
 * otherwise, and false whenever the device/user signals it shouldn't pay
 * for a WebGL canvas — reduced-motion preference, a small/mobile
 * viewport, or a low core count / low device memory. Runs once on mount
 * (SSR always gets false, avoiding a hydration mismatch) and reacts to
 * the reduced-motion media query and viewport resizes.
 */
export function useCanRender3D(): boolean {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as NavigatorWithHints;

    const evaluate = () => {
      const reducedMotion = mql.matches;
      const isMobileViewport = window.innerWidth < 768;
      const lowCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
      const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
      setCanRender(!reducedMotion && !isMobileViewport && !lowCores && !lowMemory);
    };

    evaluate();
    mql.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);
    return () => {
      mql.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return canRender;
}
