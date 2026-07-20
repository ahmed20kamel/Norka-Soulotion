"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Smartphone, BarChart3, Globe, Server, Palette, Megaphone, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const serviceCards = [
  { key: "software",       image: "/images/services/web-applications.jpg",  Icon: Code2,       span: "lg:col-span-2 lg:row-span-2" },
  { key: "mobile",         image: "/images/services/mobile-apps.jpg",        Icon: Smartphone,  span: "" },
  { key: "erp",            image: "/images/services/erp-systems.jpg",         Icon: BarChart3,   span: "" },
  { key: "web",            image: "/images/services/website-development.jpg", Icon: Globe,       span: "" },
  { key: "infrastructure", image: "/images/services/it-infrastructure.jpg",   Icon: Server,      span: "" },
  { key: "uiux",           image: "/images/services/uiux-design.jpg",         Icon: Palette,     span: "lg:col-span-2" },
  { key: "marketing",      image: "/images/services/social-media.jpg",        Icon: Megaphone,   span: "" },
  { key: "consulting",     image: "/images/services/company-setup.jpg",       Icon: Building2,   span: "" },
] as const;

interface ServicesPreviewProps {
  locale: string;
}

export default function ServicesPreview({ locale }: ServicesPreviewProps) {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      className="section-py bg-surface dark:bg-surface-dark/40 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: .6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="badge badge-accent mb-5">{t("badge")}</span>
          <h2
            id="services-heading"
            className="font-heading text-display-sm font-black text-gray-900 dark:text-white mb-5 leading-tight"
          >
            {t("title")}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="divider-accent mt-6" />
        </motion.div>

        {/* ── Bento Grid ──────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] gap-4"
          role="list"
          aria-label={`${t("title")} list`}
        >
          {serviceCards.map(({ key, image, Icon, span }) => (
            <motion.article
              key={key}
              variants={staggerItem}
              role="listitem"
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${span}`}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={image}
                  alt={t(`${key}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-gray-950/10 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-7">
                {/* Icon pill */}
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:border-accent">
                  <Icon
                    className="w-5 h-5 text-accent transition-colors duration-300 group-hover:text-dark"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 leading-tight">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-gray-300/70 text-sm leading-relaxed mb-4 line-clamp-2">
                  {t(`${key}.description`)}
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(t.raw(`${key}.features`) as string[]).slice(0, 3).map((f: string) => (
                    <Badge
                      key={f}
                      variant="outline"
                      className="text-[11px] font-medium bg-white/10 text-white/70 border-white/15 backdrop-blur-sm"
                    >
                      {f}
                    </Badge>
                  ))}
                </div>

                {/* CTA link */}
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:gap-2.5 transition-all duration-300"
                  aria-label={`${t("learnMore")} — ${t(`${key}.title`)}`}
                >
                  {t("learnMore")}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>

        {/* ── View All CTA ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: .5, delay: .2 }}
          className="flex justify-center mt-14"
        >
          <Link
            href={`/${locale}/services`}
            className={buttonVariants({ size: "lg", className: "text-base px-8 py-4 h-auto rounded-xl" })}
            aria-label={t("viewAll")}
          >
            {t("viewAll")}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
