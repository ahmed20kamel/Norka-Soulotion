"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";

interface CTASectionProps {
  locale: string;
}

export default function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations("cta");

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-dark to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#C9A96E15,_transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Rotating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-[350px] h-[350px] border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] border border-white/5 rounded-full"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-6 border border-white/20">
              {t("badge")}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {t("title")}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-5"
          >
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center justify-between gap-4 px-8 py-6 rounded-3xl bg-accent text-dark font-black text-xl hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300"
            >
              <span>{t("button")}</span>
              <motion.div
                className="p-3 rounded-2xl bg-dark/10 group-hover:bg-dark/20 transition-all duration-300"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </Link>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "📞", text: t("callUs"), sub: "+971 54 521 4280" },
                { icon: "✉️", text: t("emailUs"), sub: "info@norkasolution.com" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white font-bold text-sm">{item.text}</div>
                  <div className="text-gray-300 text-xs mt-1" dir="ltr">{item.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
