"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import MonogramAvatar from "@/components/art/MonogramAvatar";

interface CEOQuoteProps {
  locale?: string;
}

export default function CEOQuote({ locale }: CEOQuoteProps) {
  const t    = useTranslations("leadership");
  const isAr = locale === "ar";
  const name = isAr ? "م. نورهان" : "Eng. Nourhan";

  return (
    <section
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-surface dark:bg-gray-950"
      aria-label={isAr ? "رسالة المدير التنفيذي" : "Managing Director message"}
    >
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* ── Header — same badge + title + subtitle pattern every other
             section uses, which this one was missing entirely ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: .6 }}
          className="mb-10 md:mb-12"
        >
          <span className="badge badge-accent mb-5">{t("badge")}</span>
          <h2 className="font-heading text-display-sm font-black text-gray-900 dark:text-white mb-4 leading-tight">
            {t("title")}
          </h2>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── Quote — deliberately simple and different from the photo-led,
             split two-column sections around it: no big image panel, just
             a centered quote and a small honest attribution avatar ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <Quote className="w-9 h-9 text-accent/40 mx-auto mb-6" aria-hidden="true" />

          <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 dark:text-white leading-relaxed mb-8">
            {isAr ? (
              <>
                &ldquo;في نوركا سوليوشن، نحن لا نبني التكنولوجيا فقط &mdash;
                <span className="font-bold text-accent"> نحن نهندس مستقبل </span>
                أعمالك. كل حل نقدمه مصنوع بدقة وشغف وهدف.&rdquo;
              </>
            ) : (
              <>
                &ldquo;At Norka Solution, we don&apos;t just build technology &mdash;
                <span className="font-bold text-accent"> we engineer the future </span>
                of your business. Every solution we deliver is crafted with precision, passion, and purpose.&rdquo;
              </>
            )}
          </blockquote>

          <div className="flex items-center justify-center gap-3">
            <MonogramAvatar name={name} className="w-11 h-11 rounded-full text-sm shrink-0" />
            <div className="text-start">
              <div className="text-gray-900 dark:text-white font-bold text-sm">{name}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                {isAr ? "المدير التنفيذي، نوركا سوليوشن" : "Managing Director, Norka Solution"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
