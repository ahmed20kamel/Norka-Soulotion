"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { COMPANY_STATS } from "@/lib/constants";

export default function StatsCounter() {
  const t = useTranslations("stats");

  const stats = [
    { value: COMPANY_STATS.years,    label: t("years") },
    { value: COMPANY_STATS.projects, label: t("projects") },
    { value: COMPANY_STATS.clients,  label: t("clients") },
    { value: COMPANY_STATS.team,     label: t("team") },
  ];

  return (
    <section
      className="relative bg-gray-950 py-8 md:py-10 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Seam blend into the light ServicesPreview section below — a soft
          glow bleeding across the boundary reads as one continuous canvas
          instead of a hard color cut. */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[900px] h-[240px] bg-accent/[.12] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-surface dark:from-surface-dark/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap items-center justify-center"
          role="list"
          aria-label="Company achievement numbers"
        >
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className="flex items-center">
              <div role="listitem" className="flex items-baseline gap-2 px-6 py-1">
                <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <Separator orientation="vertical" className="h-8 bg-white/10 hidden sm:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
