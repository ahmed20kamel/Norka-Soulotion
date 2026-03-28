"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import CTASection from "@/components/home/CTASection";
import { services } from "@/lib/data/services";

export default function ServicesPage() {
  const t = useTranslations("services");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-950 via-dark to-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#C9A96E22,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
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
              const Icon = service.icon;
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
                  {/* Icon side */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl`}
                    >
                      <Icon className="w-16 h-16 text-white" />
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
