"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import CountUp from "@/components/ui/CountUp";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { images } from "@/lib/images.config";
import { COMPANY_STATS } from "@/lib/constants";
import { useRef } from "react";

interface HeroSectionProps {
  locale: string;
}

// COMPANY_STATS values are strings like "150+" — split into the numeric
// part CountUp animates and the trailing suffix it appends once done.
function splitStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return { end: match ? Number(match[1]) : 0, suffix: match ? match[2] : "" };
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t             = useTranslations("hero");
  const tStats        = useTranslations("stats");
  const isAr           = locale === "ar";
  const ref            = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const stats = [
    { ...splitStat(COMPANY_STATS.years),    label: tStats("years") },
    { ...splitStat(COMPANY_STATS.projects), label: tStats("projects") },
    { ...splitStat(COMPANY_STATS.clients),  label: tStats("clients") },
    { ...splitStat(COMPANY_STATS.team),     label: tStats("team") },
  ];

  // Subtle parallax on the photo only — a light, restrained animation
  // beat instead of the old hero's full-bleed animated gradient system.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative bg-white dark:bg-gray-950 pt-24 pb-10 md:pt-28 md:pb-12 overflow-hidden"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* Soft brand-tinted glow, well behind the content — the one
          atmospheric touch left, replacing the old full dark gradient mesh */}
      <div
        className="absolute -top-40 end-[-10%] w-[560px] h-[560px] rounded-full bg-accent/[.08] dark:bg-accent/[.14] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* items-start (not -center): centering a shorter text column
            against a taller photo was leaving dead space under the text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Text column ─────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer(.12, .05)}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={staggerItem}
              className="font-heading text-display font-black text-gray-900 dark:text-white mb-6 leading-[1.05]"
            >
              {t("title")}
              <span className="block text-accent">
                {t("titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-base md:text-lg font-normal text-gray-500 dark:text-gray-400 max-w-lg mb-10 leading-relaxed"
            >
              {t("description")}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contact`}
                className={buttonVariants({ className: "text-sm px-8 py-4 h-auto rounded-xl" })}
              >
                {t("cta1")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/portfolio`}
                className={buttonVariants({
                  variant: "outline",
                  className: "text-sm px-8 py-4 h-auto rounded-xl",
                })}
              >
                {t("cta2")}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Photo column — a real software workspace, not a city
               skyline or abstract art — this is a software company ── */}
          <motion.div
            initial={{ opacity: 0, scale: .96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .8, delay: .2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[var(--shadow-card-hover)]">
              <motion.div style={{ y: prefersReduced ? 0 : photoY }} className="absolute inset-0 -top-[6%] h-[112%]">
                <Image
                  src={images.home.heroWorkspace.src}
                  alt={images.home.heroWorkspace.alt}
                  fill
                  priority
                  fetchPriority="high"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/25 via-transparent to-transparent" />
            </div>
            {/* Decorative accent frame, same device already used on AboutPreview */}
            <div
              className="absolute -bottom-5 -end-5 w-full h-full rounded-3xl border-2 border-accent/15 -z-10"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* ── Stats — full-width row so all four fit on one line,
             instead of being squeezed into the (narrower) text column ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: .5 }}
          className="flex flex-wrap justify-between gap-x-6 gap-y-4 mt-10 md:mt-12 pt-8 border-t border-gray-100 dark:border-gray-800"
          aria-label="Company statistics"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
