"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, ArrowUpRight } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { projects } from "@/lib/data/projects";

interface FeaturedProjectsProps {
  locale: string;
}

export default function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t        = useTranslations("portfolio");
  const lang     = locale as "en" | "ar";
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section
      className="py-28 md:py-36 bg-surface dark:bg-surface-dark/40 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="badge badge-accent mb-5">{t("badge")}</span>
            <h2
              id="projects-heading"
              className="font-heading text-display-sm font-black text-gray-900 dark:text-white leading-tight"
            >
              {t("title")}
            </h2>
            <div className="divider-accent mt-5" />
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <Link
              href={`/${locale}/portfolio`}
              className="btn btn-outline text-sm"
              aria-label={t("viewAll")}
            >
              {t("viewAll")}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* ── Featured hero card ───────────────────────────────── */}
        {featured.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="group relative rounded-3xl overflow-hidden mb-5 aspect-video md:aspect-[21/9] shadow-2xl"
          >
            <Image
              src={featured[0].image}
              alt={featured[0].title[lang]}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={false}
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/30 to-transparent" />
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent text-dark text-xs font-bold uppercase tracking-wider mb-3">
                    {featured[0].category}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight">
                    {featured[0].title[lang]}
                  </h3>
                  <p className="text-gray-300/80 max-w-xl text-sm md:text-base leading-relaxed hidden md:block">
                    {featured[0].description[lang]}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {featured[0].techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded-full bg-white/15 text-white/80 border border-white/10 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/${locale}/portfolio/${featured[0].slug}`}
                  className="shrink-0 btn btn-primary"
                  aria-label={`${t("viewDetails")} — ${featured[0].title[lang]}`}
                >
                  {t("viewDetails")}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Side-by-side cards ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.slice(1, 3).map((project, idx) => (
            <motion.div
              key={project.slug}
              variants={idx === 0 ? fadeLeft : fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3] shadow-xl"
            >
              <Image
                src={project.image}
                alt={project.title[lang]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/85 transition-all duration-500 flex items-center justify-center gap-4">
                <motion.div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <Link
                    href={`/${locale}/portfolio/${project.slug}`}
                    className="p-4 rounded-2xl bg-dark/30 hover:bg-dark/50 text-white backdrop-blur-sm transition-all hover:scale-110"
                    aria-label={`${t("viewDetails")} — ${project.title[lang]}`}
                  >
                    <ArrowRight className="w-6 h-6" aria-hidden="true" />
                  </Link>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-dark/30 hover:bg-dark/50 text-white backdrop-blur-sm transition-all hover:scale-110"
                      aria-label={`${t("viewDemo")} — ${project.title[lang]}`}
                    >
                      <ExternalLink className="w-6 h-6" aria-hidden="true" />
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Default content */}
              <div className="absolute bottom-0 left-0 right-0 p-7 group-hover:opacity-0 transition-opacity duration-300">
                <span className="inline-block px-2.5 py-1 rounded-full bg-accent text-dark text-xs font-bold uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-black text-white mb-2">{project.title[lang]}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs rounded-full bg-white/15 text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
