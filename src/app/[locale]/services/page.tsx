"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import CTASection from "@/components/home/CTASection";
import { services } from "@/lib/data/services";
import { images } from "@/lib/images.config";

const serviceImages: Record<string, string> = {
  software: "/images/services/web-applications.jpg",
  mobile: "/images/services/mobile-apps.jpg",
  erp: "/images/services/erp-systems.jpg",
  web: "/images/services/website-development.jpg",
  infrastructure: "/images/services/it-infrastructure.jpg",
  uiux: "/images/services/uiux-design.jpg",
  marketing: "/images/services/social-media.jpg",
  consulting: "/images/services/company-setup.jpg",
};

export default function ServicesPage() {
  const t = useTranslations("services");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.pageHeroes.services.src}
            alt={images.pageHeroes.services.alt}
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gray-950/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background dark:from-background-dark to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/50 text-sm mb-6 font-medium"
          >
            <span className="hover:text-white/70 transition-colors">Home</span>
            <span className="mx-2">/</span>
            <span className="text-accent">{t("title")}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-lg md:text-xl text-gray-300/80 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-12 items-center`}
                >
                  {/* Image side */}
                  <div className="flex-shrink-0 w-full lg:w-[45%]">
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group">
                      <Image
                        src={serviceImages[service.key]}
                        alt={t(`${service.key}.title`)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {t(`${service.key}.title`)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                      {t(`${service.key}.description`)}
                    </p>

                    {/* Features grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {(t.raw(`${service.key}.features`) as string[]).map(
                        (feature: string) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {feature}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
