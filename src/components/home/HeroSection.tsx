"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images.config";

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background with image fallback */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.hero.fallback.src}
          alt={images.hero.fallback.alt}
          fill
          className="object-cover"
          priority
        />
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover scale-105">
          <source src={images.hero.video.src} type={images.hero.video.type} />
        </video>
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gray-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-gray-950/30" />
      </div>

      {/* Subtle animated gradient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-accent/6 rounded-full blur-[80px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
        <div className="max-w-3xl">

          {/* Slogan pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/70 text-sm font-medium mb-10 backdrop-blur-lg"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {t("badge")}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[0.95] tracking-tight mb-7"
          >
            {t("title")}
            <span className="block bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent mt-3">
              {t("titleHighlight")}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-xl mb-12 leading-relaxed"
          >
            {t("description")}
          </motion.p>

          {/* Two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-dark bg-accent hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 text-base"
            >
              {t("cta1")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white border border-white/15 hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300 text-base backdrop-blur-sm"
            >
              {t("cta2")}
            </Link>
          </motion.div>

          {/* Micro-stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/[0.08]"
          >
            {[
              { num: "150+", label: t("statsProjects") },
              { num: "80+", label: t("statsClients") },
              { num: "5+", label: t("statsYears") },
            ].map((s) => (
              <div key={s.label}>
                <span className="block text-3xl font-black text-white tracking-tight">{s.num}</span>
                <span className="block text-sm text-white/40 mt-0.5 font-medium">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface dark:from-surface-dark/40 to-transparent z-10" />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
