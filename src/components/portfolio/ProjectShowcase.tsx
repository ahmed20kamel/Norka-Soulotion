"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  MessageSquare,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import type { Project } from "@/lib/data/projects";

interface ProjectShowcaseProps {
  project: Project;
  locale: string;
}

export default function ProjectShowcase({
  project,
  locale,
}: ProjectShowcaseProps) {
  const t = useTranslations("portfolio");
  const lang = locale as "en" | "ar";

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allShots = project.screenshots.length > 0
    ? project.screenshots
    : [project.image];

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const prev = () =>
    setLightboxIndex((i) => (i === 0 ? allShots.length - 1 : i - 1));
  const next = () =>
    setLightboxIndex((i) => (i === allShots.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-0">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title[lang]}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <Link
                href={`/${locale}/portfolio`}
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("title")}
              </Link>
              <span className="block px-3 py-1 rounded-full bg-accent/90 text-dark text-xs font-semibold uppercase tracking-wider w-fit mb-4">
                {project.category}
              </span>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {project.title[lang]}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                {project.description[lang]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      {allShots.length > 1 && (
        <section className="py-10 bg-surface dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Images className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {locale === "ar" ? "لقطات الشاشة" : "Screenshots"}
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({allShots.length})
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {allShots.map((shot, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border-2 border-transparent hover:border-accent transition-all duration-300 focus:outline-none focus:border-accent"
                >
                  <Image
                    src={shot}
                    alt={`${project.title[lang]} screenshot ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                    {idx + 1}
                  </div>
                </motion.button>
              ))}
            </div>

            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 italic">
              {locale === "ar"
                ? "ضع لقطات الشاشة الحقيقية في: public/images/projects/" + project.slug + "/"
                : "Replace images at: public/images/projects/" + project.slug + "/"}
            </p>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
              {lightboxIndex + 1} / {allShots.length}
            </div>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allShots[lightboxIndex]}
                alt={`Screenshot ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </motion.div>

            {allShots.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allShots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === lightboxIndex
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <section className="py-16 bg-background dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.fullDescription[lang]}
                </p>
              </motion.div>

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-8 border border-red-100 dark:border-red-900/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("challenge")}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {project.challenge[lang]}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-accent/5 dark:bg-accent/10 rounded-2xl p-8 border border-accent/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("solution")}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {project.solution[lang]}
                </p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-8 border border-green-100 dark:border-green-900/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t("results")}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {project.results[lang]}
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-surface dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {t("techStack")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-surface dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {t("keyFeatures")}
                </h3>
                <ul className="space-y-3">
                  {project.features[lang].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Demo Link */}
              {project.demoUrl && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-base font-semibold text-dark bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {t("viewDemo")}
                  </a>
                </motion.div>
              )}

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 text-white border border-gray-800"
              >
                <MessageSquare className="w-8 h-8 mb-4 text-accent" />
                <h3 className="text-lg font-bold mb-2">
                  {t("similarProject")}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {t("similarProjectDesc")}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-dark hover:bg-accent-light transition-all duration-300"
                >
                  {t("contactUs")}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
