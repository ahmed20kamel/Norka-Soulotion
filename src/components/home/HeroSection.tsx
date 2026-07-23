"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  LayoutGrid,
  BarChart3,
  Users,
  Bell,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useRef } from "react";

interface HeroSectionProps {
  locale: string;
}

const CHART_POINTS: [number, number][] = [
  [0, 56], [40, 44], [80, 50], [120, 28], [160, 36], [200, 16], [240, 22],
];
const CHART_LINE = CHART_POINTS.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
const CHART_AREA = `${CHART_LINE} L240,80 L0,80 Z`;

const NAV_ICONS = [LayoutGrid, BarChart3, Users, Bell, Settings];

export default function HeroSection({ locale }: HeroSectionProps) {
  const t             = useTranslations("hero");
  const isAr           = locale === "ar";
  const ref            = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityBg = useTransform(scrollYProgress, [0, .55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060B18]"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* ── Background: one dominant light source + soft depth ──── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: prefersReduced ? 0 : yBg }} aria-hidden="true">
        {/* Fine dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Dominant glow — sits behind the product panel, the section's one clear light source */}
        <motion.div
          animate={
            prefersReduced
              ? { opacity: .4 }
              : { opacity: [.32, .42, .32] }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute top-[8%] end-[6%] w-[640px] h-[640px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,98,252,.35) 0%, transparent 68%)" }}
        />
        {/* Quiet secondary fill for depth — static, no competing motion */}
        <div
          className="absolute -bottom-32 -start-24 w-[480px] h-[480px] rounded-full opacity-[.14]"
          style={{ background: "radial-gradient(circle, rgba(99,132,255,.5) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* ── Corner brackets ──────────────────────────────────── */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div style={{ opacity: opacityBg }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 xl:gap-20 items-center">

            {/* ── Left: copy ──────────────────────────────────── */}
            <motion.div
              variants={staggerContainer(.15, .1)}
              initial="hidden"
              animate="visible"
            >
              {/* Label */}
              <motion.div variants={staggerItem} className="flex items-center gap-2 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[.22em] text-blue-400/80">
                  {t("badge")}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={staggerItem}
                className="font-heading text-display font-black text-white mb-5 leading-[1.02]"
              >
                {t("title")}
                <span className="block gradient-text-animated">
                  {t("titleHighlight")}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={staggerItem}
                className="text-base md:text-lg text-slate-300/75 max-w-lg mb-10 leading-relaxed"
              >
                {t("description")}
              </motion.p>

              {/* CTAs */}
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
                    variant: "ghost",
                    className:
                      "text-sm px-8 py-4 h-auto rounded-xl border-white/15 text-white hover:bg-white/5 hover:border-white/30 hover:text-white dark:hover:bg-white/5 backdrop-blur-sm",
                  })}
                >
                  {t("cta2")}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Right: abstracted product panel ──────────────── */}
            <div className="relative hidden lg:block" aria-hidden="true">
              {/* Outer wrapper owns the plain CSS float loop; the inner motion.div owns the
                  entrance tilt — kept on separate elements since both animate `transform`
                  and a CSS keyframe animation would otherwise win over the inline style. */}
              <div className="animate-float">
              <motion.div
                initial={prefersReduced ? { opacity: 1, rotateY: -8, rotateX: 3, scale: 1, y: 0 } : { opacity: 0, rotateY: -14, rotateX: 6, scale: .92, y: 30 }}
                animate={{ opacity: 1, rotateY: -8, rotateX: 3, scale: 1, y: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 1, delay: .5, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 1600 }}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/95 to-gray-950/95 shadow-2xl overflow-hidden backdrop-blur-sm"
              >
                {/* Browser chrome */}
                <div className="mockup-bar">
                  <span className="mockup-bar-dot" />
                  <span className="mockup-bar-dot" />
                  <span className="mockup-bar-dot" />
                </div>

                <div className="flex pt-9">
                  {/* Icon rail */}
                  <div className="flex flex-col items-center gap-3 px-4 py-5 border-e border-white/[.06]">
                    {NAV_ICONS.map((Icon, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          i === 0 ? "bg-accent text-dark" : "text-slate-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    ))}
                  </div>

                  {/* Main panel content */}
                  <div className="flex-1 min-w-0 p-5">
                    {/* Stat tiles */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: isAr ? "الإيرادات" : "Revenue", value: "128K", trend: "+12%" },
                        { label: isAr ? "المستخدمون" : "Active Users", value: "4.3K", trend: "+8%" },
                        { label: isAr ? "وقت التشغيل" : "Uptime", value: "99.9%", trend: "+.1%" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-white/[.04] border border-white/[.06] p-3">
                          <div className="text-[9px] uppercase tracking-wider text-slate-500 mb-1.5 truncate">
                            {stat.label}
                          </div>
                          <div className="text-sm font-black text-white leading-none mb-1.5">{stat.value}</div>
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                            <TrendingUp className="w-2.5 h-2.5" />
                            {stat.trend}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className="rounded-xl bg-white/[.04] border border-white/[.06] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500">
                          {isAr ? "الأداء" : "Performance"}
                        </span>
                        <span className="text-[10px] font-semibold text-accent-light">
                          {isAr ? "آخر 30 يوم" : "Last 30 days"}
                        </span>
                      </div>
                      <svg viewBox="0 0 240 80" fill="none" className="w-full h-16">
                        <defs>
                          <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B62FC" stopOpacity=".35" />
                            <stop offset="100%" stopColor="#3B62FC" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          d={CHART_AREA}
                          fill="url(#heroChartFill)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: .6, delay: prefersReduced ? 0 : 1.3 }}
                        />
                        <motion.path
                          d={CHART_LINE}
                          stroke="#6384FF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={prefersReduced ? { duration: 0 } : { duration: 1.1, delay: 1, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>

              {/* Floating AI-insight chip */}
              <motion.div
                initial={prefersReduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: .85, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: .6, delay: 1.5, ease: "easeOut" }}
                className="absolute -bottom-6 -start-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur-md px-4 py-3 shadow-2xl max-w-[220px]"
              >
                <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-accent-light" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {isAr ? "رؤى الذكاء الاصطناعي" : "AI Insight"}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                    {isAr ? "كفاءة أعلى بنسبة 23% هذا الشهر" : "Efficiency up 23% this month"}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom fade — targets the fixed-dark strip below (StatsCounter), not the
           theme-toggling background token, so it stays seamless in light mode too ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#060B18] to-transparent z-10"
        aria-hidden="true"
      />

      {/* ── Scroll cue ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono uppercase tracking-[.2em] text-white/30">
          {isAr ? "مرر" : "Scroll"}
        </span>
        <div className="relative w-px h-9 bg-white/12 overflow-hidden">
          <motion.span
            animate={prefersReduced ? { y: 0 } : { y: [-36, 36] }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-accent-light to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
