"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { testimonials } from "@/lib/data/testimonials";

interface TestimonialsProps {
  locale: string;
}

export default function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations("testimonials");
  const lang = locale as "en" | "ar";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1)),
    []
  );
  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="py-32 bg-background dark:bg-background-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 text-accent text-sm font-semibold mb-4">
            {t("badge")}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400">{t("subtitle")}</p>
          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto" />
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Sidebar avatars with real photos */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-4">
            {testimonials.map((item, i) => (
              <motion.button
                key={item.name.en}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 text-left cursor-pointer ${
                  i === active
                    ? "bg-accent/10 dark:bg-accent/20 border-2 border-accent/40"
                    : "bg-surface dark:bg-surface-dark border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                }`}
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name[lang]}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {item.name[lang]}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{item.company[lang]}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Main testimonial */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 60, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative bg-gradient-to-br from-surface to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-10 md:p-14 border border-gray-100 dark:border-gray-700 shadow-2xl"
              >
                {/* Big quote */}
                <div className="absolute top-8 right-8">
                  <Quote className="w-28 h-28 text-accent/5 dark:text-accent/10" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.08, type: "spring" }}
                    >
                      <Star className="w-6 h-6 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 leading-relaxed font-light mb-10">
                  &ldquo;{testimonials[active].text[lang]}&rdquo;
                </p>

                {/* Author with photo + nav */}
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-2 ring-accent/20">
                      <Image
                        src={testimonials[active].image}
                        alt={testimonials[active].name[lang]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xl font-black text-gray-900 dark:text-white">
                        {testimonials[active].name[lang]}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {testimonials[active].role[lang]},{" "}
                        <span className="text-accent font-semibold">
                          {testimonials[active].company[lang]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrows */}
                  <div className="flex gap-3">
                    <button
                      onClick={prev}
                      className="p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={next}
                      className="p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots with progress bar */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === active
                      ? "w-8 h-2.5 bg-accent"
                      : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-accent/50"
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
