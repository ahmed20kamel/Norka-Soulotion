"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { images } from "@/lib/images.config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const filterCategories = [
  { key: "all",    translationKey: "filterAll" },
  { key: "erp",    translationKey: "filterERP" },
  { key: "web",    translationKey: "filterWeb" },
  { key: "mobile", translationKey: "filterMobile" },
];

interface PortfolioContentProps {
  projects: Project[];
}

export default function PortfolioContent({ projects }: PortfolioContentProps) {
  const t       = useTranslations("portfolio");
  const navT    = useTranslations("nav");
  const params  = useParams();
  const locale  = params.locale as string;
  const lang    = locale as "en" | "ar";
  const isAr    = locale === "ar";

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.pageHeroes.portfolio.src}
            alt={images.pageHeroes.portfolio.alt}
            fill className="object-cover scale-105" priority sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-950/78" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background dark:from-background-dark to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.nav
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-white/50 text-sm mb-6 font-medium"
            aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}
          >
            <Link href={`/${locale}`} className="hover:text-white/70 transition-colors">{navT("home")}</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-accent">{t("title")}</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
            className="font-heading text-display font-black text-white mb-5"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}
            className="text-lg md:text-xl text-gray-300/80 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* ── Portfolio Grid ───────────────────────────────────────── */}
      <section className="section-py bg-background dark:bg-background-dark" aria-labelledby="portfolio-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="portfolio-heading" className="sr-only">{t("title")}</h2>

          {/* Filter tabs */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-14"
            role="tablist"
            aria-label={isAr ? "تصفية المشاريع" : "Filter projects"}
          >
            {filterCategories.map(({ key, translationKey }) => (
              <Button
                key={key}
                variant={activeFilter === key ? "default" : "secondary"}
                role="tab"
                aria-selected={activeFilter === key}
                onClick={() => setActiveFilter(key)}
                className={cn(
                  "h-auto px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300",
                  activeFilter === key && "shadow-lg shadow-accent/25 scale-105"
                )}
              >
                {t(translationKey)}
              </Button>
            ))}
          </div>

          {/* Project count */}
          <motion.p
            layout
            className="text-center text-sm text-gray-400 mb-10"
            aria-live="polite"
            aria-atomic="true"
          >
            {isAr
              ? `عرض ${filteredProjects.length} مشروع`
              : `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? "s" : ""}`}
          </motion.p>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label={isAr ? "قائمة المشاريع" : "Projects list"}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.slug}
                  role="listitem"
                  layout
                  initial={{ opacity: 0, scale: .92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: .92 }}
                  transition={{ duration: .35 }}
                  className="group"
                >
                <Card className="p-0 gap-0 overflow-hidden hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-[3px] hover:ring-accent/25 transition-all duration-350">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-[calc(1.25rem-1px)]">
                    {/* Browser chrome bar */}
                    <div className="mockup-bar" aria-hidden="true">
                      <span className="mockup-bar-dot" />
                      <span className="mockup-bar-dot" />
                      <span className="mockup-bar-dot" />
                    </div>
                    <Image
                      src={project.image}
                      alt={project.title[lang]}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-950/20 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-12 left-4 z-[3]">
                      <Badge className="text-xs font-bold bg-accent/90 text-dark uppercase tracking-wider backdrop-blur-sm">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent group-hover:from-gray-950/95 group-hover:via-gray-950/60 group-hover:bg-accent/10 flex items-center justify-center gap-4 transition-all duration-300">
                      <motion.div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        <Link
                          href={`/${locale}/portfolio/${project.slug}`}
                          className="glass-dark p-3.5 rounded-2xl text-white transition-all duration-200 hover:scale-110 hover:border-accent/40"
                          aria-label={`${t("viewDetails")} — ${project.title[lang]}`}
                        >
                          <ArrowRight className="w-5 h-5" aria-hidden="true" />
                        </Link>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-dark p-3.5 rounded-2xl text-white transition-all duration-200 hover:scale-110 hover:border-accent/40"
                            aria-label={`${t("viewDemo")} — ${project.title[lang]}`}
                          >
                            <ExternalLink className="w-5 h-5" aria-hidden="true" />
                          </a>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors leading-tight">
                      {project.title[lang]}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description[lang]}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs font-medium rounded-lg bg-surface dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Link
                      href={`/${locale}/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:gap-2.5 transition-all duration-300"
                      aria-label={`${t("viewDetails")} — ${project.title[lang]}`}
                    >
                      {t("viewDetails")}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">{isAr ? "لا توجد مشاريع في هذه الفئة" : "No projects in this category yet."}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
