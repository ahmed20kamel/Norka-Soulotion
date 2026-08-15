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
    <div className="relative z-10 -mt-10 md:-mt-14 px-4 sm:px-6 lg:px-8" aria-label="Company statistics">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: .6 }}
        className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-[var(--shadow-card-hover)] ring-1 ring-gray-100 dark:ring-gray-800 px-6 md:px-10 py-8 md:py-9"
      >
        <motion.div
          variants={staggerContainer(.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap items-center justify-center md:justify-between"
          role="list"
          aria-label="Company achievement numbers"
        >
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className="flex items-center">
              <div role="listitem" className="flex items-baseline gap-2 px-6 py-1">
                <span className="text-2xl md:text-3xl font-black text-accent tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <Separator orientation="vertical" className="h-8 bg-gray-200 dark:bg-gray-700 hidden md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
