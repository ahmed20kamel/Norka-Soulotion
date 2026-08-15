"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { images } from "@/lib/images.config";

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
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background — the one bold saturated-color moment on the page
          (brand blue, not black), with the Dubai skyline for texture
          under a scrim rather than a flat gradient. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={images.home.ctaSkyline.src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/95 via-accent-dark/95 to-accent-dark" />
      </div>

      {/* Grid dots */}
      <div
        className="absolute inset-0 opacity-[.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Text ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="badge bg-white/15 text-white border border-white/25 mb-7">{t("badge")}</span>

            <h2
              id="cta-heading"
              className="font-heading text-display-sm font-black text-white leading-tight mb-6"
            >
              {t("title")}
            </h2>

            <p className="text-white/75 text-xl font-normal leading-relaxed mb-10">
              {t("description")}
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <AvatarGroup aria-hidden="true">
                {[1,2,3,4].map((i) => (
                  <Avatar key={i} className="size-9 border-2 border-accent-dark">
                    <AvatarFallback className="bg-white/20 text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <p className="text-sm text-white/70">
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
            {/* Primary CTA — inverted (white) so it reads against the
                accent-blue section instead of blending into it */}
            <Link
              href={`/${locale}/contact`}
              className="group flex items-center justify-between gap-4 px-8 py-6 rounded-2xl bg-white hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              aria-label={t("button")}
            >
              <span className="font-heading text-xl font-black text-accent">{t("button")}</span>
              <motion.div
                className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/15 transition-colors duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                aria-hidden="true"
              >
                <ArrowRight className="w-6 h-6 text-accent" />
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
                  className="group block"
                >
                  <Card className="flex-col gap-2 p-4 rounded-2xl bg-white/[.1] ring-white/[.15] group-hover:bg-white/[.16] group-hover:ring-white/30 transition-all duration-300 cursor-pointer">
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    <div>
                      <div className="text-white font-semibold text-sm">{label}</div>
                      <div className="text-white/70 text-xs mt-0.5 group-hover:text-white transition-colors" dir="ltr">
                        {value}
                      </div>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            {/* Trust line */}
            <p className="text-center text-xs text-white/60 flex items-center justify-center gap-2 mt-1">
              <span className="w-8 h-px bg-white/25" aria-hidden="true" />
              {isAr ? "لا توجد رسوم استشارة مبدئية • رد خلال 24 ساعة" : "No initial consultation fee • Response within 24h"}
              <span className="w-8 h-px bg-white/25" aria-hidden="true" />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
