"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Smartphone, BarChart3, Globe, Server, Palette, Megaphone, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fadeLeft, staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const services = [
  { key: "software",       image: "/images/services/web-applications.jpg",   Icon: Code2 },
  { key: "mobile",         image: "/images/services/mobile-apps.jpg",        Icon: Smartphone },
  { key: "erp",            image: "/images/services/erp-systems.jpg",        Icon: BarChart3 },
  { key: "web",            image: "/images/services/website-development.jpg",Icon: Globe },
  { key: "infrastructure", image: "/images/services/it-infrastructure.jpg",  Icon: Server },
  { key: "uiux",           image: "/images/services/uiux-design.jpg",        Icon: Palette },
  { key: "marketing",      image: "/images/services/social-media.jpg",       Icon: Megaphone },
  { key: "consulting",     image: "/images/services/company-setup.jpg",      Icon: Building2 },
] as const;

interface ServicesPreviewProps {
  locale: string;
}

export default function ServicesPreview({ locale }: ServicesPreviewProps) {
  const t = useTranslations("services");
  const [featured, ...rest] = services;
  const FeaturedIcon = featured.Icon;

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

        {/* ── Spotlight + list ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* Spotlight panel */}
          <motion.article
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-3 group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3] sm:aspect-[16/10]"
          >
            <div className="absolute inset-0">
              <Image
                src={featured.image}
                alt={t(`${featured.key}.title`)}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/45 to-gray-950/10 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-300" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-7 md:p-9">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:border-accent w-fit">
                <FeaturedIcon
                  className="w-6 h-6 text-accent transition-colors duration-300 group-hover:text-dark"
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                {t(`${featured.key}.title`)}
              </h3>
              <p className="text-gray-300/75 text-sm md:text-base leading-relaxed mb-5 max-w-md">
                {t(`${featured.key}.description`)}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {(t.raw(`${featured.key}.features`) as string[]).map((f: string) => (
                  <Badge
                    key={f}
                    variant="outline"
                    className="text-[11px] font-medium bg-white/10 text-white/70 border-white/15 backdrop-blur-sm"
                  >
                    {f}
                  </Badge>
                ))}
              </div>

              <Link
                href={`/${locale}/services`}
                className={buttonVariants({ className: "w-fit h-auto px-6 py-3 rounded-xl" })}
                aria-label={`${t("learnMore")} — ${t(`${featured.key}.title`)}`}
              >
                {t("learnMore")}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.article>

          {/* Compact list */}
          <motion.div
            variants={staggerContainer(.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-2 flex flex-col divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800"
            role="list"
            aria-label={`${t("title")} list`}
          >
            {rest.map(({ key, Icon }) => (
              <motion.div key={key} variants={staggerItem} role="listitem">
                <Link
                  href={`/${locale}/services`}
                  className="group flex items-center gap-4 py-4 hover:px-2 transition-all duration-300"
                  aria-label={`${t("learnMore")} — ${t(`${key}.title`)}`}
                >
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/15 border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <Icon className="w-5 h-5 text-accent group-hover:text-dark transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors truncate">
                      {t(`${key}.title`)}
                    </h4>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-gray-400 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

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
            className={buttonVariants({ variant: "outline", size: "lg", className: "text-base px-8 py-4 h-auto rounded-xl" })}
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
