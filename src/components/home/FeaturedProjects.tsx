"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, viewport } from "@/lib/animations";
import type { Project } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

interface FeaturedProjectsProps {
  locale: string;
  projects: Project[];
}

export default function FeaturedProjects({ locale, projects }: FeaturedProjectsProps) {
  const t        = useTranslations("portfolio");
  const lang     = locale as "en" | "ar";
  const featured = projects.filter((p) => p.featured).slice(0, 1);

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-surface dark:bg-surface-dark/40 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
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
              className={buttonVariants({ variant: "outline", className: "text-sm h-auto px-6 py-3 rounded-xl" })}
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
            className="group relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] shadow-2xl"
          >
            {/* Browser chrome bar */}
            <div className="mockup-bar" aria-hidden="true">
              <span className="mockup-bar-dot" />
              <span className="mockup-bar-dot" />
              <span className="mockup-bar-dot" />
            </div>
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
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex-1">
                  <Badge className="bg-accent text-dark text-xs font-bold uppercase tracking-wider mb-3">
                    {featured[0].category}
                  </Badge>
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight">
                    {featured[0].title[lang]}
                  </h3>
                  <p className="text-gray-300/80 max-w-xl text-sm md:text-base leading-relaxed hidden md:block">
                    {featured[0].description[lang]}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {featured[0].techStack.slice(0, 5).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs bg-white/15 text-white/80 border-white/10 backdrop-blur-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/${locale}/portfolio/${featured[0].slug}`}
                  className={buttonVariants({ className: "shrink-0 h-auto" })}
                  aria-label={`${t("viewDetails")} — ${featured[0].title[lang]}`}
                >
                  {t("viewDetails")}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
