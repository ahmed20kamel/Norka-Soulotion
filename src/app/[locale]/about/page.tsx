"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Lightbulb,
  Award,
  Shield,
  HeadphonesIcon,
  Target,
  Eye,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/home/CTASection";
import { images } from "@/lib/images.config";

const valueIcons = {
  innovation: Lightbulb,
  quality: Award,
  reliability: Shield,
  support: HeadphonesIcon,
};

export default function AboutPage() {
  const t = useTranslations("about");
  const params = useParams();
  const locale = params.locale as string;

  const values = ["innovation", "quality", "reliability", "support"] as const;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.pageHeroes.about.src}
            alt={images.pageHeroes.about.alt}
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

      {/* Story Section */}
      <section className="py-24 bg-background dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-surface dark:bg-surface-dark">
                <Image
                  src={images.about.team.src}
                  alt={images.about.team.alt}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Users className="w-20 h-20 text-accent/30" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      30+
                    </div>
                    <div className="text-sm text-gray-500">{t("teamMembers")}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t("story")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                {t("storyText")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Mission */}
                <div className="bg-accent/5 dark:bg-accent/10 rounded-2xl p-6 border border-accent/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-accent" />
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {t("mission")}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("missionText")}
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-accent/5 dark:bg-accent/10 rounded-2xl p-6 border border-accent/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Eye className="w-6 h-6 text-accent" />
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {t("vision")}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("visionText")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-surface dark:bg-surface-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("team")} subtitle={t("teamSubtitle")} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-3xl mx-auto">
            {[
              {
                name: locale === "ar" ? "م. نورهان" : "Eng. Nourhan",
                role: locale === "ar" ? "المدير التنفيذي" : "Managing Director",
                image: "/images/team/nourhan.jpg",
              },
              {
                name: locale === "ar" ? "أحمد كامل" : "Ahmed Kamel",
                role: locale === "ar" ? "المؤسس والرئيس التنفيذي" : "CEO & Founder",
                image: "/images/team/ahmed.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("whyUs")} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = valueIcons[value];
              return (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(`values.${value}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t(`values.${value}.description`)}
                  </p>
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
