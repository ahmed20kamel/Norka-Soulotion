"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Rocket, Handshake, CheckCircle } from "lucide-react";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { images } from "@/lib/images.config";
import { COMPANY_STATS } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AboutPreviewProps {
  locale: string;
}

export default function AboutPreview({ locale }: AboutPreviewProps) {
  const t      = useTranslations("about");
  const statsT = useTranslations("stats");
  const isAr   = locale === "ar";

  const stats = [
    { icon: Trophy,    value: COMPANY_STATS.years,    label: statsT("years"),    color: "text-amber-400" },
    { icon: Rocket,    value: COMPANY_STATS.projects, label: statsT("projects"), color: "text-blue-400" },
    { icon: Handshake, value: COMPANY_STATS.clients,  label: statsT("clients"),  color: "text-emerald-400" },
    { icon: Users,     value: COMPANY_STATS.team,     label: statsT("team"),     color: "text-purple-400" },
  ];

  const highlights = isAr
    ? ["فريق متخصص من المطورين والمصممين", "حلول مخصصة لكل عميل", "دعم فني على مدار الساعة", "خبرة في السوق الإماراتي والخليجي"]
    : ["Specialized team of developers & designers", "Tailored solutions for each client", "24/7 technical support", "Deep expertise in the UAE & Gulf market"];

  return (
    <section
      className="section-py bg-white dark:bg-gray-950 overflow-hidden relative"
      aria-labelledby="about-preview-heading"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[.025] dark:opacity-[.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #3B62FC 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Left: Image stack ─────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src={images.about.team.src}
                alt={images.about.team.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
            </div>

            {/* Decorative frame */}
            <div
              className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-2 border-accent/15 -z-10"
              aria-hidden="true"
            />

            {/* Floating team card */}
            <motion.div
              initial={{ opacity: 0, scale: .85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: .45, duration: .5, type: "spring" }}
              className="absolute -bottom-7 -right-7 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-2xl border border-gray-100 dark:border-gray-700 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-dark" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white leading-none">
                    {COMPANY_STATS.team}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{t("teamMembers")}</div>
                </div>
              </div>
            </motion.div>

            {/* Satisfaction badge */}
            <motion.div
              initial={{ opacity: 0, scale: .85, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={viewport}
              transition={{ delay: .6, duration: .5, type: "spring" }}
              className="absolute -top-5 -left-5 bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-xl border border-gray-100 dark:border-gray-700 z-10 flex items-center gap-2"
            >
              <span className="text-accent text-lg font-black">{COMPANY_STATS.satisfaction}</span>
              <span className="text-xs text-gray-500 leading-tight max-w-[60px]">
                {isAr ? "رضا العملاء" : "Client Satisfaction"}
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Text ───────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="badge badge-accent mb-6">{t("story")}</span>

            <h2
              id="about-preview-heading"
              className="font-heading text-display-sm font-black text-gray-900 dark:text-white mb-6 leading-tight"
            >
              {t("title")}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {t("storyText")}
            </p>

            {/* Highlight list */}
            <ul className="space-y-3 mb-10" aria-label={isAr ? "ما يميزنا" : "What sets us apart"}>
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Stats grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
              role="list"
              aria-label={isAr ? "إحصاءات" : "Statistics"}
            >
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  role="listitem"
                  className="block text-center p-4 rounded-2xl bg-surface dark:bg-surface-dark ring-gray-100 dark:ring-gray-800 hover:ring-accent/30 transition-colors"
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} aria-hidden="true" />
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-[11px] text-gray-500 mt-1 leading-tight">{stat.label}</div>
                </Card>
              ))}
            </div>

            <Link
              href={`/${locale}/about`}
              className={buttonVariants({ variant: "outline", className: "text-sm h-auto px-6 py-3 rounded-xl" })}
              aria-label={t("learnMore")}
            >
              {t("learnMore")}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
