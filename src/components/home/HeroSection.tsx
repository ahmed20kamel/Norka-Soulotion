"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  const yBg       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacityBg = useTransform(scrollYProgress, [0, .55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* ── Background ──────────────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
        <Image
          src={images.hero.fallback.src}
          alt={images.hero.fallback.alt}
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
          aria-hidden="true"
        >
          <source src={images.hero.video.src} type={images.hero.video.type} />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/75 via-gray-950/60 to-gray-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 via-transparent to-transparent" />
      </motion.div>

      {/* ── Ambient orb ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,.12) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div style={{ opacity: opacityBg }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 md:py-52">
          <div className="max-w-2xl">

            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5 }}
              className="text-xs font-semibold uppercase tracking-[.22em] text-accent mb-6"
            >
              {t("badge")}
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .1 }}
              className="font-heading text-display font-black text-white mb-5 leading-[1.03]"
            >
              {t("title")}
              <span className="block gradient-text-animated mt-1">
                {t("titleHighlight")}
              </span>
            </motion.h1>

            {/* Description — one short line */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .22 }}
              className="text-base md:text-lg text-gray-300/75 max-w-xl mb-10 leading-relaxed"
            >
              {t("description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .34 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary text-sm"
                aria-label={isAr ? "تواصل معنا" : "Get in touch"}
              >
                {t("cta1")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/portfolio`}
                className="btn btn-ghost text-sm"
                aria-label={isAr ? "شاهد أعمالنا" : "View our work"}
              >
                {t("cta2")}
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .7, duration: .6 }}
              className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-white/[.07]"
              role="list"
              aria-label={isAr ? "إحصاءات الشركة" : "Company statistics"}
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
                  <span className="block text-[11px] text-white/35 mt-1.5 uppercase tracking-[.15em] font-medium">
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
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <span className="w-0.5 h-1.5 bg-white/25 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
