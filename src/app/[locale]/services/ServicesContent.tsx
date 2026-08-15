"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Code2, Smartphone, BarChart3, Globe, Server, Palette, Megaphone, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/home/CTASection";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";
import type { ServiceCopy } from "@/sanity/lib/fetch-content";
import { images } from "@/lib/images.config";

const serviceIcons: Record<string, typeof Code2> = {
  software:       Code2,
  mobile:         Smartphone,
  erp:            BarChart3,
  web:            Globe,
  infrastructure: Server,
  uiux:           Palette,
  marketing:      Megaphone,
  consulting:     Building2,
};

interface ServicesContentProps {
  serviceCopy?: ServiceCopy[] | null;
}

export default function ServicesContent({ serviceCopy }: ServicesContentProps) {
  const t      = useTranslations("services");
  const navT   = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const lang   = locale as "en" | "ar";
  const isAr   = locale === "ar";

  // CMS copy (when present) wins over the i18n message catalog — same
  // fallback-safe pattern used on the homepage services preview.
  const copyFor = (key: string) => {
    const cms = serviceCopy?.find((s) => s.key === key);
    return {
      title: cms ? cms.title[lang] : t(`${key}.title`),
      description: cms ? cms.description[lang] : t(`${key}.description`),
      features: cms ? cms.features[lang] : (t.raw(`${key}.features`) as string[]),
    };
  };

  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.home.heroWorkspace.src}
            alt={images.home.heroWorkspace.alt}
            fill
            priority
            className="object-cover scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-950/70" />
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

      {/* ── Services Alternating Layout ─────────────────────────── */}
      <section className="section-py bg-background dark:bg-background-dark" aria-labelledby="services-list-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-list-heading" className="sr-only">{t("title")}</h2>

          <div className="space-y-24 md:space-y-32">
            {services.map((service, index) => {
              const isEven  = index % 2 === 0;
              const Icon    = serviceIcons[service.key] ?? Code2;
              const copy    = copyFor(service.key);

              return (
                <motion.article
                  key={service.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: .65 }}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 xl:gap-20 items-center`}
                  aria-label={copy.title}
                >
                  {/* Image */}
                  <motion.div
                    variants={isEven ? fadeLeft : fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="w-full lg:w-[48%] shrink-0"
                  >
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group">
                      <Image
                        src={images.services[service.key as keyof typeof images.services].src}
                        alt={copy.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 48vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/30 to-transparent" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    variants={isEven ? fadeRight : fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="flex-1"
                  >
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/15 border border-accent/20 mb-5"
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5 text-accent" />
                    </div>

                    <h3 className="font-heading text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                      {copy.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                      {copy.description}
                    </p>

                    {/* Features grid */}
                    <ul
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
                      aria-label={isAr ? "المميزات" : "Features"}
                    >
                      {copy.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-2.5">
                          <CheckCircle className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${locale}/contact`}
                      className={buttonVariants({ variant: "outline", className: "text-sm h-auto px-6 py-3 rounded-xl" })}
                      aria-label={`${isAr ? "استفسر عن" : "Inquire about"} ${copy.title}`}
                    >
                      {isAr ? "استفسر الآن" : "Get a quote"}
                    </Link>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
