"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";

interface CTASectionProps {
  locale: string;
}

export default function CTASection({ locale }: CTASectionProps) {
  const t    = useTranslations("cta");
  const isAr = locale === "ar";

  const contactItems = [
    {
      icon: Phone,
      label: t("callUs"),
      value: "+971 50 725 7157",
      href: "tel:+971507257157",
      ariaLabel: isAr ? "اتصل بنا" : "Call us",
    },
    {
      icon: Mail,
      label: t("emailUs"),
      value: "info@norkasolution.com",
      href: "mailto:info@norkasolution.com",
      ariaLabel: isAr ? "راسلنا" : "Email us",
    },
    {
      icon: MessageCircle,
      label: isAr ? "واتساب" : "WhatsApp",
      value: isAr ? "تواصل فوري" : "Instant chat",
      href: "https://wa.me/971507257157",
      ariaLabel: isAr ? "واتساب" : "Chat on WhatsApp",
    },
  ];

  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#111008] to-gray-950" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,.08),_transparent_65%)]" aria-hidden="true" />

      {/* Grid dots */}
      <div
        className="absolute inset-0 opacity-[.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Rotating rings */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] border border-white/[.04] rounded-full animate-spin-slow pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border border-white/[.04] rounded-full animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} aria-hidden="true" />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-accent/[.07] rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Text ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="badge badge-accent mb-7">{t("badge")}</span>

            <h2
              id="cta-heading"
              className="font-heading text-display-sm font-black text-white leading-tight mb-6"
            >
              {t("title")}
            </h2>

            <p className="text-gray-300/75 text-xl leading-relaxed mb-10">
              {t("description")}
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2" aria-hidden="true">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-gray-950 bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-bold">80+</span>{" "}
                {isAr ? "عميل سعيد بخدماتنا" : "happy clients trust us"}
              </p>
            </div>
          </motion.div>

          {/* ── Actions ──────────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-4"
          >
            {/* Primary CTA */}
            <Link
              href={`/${locale}/contact`}
              className="group flex items-center justify-between gap-4 px-8 py-6 rounded-3xl bg-accent hover:bg-accent-light hover:shadow-[0_20px_60px_rgba(201,169,110,.3)] hover:-translate-y-1 transition-all duration-300"
              aria-label={t("button")}
            >
              <span className="font-heading text-xl font-black text-dark">{t("button")}</span>
              <motion.div
                className="p-3 rounded-2xl bg-dark/10 group-hover:bg-dark/20 transition-colors"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                aria-hidden="true"
              >
                <ArrowRight className="w-6 h-6 text-dark" />
              </motion.div>
            </Link>

            {/* Contact chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {contactItems.map(({ icon: Icon, label, value, href, ariaLabel }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={ariaLabel}
                  className="group flex flex-col gap-2 p-4 rounded-2xl bg-white/[.06] border border-white/[.08] hover:bg-white/[.1] hover:border-accent/30 transition-all duration-300 cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  <div>
                    <div className="text-white font-semibold text-sm">{label}</div>
                    <div className="text-gray-400 text-xs mt-0.5 group-hover:text-accent transition-colors" dir="ltr">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Trust line */}
            <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-2 mt-1">
              <span className="w-8 h-px bg-gray-700" aria-hidden="true" />
              {isAr ? "لا توجد رسوم استشارة مبدئية • رد خلال 24 ساعة" : "No initial consultation fee • Response within 24h"}
              <span className="w-8 h-px bg-gray-700" aria-hidden="true" />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
