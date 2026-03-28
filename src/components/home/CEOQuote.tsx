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

              {/* Avatar Circle with real photo */}
              <div className="relative w-72 h-72 rounded-full border-4 border-white/10 overflow-hidden">
                <Image
                  src={images.team.nourhan.src}
                  alt={images.team.nourhan.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
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
                  {isAr ? "المدير التنفيذي" : "Managing Director"}
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
                  {isAr ? "م. نورهان" : "Eng. Nourhan"}
                </div>
                <div className="text-gray-400 text-sm">
                  {isAr
                    ? "المدير التنفيذي، نوركا سوليوشن"
                    : "Managing Director, Norka Solution"}
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
