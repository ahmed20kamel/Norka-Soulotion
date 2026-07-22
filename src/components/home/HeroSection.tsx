"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useRef } from "react";

interface HeroSectionProps {
  locale: string;
}

/** Abstract node-graph motif — evokes AI/data systems without stock imagery. */
const NETWORK_NODES: [number, number][] = [
  [60, 80], [180, 40], [320, 90], [90, 190], [230, 160],
  [350, 220], [60, 320], [200, 300], [330, 350], [140, 260],
];
const NETWORK_EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5],
  [3, 6], [3, 9], [4, 9], [9, 7], [5, 8], [7, 8], [6, 9],
];

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
      {/* ── Abstract brand background ────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: prefersReduced ? 0 : yBg }} aria-hidden="true">
        {/* Fine dot-grid texture — consistent with CEOQuote/AboutPreview/CTASection */}
        <div
          className="absolute inset-0 opacity-[.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Gradient mesh blobs */}
        <motion.div
          animate={
            prefersReduced
              ? { scale: 1.08, opacity: .4 }
              : { scale: [1, 1.2, 1], opacity: [.3, .55, .3] }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute -top-32 -end-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,98,252,.28) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={
            prefersReduced
              ? { scale: 1.05, opacity: .3 }
              : { scale: [1, 1.15, 1], opacity: [.2, .4, .2] }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }
          }
          className="absolute -bottom-40 -start-20 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,132,255,.2) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={
            prefersReduced
              ? { scale: 1.05, opacity: .22 }
              : { scale: [1, 1.12, 1], opacity: [.14, .3, .14] }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }
          className="absolute top-1/3 start-1/4 w-[380px] h-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,98,252,.16) 0%, transparent 70%)" }}
        />

        {/* Abstract node-graph motif */}
        <svg
          className="absolute -end-24 top-1/2 -translate-y-1/2 w-[480px] h-[480px] hidden lg:block"
          viewBox="0 0 400 400"
          fill="none"
        >
          {NETWORK_EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NETWORK_NODES[a][0]} y1={NETWORK_NODES[a][1]}
              x2={NETWORK_NODES[b][0]} y2={NETWORK_NODES[b][1]}
              stroke="#3B62FC"
              strokeOpacity=".18"
              strokeWidth="1"
            />
          ))}
          {NETWORK_NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.5 : 2.5} fill="#6384FF" fillOpacity=".45" />
          ))}
        </svg>
      </motion.div>

      {/* ── Corner brackets ──────────────────────────────────── */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/15 z-[2] pointer-events-none" aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div style={{ opacity: opacityBg }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 md:py-52">
          <motion.div
            variants={staggerContainer(.15, .1)}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
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
