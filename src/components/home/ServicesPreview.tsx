"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  fadeUp, staggerContainer, staggerItem, viewport
} from "@/lib/animations";
import {
  SoftwareIcon, MobileIcon, WebIcon, ErpIcon,
  InfraIcon, UiuxIcon, MarketingIcon, ConsultingIcon
} from "@/components/icons/ServiceIcons";

const serviceIcons = {
  software: SoftwareIcon,
  mobile: MobileIcon,
  web: WebIcon,
  erp: ErpIcon,
  infrastructure: InfraIcon,
  uiux: UiuxIcon,
  marketing: MarketingIcon,
  consulting: ConsultingIcon,
};

const serviceGradients: Record<string, { from: string; to: string; shadow: string }> = {
  software:       { from: "#2563eb", to: "#1d4ed8", shadow: "rgba(37,99,235,0.35)" },
  mobile:         { from: "#8b5cf6", to: "#7c3aed", shadow: "rgba(139,92,246,0.35)" },
  erp:            { from: "#f59e0b", to: "#d97706", shadow: "rgba(245,158,11,0.35)" },
  web:            { from: "#10b981", to: "#059669", shadow: "rgba(16,185,129,0.35)" },
  infrastructure: { from: "#06b6d4", to: "#0891b2", shadow: "rgba(6,182,212,0.35)" },
  uiux:           { from: "#ec4899", to: "#db2777", shadow: "rgba(236,72,153,0.35)" },
  marketing:      { from: "#f97316", to: "#ea580c", shadow: "rgba(249,115,22,0.35)" },
  consulting:     { from: "#14b8a6", to: "#0d9488", shadow: "rgba(20,184,166,0.35)" },
};

const serviceKeys = [
  "software", "mobile", "erp", "web",
  "infrastructure", "uiux", "marketing", "consulting"
] as const;

interface ServicesPreviewProps {
  locale: string;
}

export default function ServicesPreview({ locale }: ServicesPreviewProps) {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-32 bg-surface dark:bg-surface-dark/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 text-accent text-sm font-semibold mb-4">
            {t("badge")}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-5">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto" />
        </motion.div>

        {/* Cards grid — 4 columns */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key];
            const grad = serviceGradients[key];
            return (
              <motion.div
                key={key}
                variants={staggerItem}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 hover:border-transparent overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default"
                whileHover={{
                  boxShadow: `0 25px 60px ${grad.shadow}`,
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                />
                {/* Glow top-right */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                  style={{ background: grad.from }}
                />

                {/* Icon */}
                <motion.div
                  className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-3 transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t(`${key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  {t(`${key}.description`)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(t.raw(`${key}.features`) as string[]).slice(0, 3).map((f: string) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors group/link"
                  style={{ color: grad.from }}
                >
                  {t("learnMore")}
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>

                {/* Bottom border accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${grad.from}, ${grad.to})` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mt-16"
        >
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-bold text-dark bg-accent hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300"
          >
            {t("viewAll")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
