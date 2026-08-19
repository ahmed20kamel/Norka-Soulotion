"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Smartphone, BarChart3, Globe, Server, Palette, Megaphone, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { viewport } from "@/lib/animations";
import { buttonVariants } from "@/components/ui/button";
import { images } from "@/lib/images.config";
import type { ServiceCopy } from "@/sanity/lib/fetch-content";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

const services = [
  { key: "software",       Icon: Code2 },
  { key: "mobile",         Icon: Smartphone },
  { key: "erp",            Icon: BarChart3 },
  { key: "web",            Icon: Globe },
  { key: "infrastructure", Icon: Server },
  { key: "uiux",           Icon: Palette },
  { key: "marketing",      Icon: Megaphone },
  { key: "consulting",     Icon: Building2 },
] as const;

const ROTATE_MS = 5000;

interface ServicesPreviewProps {
  locale: string;
  /** CMS copy from Sanity, when configured — falls back to i18n messages when null. */
  serviceCopy?: ServiceCopy[] | null;
}

export default function ServicesPreview({ locale, serviceCopy }: ServicesPreviewProps) {
  const t = useTranslations("services");
  const lang = locale as "en" | "ar";
  const prefersReduced = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = services[activeIndex];

  // CMS copy (when present) wins over the i18n message catalog — same
  // fallback-safe pattern as the project/testimonial data fetches.
  const copyFor = (key: (typeof services)[number]["key"]) => {
    const cms = serviceCopy?.find((s) => s.key === key);
    return {
      title: cms ? cms.title[lang] : t(`${key}.title`),
      description: cms ? cms.description[lang] : t(`${key}.description`),
      features: cms ? cms.features[lang] : (t.raw(`${key}.features`) as string[]),
    };
  };
  const activeCopy = copyFor(active.key);

  // Auto-advance the spotlight through every service; pauses on hover/focus
  // and restarts its clock whenever the visitor picks one manually, so it
  // never fights an in-progress interaction.
  useEffect(() => {
    if (prefersReduced || paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % services.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, prefersReduced, activeIndex]);

  const { ref: tiltRef, onMouseMove: onTiltMove, onMouseLeave: onTiltLeave, style: tiltStyle } = useTilt<HTMLElement>({ max: 4 });

  return (
    <section
      id="services"
      className="pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 bg-surface dark:bg-surface-dark/40 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading row — title/subtitle left, all-services link right,
             matching the FeaturedProjects header pattern for consistency ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: .6 }}
            className="max-w-2xl"
          >
            <h2
              id="services-heading"
              className="font-heading text-display-sm font-black text-gray-900 dark:text-white mb-4 leading-tight"
            >
              {t("title")}
            </h2>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="divider-accent mt-5" aria-hidden="true" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: .6, delay: .1 }}
            className="shrink-0"
          >
            <Link
              href={`/${locale}/services`}
              className={buttonVariants({ variant: "outline", className: "text-sm h-auto px-6 py-3 rounded-xl" })}
              aria-label={t("viewAll")}
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* ── Spotlight + list ───────────────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
          style={{ perspective: 1200 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* Spotlight panel */}
          <motion.article
            ref={tiltRef}
            onMouseMove={onTiltMove}
            onMouseLeave={onTiltLeave}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: .6 }}
            style={tiltStyle}
            className="lg:col-span-3 group relative overflow-hidden rounded-2xl cursor-pointer min-h-[420px] sm:min-h-[440px] lg:h-full shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-accent)] transition-shadow duration-300"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .5 }}
                className="absolute inset-0"
              >
                <Image
                  src={images.services[active.key].src}
                  alt={activeCopy.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-gray-950/5 to-transparent" />

                {/* Info panel — a glass card inset from the photo's edges,
                    not text floating directly on the image */}
                <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
                  <div className="glass-dark rounded-2xl p-5 md:p-7">
                    <h3 className="font-heading text-xl md:text-2xl font-black text-white mb-2 leading-tight">
                      {activeCopy.title}
                    </h3>
                    <p className="text-gray-300/80 text-sm leading-relaxed mb-4 max-w-md">
                      {activeCopy.description}
                    </p>

                    {/* Feature tags — plain dot-separated text, not bordered pills */}
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-5 text-xs text-white/55">
                      {activeCopy.features.map((f: string, i: number) => (
                        <span key={f} className="flex items-center gap-2">
                          {i > 0 && <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />}
                          {f}
                        </span>
                      ))}
                    </p>

                    <Link
                      href={`/${locale}/services`}
                      className={buttonVariants({ className: "w-fit h-auto px-6 py-3 rounded-xl" })}
                      aria-label={`${t("learnMore")} — ${activeCopy.title}`}
                    >
                      {t("learnMore")}
                      <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots — also double as direct navigation */}
            <div className="absolute top-4 inset-x-4 md:top-5 md:inset-x-6 flex gap-1.5 z-10" role="tablist" aria-label={t("title")}>
              {services.map((s, i) => (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={copyFor(s.key).title}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-1 rounded-full cursor-pointer transition-all duration-300",
                    i === activeIndex ? "flex-[2] bg-white" : "flex-1 bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>
          </motion.article>

          {/* Compact list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: .6, delay: .1 }}
            className="lg:col-span-2 flex flex-col divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800"
            role="list"
            aria-label={`${t("title")} list`}
          >
            {services.map((s, i) => {
              const { title } = copyFor(s.key);
              const isActive = i === activeIndex;
              return (
                <div key={s.key} role="listitem">
                  <button
                    onClick={() => setActiveIndex(i)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`${t("learnMore")} — ${title}`}
                    className={cn(
                      "group w-full flex items-center gap-4 py-4 px-2 -mx-2 rounded-xl text-start transition-all duration-300 cursor-pointer",
                      isActive ? "bg-accent/[.06]" : "hover:bg-gray-50 dark:hover:bg-white/[.03]"
                    )}
                  >
                    <div
                      className={cn(
                        "shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300",
                        isActive
                          ? "bg-accent/10 border-accent/30"
                          : "bg-accent/5 dark:bg-accent/10 border-accent/15 group-hover:border-accent/30"
                      )}
                    >
                      <s.Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={cn(
                          "font-heading font-bold truncate transition-colors",
                          isActive ? "text-accent" : "text-gray-900 dark:text-white group-hover:text-accent"
                        )}
                      >
                        {title}
                      </h4>
                    </div>
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 text-accent shrink-0 transition-all duration-300 rtl:rotate-180",
                        isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 rtl:translate-x-1 group-hover:opacity-60"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
