"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { Quote } from "lucide-react";
import { images } from "@/lib/images.config";

interface CEOQuoteProps {
  locale?: string;
}

export default function CEOQuote({ locale }: CEOQuoteProps) {
  const isAr = locale === "ar";

  return (
    <section
      className="relative section-py overflow-hidden bg-gray-950"
      aria-label={isAr ? "رسالة المدير التنفيذي" : "Managing Director message"}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,98,252,.12),_transparent_60%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(26,26,46,.6),_transparent_60%)]" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Photo ───────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-accent-light/20 blur-3xl scale-110" aria-hidden="true" />

              {/* Photo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-white/10 overflow-hidden shadow-2xl">
                <Image
                  src={images.team.nourhan.src}
                  alt={images.team.nourhan.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-transparent" />
              </div>

              {/* Name badge */}
              <motion.div
                initial={{ opacity: 0, scale: .7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: .5, type: "spring" }}
                className="absolute -bottom-5 -right-5 bg-accent px-5 py-3 rounded-2xl shadow-2xl shadow-accent/30"
              >
                <div className="text-dark font-bold text-sm leading-tight">
                  {isAr ? "م. نورهان" : "Eng. Nourhan"}
                </div>
                <div className="text-dark/70 text-xs mt-0.5">
                  {isAr ? "المدير التنفيذي" : "Managing Director"}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Quote ───────────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Quote icon */}
            <div className="mb-7 opacity-30" aria-hidden="true">
              <Quote className="w-14 h-14 text-accent" />
            </div>

            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed mb-9">
              {isAr ? (
                <>
                  &ldquo;في نوركا سوليوشن، نحن لا نبني التكنولوجيا فقط &mdash;
                  <span className="font-bold gradient-text"> نحن نهندس مستقبل </span>
                  أعمالك. كل حل نقدمه مصنوع بدقة وشغف وهدف.&rdquo;
                </>
              ) : (
                <>
                  &ldquo;At Norka Solution, we don&apos;t just build technology &mdash;
                  <span className="font-bold gradient-text"> we engineer the future </span>
                  of your business. Every solution we deliver is crafted with precision, passion, and purpose.&rdquo;
                </>
              )}
            </blockquote>

            {/* Signature */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-0.5 bg-gradient-to-r from-accent to-accent-light" aria-hidden="true" />
              <div>
                <div className="text-white font-bold text-xl">
                  {isAr ? "م. نورهان" : "Eng. Nourhan"}
                </div>
                <div className="text-gray-400 text-sm">
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
