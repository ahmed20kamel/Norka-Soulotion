"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { Quote } from "lucide-react";
import MonogramAvatar from "@/components/art/MonogramAvatar";
import { images } from "@/lib/images.config";

interface CEOQuoteProps {
  locale?: string;
}

export default function CEOQuote({ locale }: CEOQuoteProps) {
  const isAr = locale === "ar";
  const name = isAr ? "م. نورهان" : "Eng. Nourhan";

  return (
    <section
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-surface dark:bg-gray-950"
      aria-label={isAr ? "رسالة المدير التنفيذي" : "Managing Director message"}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Photo ───────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-card-hover)]">
              <Image
                src={images.home.ceoOffice.src}
                alt={images.home.ceoOffice.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/30 to-transparent" />
            </div>

            {/* Floating attribution card — a branded monogram, not a stock
                photo standing in for one specific named person */}
            <motion.div
              initial={{ opacity: 0, scale: .85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: .4, duration: .5, type: "spring" }}
              className="absolute -bottom-6 -end-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3"
            >
              <MonogramAvatar name={name} className="w-12 h-12 rounded-xl shrink-0 text-lg" />
              <div>
                <div className="text-gray-900 dark:text-white font-bold text-sm leading-tight">
                  {name}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                  {isAr ? "المدير التنفيذي" : "Managing Director"}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Quote ───────────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Quote icon */}
            <div className="mb-7 opacity-40" aria-hidden="true">
              <Quote className="w-14 h-14 text-accent" />
            </div>

            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 dark:text-white leading-relaxed mb-9">
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

            {/* Signature */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-0.5 bg-gradient-to-r from-accent to-accent-light" aria-hidden="true" />
              <div>
                <div className="text-gray-900 dark:text-white font-bold text-xl">
                  {name}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {isAr ? "المدير التنفيذي، نوركا سوليوشن" : "Managing Director, Norka Solution"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
