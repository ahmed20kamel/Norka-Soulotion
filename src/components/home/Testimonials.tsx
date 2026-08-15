"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import type { Testimonial } from "@/lib/data/testimonials";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import MonogramAvatar from "@/components/art/MonogramAvatar";

interface TestimonialsProps {
  locale: string;
  testimonials: Testimonial[];
}

export default function Testimonials({ locale, testimonials }: TestimonialsProps) {
  const t    = useTranslations("testimonials");
  const lang = locale as "en" | "ar";

  return (
    <section
      className="pt-0 pb-24 md:pb-32 bg-gray-950 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: .6 }}
          className="text-center mb-14"
        >
          <span className="badge badge-accent mb-5">{t("badge")}</span>
          <h2
            id="testimonials-heading"
            className="font-heading text-display-sm font-black text-white mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">{t("subtitle")}</p>
          <div className="divider-accent mt-5 mx-auto" />
        </motion.div>

        {/* ── Grid ────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label={t("title")}
        >
          {testimonials.map((item) => (
            <motion.div key={item.name.en} variants={staggerItem} role="listitem">
              <Card className="relative block h-full bg-white dark:bg-gray-800 rounded-2xl p-7 ring-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-[3px] transition-all duration-350">
                <div className="absolute top-6 right-6 opacity-5" aria-hidden="true">
                  <Quote className="w-16 h-16 text-accent" />
                </div>

                <div className="flex gap-1 mb-5" role="img" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < item.rating ? "fill-accent text-accent" : "text-gray-200 dark:text-gray-700"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="text-gray-700 dark:text-gray-200 leading-relaxed mb-7">
                  &ldquo;{item.text[lang]}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  {item.image ? (
                    <Avatar className="size-11 shrink-0 shadow-md ring-2 ring-accent/20">
                      <AvatarImage src={item.image} alt={item.name[lang]} />
                    </Avatar>
                  ) : (
                    <MonogramAvatar
                      name={item.name[lang]}
                      className="size-11 shrink-0 rounded-full shadow-md ring-2 ring-accent/20 text-sm"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 dark:text-white text-sm truncate">
                      {item.name[lang]}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {item.role[lang]}, <span className="text-accent font-semibold">{item.company[lang]}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
