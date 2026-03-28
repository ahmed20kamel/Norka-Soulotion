"use client";

import { motion } from "framer-motion";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { Quote } from "lucide-react";

interface CEOQuoteProps {
  locale?: string;
}

export default function CEOQuote({ locale }: CEOQuoteProps) {
  const isAr = locale === "ar";

  return (
    <section className="relative py-32 overflow-hidden bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#C9A96E22,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#1a1a2e44,_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/40 to-accent-light/40 blur-2xl scale-110" />

              {/* Avatar Circle — placeholder until real photo is provided */}
              <div className="relative w-72 h-72 rounded-full border-4 border-white/10 overflow-hidden bg-gradient-to-br from-accent/30 to-accent-light/30 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                  <rect width="200" height="200" fill="url(#ceoGrad)"/>
                  <defs>
                    <linearGradient id="ceoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#D4B87A" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="75" r="35" fill="white" fillOpacity="0.15"/>
                  <path d="M35 200 Q35 140 100 130 Q165 140 165 200Z" fill="white" fillOpacity="0.15"/>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-white/80">AK</span>
                  <span className="text-sm text-white/50 mt-1">
                    {isAr ? "صورة المدير التنفيذي" : "CEO Photo"}
                  </span>
                </div>
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-accent px-5 py-3 rounded-2xl shadow-2xl"
              >
                <div className="text-dark text-sm font-bold">
                  {isAr ? "المؤسس والمدير التنفيذي" : "CEO & Founder"}
                </div>
                <div className="text-dark/70 text-xs">Norka Solution</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quote side */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="mb-8">
              <Quote className="w-16 h-16 text-accent/40" />
            </div>

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-8">
              {isAr ? (
                <>
                  &ldquo;في نوركا سوليوشن، نحن لا نبني التكنولوجيا فقط &mdash;
                  <span className="font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                    {" "}نحن نهندس مستقبل{" "}
                  </span>
                  أعمالك. كل حل نقدمه مصنوع بدقة وشغف وهدف.&rdquo;
                </>
              ) : (
                <>
                  &ldquo;At Norka Solution, we don&apos;t just build technology &mdash;
                  <span className="font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                    {" "}we engineer the future{" "}
                  </span>
                  of your business. Every solution we deliver is crafted with
                  precision, passion, and purpose.&rdquo;
                </>
              )}
            </blockquote>

            {/* Signature */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-accent-light" />
              <div>
                <div className="text-white font-bold text-xl">
                  {isAr ? "أحمد كامل" : "Ahmed Kamel"}
                </div>
                <div className="text-gray-400 text-sm">
                  {isAr
                    ? "المؤسس والمدير التنفيذي، نوركا سوليوشن"
                    : "CEO & Founder, Norka Solution"}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "5+", label: isAr ? "سنوات قيادة" : "Years Leading" },
                { value: "150+", label: isAr ? "مشروع منجز" : "Projects Done" },
                { value: "99%", label: isAr ? "رضا العملاء" : "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
