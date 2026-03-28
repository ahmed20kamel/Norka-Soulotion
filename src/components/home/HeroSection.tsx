"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { images } from "@/lib/images.config";

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-105">
          <source src={images.hero.video.src} type={images.hero.video.type} />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-950/80 to-accent/20" />
      </div>

      {/* Ambient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/80 text-sm font-medium mb-10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {t("badge")}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tight mb-6"
          >
            {t("title")}
            <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent mt-2">
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
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-dark bg-accent hover:bg-accent-light hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 text-base"
            >
              {t("cta1")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all duration-300 text-base backdrop-blur-sm"
            >
              {t("cta2")}
            </Link>
          </motion.div>

          {/* Micro-stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-8 mt-16 pt-10 border-t border-white/8"
          >
            {[
              { num: "150+", label: t("statsProjects") },
              { num: "80+", label: t("statsClients") },
              { num: "5+", label: t("statsYears") },
            ].map((s) => (
              <div key={s.label}>
                <span className="block text-3xl font-black text-white">{s.num}</span>
                <span className="block text-sm text-gray-500 mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
