"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from "framer-motion";

interface UseTiltOptions {
  /** Max rotation in degrees at the card's edge. */
  max?: number;
}

interface UseTiltResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<T>) => void;
  onMouseLeave: () => void;
  /** Spread onto the tilted element: sets the 3D stage + resets it for reduced-motion users. */
  style: { transformStyle: "preserve-3d"; rotateX: MotionValue<number>; rotateY: MotionValue<number> };
}

/**
 * Mouse-tracking tilt-on-hover for cards — `transform-style: preserve-3d`
 * plus a spring-smoothed rotateX/rotateY driven by cursor position within
 * the element. No-ops (flat, springs never move) when the user prefers
 * reduced motion. Generic over the concrete element type so it can back a
 * `motion.article`, `motion.div`, etc. without a ref type mismatch.
 */
export function useTilt<T extends HTMLElement = HTMLElement>({ max = 8 }: UseTiltOptions = {}): UseTiltResult<T> {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 220, damping: 22 });

  const onMouseMove = (e: React.MouseEvent<T>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * max * 2);
    rawRotateX.set(-py * max * 2);
  };

  const onMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave, style: { transformStyle: "preserve-3d", rotateX, rotateY } };
}
