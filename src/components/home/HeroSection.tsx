"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images.config";
import { COMPANY_STATS } from "@/lib/constants";
import { useRef } from "react";

interface HeroSectionProps {
  locale: string;
}

const trustBadges = [
  { icon: Shield, labelEn: "ISO Certified", labelAr: "معتمد ISO" },
  { icon: Zap,    labelEn: "Fast Delivery",  labelAr: "تسليم سريع" },
  { icon: Sparkles, labelEn: "AI-Powered",   labelAr: "مدعوم بالذكاء الاصطناعي" },
];

export default function HeroSection({ locale }: HeroSectionProps) {
  const t   = useTranslations("hero");
  const isAr = locale === "ar";
  const ref  = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg      = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityBg = useTransform(scrollYProgress, [0, .6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* ── Parallax Background ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
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

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/65 to-gray-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/20 to-transparent" />
      </motion.div>

      {/* ── Animated ambient orbs ───────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[8%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,169,110,.09) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-[5%] left-[2%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,169,110,.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: opacityBg }}
        className="relative z-10 w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 md:py-48">
          <div className="max-w-3xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="badge badge-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                {t("badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .7, delay: .12 }}
              className="font-heading text-display font-black text-white mb-6 leading-[1.02]"
            >
              {t("title")}
              <span className="block gradient-text-animated mt-2">
                {t("titleHighlight")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: .26 }}
              className="text-lg md:text-xl text-gray-300/85 max-w-2xl mb-10 leading-relaxed"
            >
              {t("description")}
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: .36 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {trustBadges.map(({ icon: Icon, labelEn, labelAr }) => (
                <div
                  key={labelEn}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-white/70 text-xs font-medium"
                >
                  <Icon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  <span>{isAr ? labelAr : labelEn}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, delay: .44 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary text-base"
                aria-label={isAr ? "تواصل معنا" : "Get in touch with us"}
              >
                {t("cta1")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/portfolio`}
                className="btn btn-ghost text-base"
                aria-label={isAr ? "عرض أعمالنا" : "View our portfolio"}
              >
                {t("cta2")}
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .8, duration: .6 }}
              className="flex flex-wrap gap-8 mt-16 pt-10 border-t border-white/[.08]"
              role="list"
              aria-label={isAr ? "إحصاءات الشركة" : "Company statistics"}
            >
              {[
                { num: COMPANY_STATS.projects, label: t("statsProjects") },
                { num: COMPANY_STATS.clients,  label: t("statsClients") },
                { num: COMPANY_STATS.years,    label: t("statsYears") },
              ].map((s) => (
                <div key={s.label} role="listitem">
                  <span className="block text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                    {s.num}
                  </span>
                  <span className="block text-xs text-white/40 mt-1 font-medium uppercase tracking-wider">
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
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background dark:from-background-dark to-transparent z-10"
        aria-hidden="true"
      />

      {/* ── Scroll cue ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/25 uppercase tracking-[.2em] font-medium">
          {isAr ? "انتقل لأسفل" : "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <span className="w-0.5 h-1.5 bg-white/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
