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
  const t = useTranslations("portfolio");
  const lang = locale as "en" | "ar";
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="py-32 bg-surface dark:bg-surface-dark/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewport}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 text-accent text-sm font-semibold mb-4">
              {t("badge")}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              {t("title")}
            </h2>
          </motion.div>
          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewport}>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-accent text-accent hover:bg-accent hover:text-dark transition-all duration-300 font-semibold"
            >
              {t("viewAll")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* First project - wide hero card */}
        {featured.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="group relative rounded-3xl overflow-hidden mb-6 aspect-video md:aspect-[21/8] cursor-pointer"
          >
            <Image
              src={featured[0].image}
              alt={featured[0].title[lang]}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/80 text-dark text-xs font-bold uppercase tracking-wider mb-3">
                    {featured[0].category}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-2">
                    {featured[0].title[lang]}
                  </h3>
                  <p className="text-gray-300 max-w-xl hidden md:block">
                    {featured[0].description[lang]}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {featured[0].techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/${locale}/portfolio/${featured[0].slug}`}
                  className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-dark font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {t("viewDetails")}
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next two projects - side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.slice(1, 3).map((project, idx) => (
            <motion.div
              key={project.slug}
              variants={idx === 0 ? fadeLeft : fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3]"
            >
              <Image
                src={project.image}
                alt={project.title[lang]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-90 transition-all duration-500 flex items-center justify-center gap-4">
                <Link
                  href={`/${locale}/portfolio/${project.slug}`}
                  className="p-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all hover:scale-110"
                >
                  <ArrowRight className="w-6 h-6" />
                </Link>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all hover:scale-110"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                <span className="inline-block px-2.5 py-1 rounded-full bg-accent/80 text-dark text-xs font-bold uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-black text-white mb-2">
                  {project.title[lang]}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs rounded-full bg-white/20 text-white/90">
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
