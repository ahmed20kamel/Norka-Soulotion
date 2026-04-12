"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { COMPANY_STATS } from "@/lib/constants";

interface HeroSectionProps {
  locale: string;
}

/* Floating code lines that animate across the background */
const codeLines = [
  "const ai = new NorkaAI({ model: 'gpt-4o' })",
  "await app.deploy({ region: 'ae-central' })",
  "export function buildSolution(client) {",
  "  return ai.integrate(client.needs);",
  "}",
  "db.connect({ host: 'cloud.norkasolution.com' })",
  "import { Innovation } from '@norka/core';",
  "const result = await api.solve(problem);",
  "server.listen(3000, '0.0.0.0');",
  "git commit -m 'feat: delivered on time'",
];

export default function HeroSection({ locale }: HeroSectionProps) {
  const t    = useTranslations("hero");
  const isAr = locale === "ar";

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060B18]"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* ── Animated grid ───────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,130,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(99,130,255,.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Radial glow spots ───────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Primary blue glow — top right */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [.55, .8, .55] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,98,252,.28) 0%, transparent 65%)" }}
        />
        {/* Secondary indigo glow — bottom left */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [.35, .6, .35] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,60,220,.22) 0%, transparent 65%)" }}
        />
        {/* Center subtle glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(59,98,252,.18) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Floating code lines ──────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={{ opacity: [0, .18, .18, 0], x: 0 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: i * 1.6,
              ease: "easeInOut",
            }}
            className="absolute font-mono text-[11px] text-blue-300/50 whitespace-nowrap"
            style={{
              top: `${8 + i * 8.5}%`,
              left: i % 3 === 0 ? "5%" : i % 3 === 1 ? "38%" : "65%",
            }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* ── Horizontal scan line ────────────────────────────── */}
      <motion.div
        animate={{ top: ["5%", "95%", "5%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Corner accent brackets ───────────────────────────── */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-blue-400/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-blue-400/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-blue-400/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-blue-400/20 pointer-events-none" aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full">
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
              className="text-base md:text-lg text-slate-400 max-w-xl mb-10 leading-relaxed"
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
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-slate-300 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300"
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
              className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-white/[.06]"
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
      </div>

      {/* ── Bottom fade ─────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background dark:from-background-dark to-transparent z-10"
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
          className="w-5 h-8 rounded-full border border-white/12 flex items-start justify-center pt-1.5"
        >
          <span className="w-0.5 h-1.5 bg-white/20 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
