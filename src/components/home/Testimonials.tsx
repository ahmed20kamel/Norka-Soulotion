"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { testimonials } from "@/lib/data/testimonials";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TestimonialsProps {
  locale: string;
}

export default function Testimonials({ locale }: TestimonialsProps) {
  const t    = useTranslations("testimonials");
  const lang = locale as "en" | "ar";
  const isAr = locale === "ar";

  const [active,  setActive]  = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(
    () => setActive((a) => (a + 1) % testimonials.length),
    []
  );
  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="section-py bg-background dark:bg-background-dark overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ─────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <span className="badge badge-accent mb-5">{t("badge")}</span>
          <h2
            id="testimonials-heading"
            className="font-heading text-display-sm font-black text-gray-900 dark:text-white mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-lg mx-auto">{t("subtitle")}</p>
          <div className="divider-accent mt-5 mx-auto" />
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Sidebar avatars ─────────────────────────────── */}
          <div
            className="hidden lg:flex lg:col-span-1 flex-col gap-3"
            role="tablist"
            aria-label={isAr ? "اختيار شهادة" : "Select testimonial"}
          >
            {testimonials.map((item, i) => (
              <button
                key={item.name.en}
                role="tab"
                aria-selected={i === active}
                aria-controls="testimonial-panel"
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  i === active
                    ? "bg-accent/10 dark:bg-accent/15 border-2 border-accent/40"
                    : "bg-surface dark:bg-surface-dark border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                <Avatar className="shrink-0 size-10">
                  <AvatarImage src={item.image} alt={item.name[lang]} />
                  <AvatarFallback>{item.name[lang].charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.name[lang]}</div>
                  <div className="text-xs text-gray-500 truncate">{item.company[lang]}</div>
                </div>
              </button>
            ))}
          </div>

          {/* ── Main card ───────────────────────────────────── */}
          <div
            id="testimonial-panel"
            className="lg:col-span-4"
            role="tabpanel"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: isAr ? -40 : 40, scale: .97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: isAr ? 40 : -40, scale: .97 }}
                transition={{ duration: .45, ease: [.25, .46, .45, .94] }}
              >
              <Card className="relative block bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 ring-gray-100 dark:ring-gray-700 shadow-xl">
                {/* Big quote icon */}
                <div className="absolute top-8 right-8 opacity-5" aria-hidden="true">
                  <Quote className="w-28 h-28 text-accent" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-7" aria-label={`${testimonials[active].rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[active].rating ? "fill-accent text-accent" : "text-gray-200 dark:text-gray-700"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed font-light mb-10">
                  &ldquo;{testimonials[active].text[lang]}&rdquo;
                </blockquote>

                {/* Author + nav */}
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-14 shadow-md ring-2 ring-accent/20">
                      <AvatarImage src={testimonials[active].image} alt={testimonials[active].name[lang]} />
                      <AvatarFallback>{testimonials[active].name[lang].charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
                        {testimonials[active].name[lang]}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonials[active].role[lang]},{" "}
                        <span className="text-accent font-semibold">{testimonials[active].company[lang]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow controls */}
                  <div className="flex gap-2" role="group" aria-label={isAr ? "التنقل بين الشهادات" : "Navigate testimonials"}>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prev}
                      aria-label={isAr ? "السابق" : "Previous testimonial"}
                      className="rounded-xl hover:bg-accent hover:text-dark hover:border-accent"
                    >
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={next}
                      aria-label={isAr ? "التالي" : "Next testimonial"}
                      className="rounded-xl hover:bg-accent hover:text-dark hover:border-accent"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </Card>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div
              className="flex justify-center gap-2 mt-5"
              role="group"
              aria-label={isAr ? "مؤشرات الشهادات" : "Testimonial indicators"}
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`${isAr ? "شهادة" : "Testimonial"} ${i + 1}`}
                  aria-pressed={i === active}
                  className={`rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    i === active ? "w-7 h-2.5 bg-accent" : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
