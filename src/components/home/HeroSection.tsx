"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images.config";
import { COMPANY_STATS } from "@/lib/constants";
import { useRef } from "react";

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t    = useTranslations("hero");
  const isAr = locale === "ar";
  const ref  = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityBg = useTransform(scrollYProgress, [0, .55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060B18]"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* ── Video Background ─────────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
        {/* Fallback image — shows before video loads */}
        <Image
          src={images.hero.fallback.src}
          alt={images.hero.fallback.alt}
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />

        {/* Actual video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={images.hero.video.webm} type="video/webm" />
          <source src={images.hero.video.mp4} type="video/mp4" />
        </video>

        {/* Layered overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060B18]/80 via-[#060B18]/65 to-[#060B18]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B18]/75 via-[#060B18]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B18]/60 via-transparent to-[#060B18]/30" />
      </motion.div>

      {/* ── Animated accent glow on top of video ─────────────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [.3, .55, .3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,98,252,.22) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [.2, .4, .2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,132,255,.18) 0%, transparent 65%)" }}
        />
      </div>

      {/* ── Corner brackets ──────────────────────────────────── */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div style={{ opacity: opacityBg }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 md:py-52">
          <div className="max-w-2xl">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5 }}
              className="flex items-center gap-2 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[.22em] text-blue-400/80">
                {t("badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .1 }}
              className="font-heading text-display font-black text-white mb-5 leading-[1.02]"
            >
              {t("title")}
              <span className="block gradient-text-animated">
                {t("titleHighlight")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: .22 }}
              className="text-base md:text-lg text-slate-300/75 max-w-xl mb-10 leading-relaxed"
            >
              {t("description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .34 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary text-sm px-7 py-3.5"
              >
                {t("cta1")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/portfolio`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-slate-300 border border-white/12 hover:border-white/28 hover:text-white backdrop-blur-sm transition-all duration-300"
              >
                {t("cta2")}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .75, duration: .6 }}
              className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-white/[.07]"
              role="list"
              aria-label={isAr ? "إحصاءات" : "Statistics"}
            >
              {[
                { num: COMPANY_STATS.projects, label: t("statsProjects") },
                { num: COMPANY_STATS.clients,  label: t("statsClients") },
                { num: COMPANY_STATS.years,    label: t("statsYears") },
              ].map((s) => (
                <div key={s.label} role="listitem">
                  <span className="block text-3xl font-black text-white leading-none tracking-tight">
                    {s.num}
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-1.5 uppercase tracking-[.18em] font-semibold">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom fade ─────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-background dark:from-background-dark to-transparent z-10"
        aria-hidden="true"
      />

      {/* ── Scroll cue ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <span className="w-0.5 h-1.5 bg-white/25 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
