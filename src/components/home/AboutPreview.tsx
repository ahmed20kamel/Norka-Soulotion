"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Rocket, Handshake } from "lucide-react";
import { fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { images } from "@/lib/images.config";

interface AboutPreviewProps {
  locale: string;
}

export default function AboutPreview({ locale }: AboutPreviewProps) {
  const t = useTranslations("about");
  const statsT = useTranslations("stats");

  const stats = [
    { icon: Trophy, value: "5+", label: statsT("years") },
    { icon: Rocket, value: "150+", label: statsT("projects") },
    { icon: Handshake, value: "80+", label: statsT("clients") },
    { icon: Users, value: "30+", label: statsT("team") },
  ];

  return (
    <section className="py-32 bg-white dark:bg-gray-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src={images.about.team.src}
                alt={images.about.team.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 to-transparent" />
            </div>

            {/* Decorative accent frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-accent/20 -z-10" />

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white leading-none">30+</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t("teamMembers")}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 text-accent text-sm font-semibold mb-5">
              {t("story")}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
              {t("storyText")}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl bg-surface dark:bg-surface-dark border border-gray-100 dark:border-gray-800">
                  <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/about`}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-accent font-semibold border-2 border-accent hover:bg-accent hover:text-white transition-all duration-300"
            >
              {t("learnMore")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
