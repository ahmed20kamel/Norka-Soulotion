"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { images } from "@/lib/images.config";
import { useRef } from "react";

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t             = useTranslations("hero");
  const isAr           = locale === "ar";
  const ref            = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Subtle parallax on the photo only — a light, restrained animation
  // beat instead of the old hero's full-bleed animated gradient system.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative bg-white dark:bg-gray-950 pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* Soft brand-tinted glow, well behind the content — the one
          atmospheric touch left, replacing the old full dark gradient mesh */}
      <div
        className="absolute -top-40 end-[-10%] w-[560px] h-[560px] rounded-full bg-accent/[.08] dark:bg-accent/[.14] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Text column ─────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer(.12, .05)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem} className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[.22em] text-accent">
                {t("badge")}
              </span>
            </motion.div>

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

          {/* ── Photo column — real Dubai skyline, not abstract art ── */}
          <motion.div
            initial={{ opacity: 0, scale: .96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .8, delay: .2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-[var(--shadow-card-hover)]">
              <motion.div style={{ y: prefersReduced ? 0 : photoY }} className="absolute inset-0 -top-[6%] h-[112%]">
                <Image
                  src={images.home.heroSkyline.src}
                  alt={images.home.heroSkyline.alt}
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
      </div>
    </section>
  );
}
