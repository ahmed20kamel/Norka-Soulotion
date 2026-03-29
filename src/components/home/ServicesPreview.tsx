"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, staggerContainer, staggerItem, viewport } from "@/lib/animations";

const serviceCards = [
  { key: "software", image: "/images/services/web-applications.jpg" },
  { key: "mobile", image: "/images/services/mobile-apps.jpg" },
  { key: "erp", image: "/images/services/erp-systems.jpg" },
  { key: "web", image: "/images/services/website-development.jpg" },
  { key: "infrastructure", image: "/images/services/it-infrastructure.jpg" },
  { key: "uiux", image: "/images/services/uiux-design.jpg" },
  { key: "marketing", image: "/images/services/social-media.jpg" },
  { key: "consulting", image: "/images/services/company-setup.jpg" },
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

        {/* Cards grid — 4 columns with image + text */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceCards.map((card) => (
            <motion.div
              key={card.key}
              variants={staggerItem}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={card.image}
                  alt={t(`${card.key}.title`)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Title overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white drop-shadow-lg">
                    {t(`${card.key}.title`)}
                  </h3>
                </div>
              </div>

              {/* Content below image */}
              <div className="p-6">
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {t(`${card.key}.description`)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(t.raw(`${card.key}.features`) as string[]).slice(0, 3).map((f: string) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent/10 dark:bg-accent/20 text-accent"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-dark transition-colors group/link"
                >
                  {t("learnMore")}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
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
