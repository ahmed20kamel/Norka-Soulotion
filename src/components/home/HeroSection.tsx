"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { buttonVariants } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useRef } from "react";
import { useCanRender3D } from "@/hooks/useCanRender3D";

// Lazy-loaded and never server-rendered — this is the site's one signature
// 3D element (see HeroScene.tsx), kept out of the initial JS bundle and
// only fetched once useCanRender3D() actually says yes.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t             = useTranslations("hero");
  const isAr           = locale === "ar";
  const ref            = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const canRender3D    = useCanRender3D();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityBg = useTransform(scrollYProgress, [0, .55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060B18]"
      aria-label={isAr ? "القسم الرئيسي" : "Hero section"}
    >
      {/* ── Background: soft painterly gradient mesh (blurred color fields,
           not flat radial-gradient rings) — Stripe-style atmosphere.
           Color mass is weighted toward the "end" side (right in LTR, left
           in RTL); a scrim over the text column keeps it dark and readable
           in both directions. ──────────────────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: prefersReduced ? 0 : yBg }} aria-hidden="true">
        <motion.div
          animate={prefersReduced ? { opacity: .7 } : { opacity: [.6, .78, .6] }}
          transition={prefersReduced ? { duration: 0 } : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 end-[26%] w-[620px] h-[620px] rounded-full bg-accent blur-[110px]"
        />
        <motion.div
          animate={prefersReduced ? { opacity: .55 } : { opacity: [.45, .62, .45] }}
          transition={prefersReduced ? { duration: 0 } : { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[-8%] -end-20 w-[560px] h-[560px] rounded-full bg-[#7C5CFC] blur-[110px]"
        />
        <div className="absolute bottom-[-20%] end-[8%] w-[560px] h-[560px] rounded-full bg-[#22D3EE] opacity-[.32] blur-[120px]" />
        <div className="absolute top-[30%] end-[42%] w-[380px] h-[380px] rounded-full bg-accent-light opacity-[.4] blur-[90px]" />

        {/* Directional scrim — solid over the text column, dissolving away by mid-canvas */}
        <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#060B18] via-[#060B18]/85 to-[#060B18]/10" />

        {/* Fine dot-grid texture on top for a bit of structure */}
        <div
          className="absolute inset-0 opacity-[.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </motion.div>

      {/* ── Signature 3D element — one rotating low-poly shape + a sparse
           particle field, layered over the gradient blobs on the "end"
           side (right in LTR). Gated off on reduced-motion, small
           viewports, and low-power devices via useCanRender3D(); the
           gradient background above already looks complete without it,
           so there's nothing to fall back to render instead. ────────── */}
      {canRender3D && (
        <div
          className="absolute inset-y-0 end-0 w-full md:w-[55%] z-[1] pointer-events-none"
          style={{
            maskImage: `linear-gradient(to ${isAr ? "left" : "right"}, transparent, black 30%, black 85%, transparent)`,
          }}
          aria-hidden="true"
        >
          <HeroScene />
        </div>
      )}

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
