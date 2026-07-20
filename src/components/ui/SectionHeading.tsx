"use client";

import { motion } from "framer-motion";
import { viewport } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      <h2
        className={`font-heading text-display-sm font-black mb-4 ${
          light ? "text-white" : "text-gray-900 dark:text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-2xl ${center ? "mx-auto" : ""} ${
            light ? "text-gray-300" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className={`divider-accent mt-6 ${center ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
