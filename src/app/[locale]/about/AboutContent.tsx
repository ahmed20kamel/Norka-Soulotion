"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Lightbulb, Award, Shield, HeadphonesIcon,
  Target, Eye, Users, Trophy, Rocket, Handshake,
} from "lucide-react";
import CTASection from "@/components/home/CTASection";
import { Card } from "@/components/ui/card";
import { images } from "@/lib/images.config";
import { COMPANY_STATS } from "@/lib/constants";
import { staggerContainer, staggerItem, fadeLeft, fadeRight, viewport } from "@/lib/animations";

const valueIcons = {
  innovation:  Lightbulb,
  quality:     Award,
  reliability: Shield,
  support:     HeadphonesIcon,
};

export default function AboutContent() {
  const t      = useTranslations("about");
  const navT   = useTranslations("nav");
  const statsT = useTranslations("stats");
  const params = useParams();
  const locale = params.locale as string;
  const isAr   = locale === "ar";

  const values = ["innovation", "quality", "reliability", "support"] as const;

  const stats = [
    { icon: Trophy,    value: COMPANY_STATS.years,    label: statsT("years") },
    { icon: Rocket,    value: COMPANY_STATS.projects, label: statsT("projects") },
    { icon: Handshake, value: COMPANY_STATS.clients,  label: statsT("clients") },
    { icon: Users,     value: COMPANY_STATS.team,     label: statsT("team") },
  ];

  const timelineItems = isAr
    ? [
        { year: "2020", title: "التأسيس", desc: "تأسست نوركا سوليوشن برؤية واضحة لتقديم حلول تقنية متميزة في الإمارات." },
        { year: "2021", title: "النمو السريع", desc: "توسعنا لنضم فريقاً من 15+ متخصصاً وأنجزنا أول 30 مشروع." },
        { year: "2022", title: "التوسع الإقليمي", desc: "افتتحنا مكاتب في أبوظبي والعين ودبي، وخدمنا عملاء خليجيين." },
        { year: "2024", title: "ريادة الذكاء الاصطناعي", desc: "أطلقنا خدمات الذكاء الاصطناعي وتجاوزنا 150 مشروعاً منجزاً." },
      ]
    : [
        { year: "2020", title: "Founded",         desc: "Norka Solution was established with a clear vision to deliver world-class tech solutions in the UAE." },
        { year: "2021", title: "Rapid Growth",    desc: "We expanded to a team of 15+ specialists and completed our first 30 successful projects." },
        { year: "2022", title: "Regional Expansion", desc: "Opened offices in Abu Dhabi, Al Ain & Dubai, serving Gulf clients across multiple industries." },
        { year: "2024", title: "AI Leadership",   desc: "Launched AI-integrated services and surpassed 150 delivered projects across the UAE." },
      ];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.pageHeroes.about.src}
            alt={images.pageHeroes.about.alt}
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

      {/* ── Story + Image ────────────────────────────────────────── */}
      <section className="section-py bg-background dark:bg-background-dark" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewport} className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src={images.about.team.src}
                  alt={images.about.team.alt}
                  fill className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-5 w-full h-full rounded-3xl border-2 border-accent/15 -z-10" aria-hidden="true" />
              <motion.div
                initial={{ opacity: 0, scale: .85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport} transition={{ delay: .5, type: "spring" }}
                className="absolute -bottom-7 -right-7 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-2xl border border-gray-100 dark:border-gray-700 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                    <Users className="w-5 h-5 text-dark" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">{COMPANY_STATS.team}</div>
                    <div className="text-xs text-gray-500">{t("teamMembers")}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewport}>
              <span className="badge badge-accent mb-6">{t("story")}</span>
              <h2 id="story-heading" className="font-heading text-display-sm font-black text-gray-900 dark:text-white mb-6 leading-tight">
                {t("title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                {t("storyText")}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8" role="list" aria-label={isAr ? "إحصاءات" : "Stats"}>
                {stats.map((s) => (
                  <Card key={s.label} role="listitem" className="block text-center p-4 rounded-2xl bg-surface dark:bg-surface-dark ring-gray-100 dark:ring-gray-800">
                    <s.icon className="w-5 h-5 text-accent mx-auto mb-2" aria-hidden="true" />
                    <div className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</div>
                    <div className="text-[11px] text-gray-500 mt-1">{s.label}</div>
                  </Card>
                ))}
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Target, title: t("mission"), body: t("missionText") },
                  { icon: Eye,    title: t("vision"),  body: t("visionText") },
                ].map(({ icon: Icon, title, body }) => (
                  <Card key={title} className="block p-5 rounded-2xl bg-accent/5 dark:bg-accent/10 ring-accent/15">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <section className="section-py bg-surface dark:bg-surface-dark/50" aria-labelledby="timeline-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport} className="text-center mb-16"
          >
            <span className="badge badge-accent mb-5">{isAr ? "رحلتنا" : "Our Journey"}</span>
            <h2 id="timeline-heading" className="font-heading text-display-sm font-black text-gray-900 dark:text-white">
              {isAr ? "كيف وصلنا إلى هنا" : "How We Got Here"}
            </h2>
            <div className="divider-accent mt-5 mx-auto" />
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent -translate-x-1/2 hidden md:block" aria-hidden="true" />

            <div className="space-y-12">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: .55, delay: i * .1 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Card */}
                  <Card className="flex-1 block p-6 rounded-2xl bg-white dark:bg-gray-800 ring-gray-100 dark:ring-gray-700 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="text-3xl font-black text-accent mb-2">{item.year}</div>
                    <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </Card>

                  {/* Dot */}
                  <div className="shrink-0 w-5 h-5 rounded-full bg-accent border-4 border-background dark:border-background-dark shadow-lg hidden md:flex" aria-hidden="true" />

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────── */}
      <section className="section-py bg-background dark:bg-background-dark" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport} className="text-center mb-16"
          >
            <span className="badge badge-accent mb-5">{isAr ? "فريقنا" : "Our Team"}</span>
            <h2 id="team-heading" className="font-heading text-display-sm font-black text-gray-900 dark:text-white mb-4">
              {t("team")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{t("teamSubtitle")}</p>
            <div className="divider-accent mt-5 mx-auto" />
          </motion.div>

          <motion.div
            variants={staggerContainer(.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
            role="list"
            aria-label={isAr ? "قيادة الفريق" : "Leadership team"}
          >
            {[
              { name: isAr ? "م. نورهان"  : "Eng. Nourhan",  role: isAr ? "المدير التنفيذي"         : "Managing Director", image: "/images/team/nourhan.jpg" },
              { name: isAr ? "أحمد كامل" : "Ahmed Kamel",  role: isAr ? "المؤسس والرئيس التنفيذي" : "CEO & Founder",      image: "/images/team/ahmed.jpg" },
            ].map((member) => (
              <motion.article
                key={member.name}
                variants={staggerItem}
                role="listitem"
                className="group"
              >
              <Card className="bg-white dark:bg-gray-800 rounded-3xl p-0 gap-0 overflow-hidden ring-gray-100 dark:ring-gray-700 hover:ring-accent/30 hover:shadow-2xl transition-all duration-500">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-accent font-semibold text-sm">{member.role}</p>
                </div>
              </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────── */}
      <section className="section-py bg-surface dark:bg-surface-dark/50" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport} className="text-center mb-16"
          >
            <span className="badge badge-accent mb-5">{isAr ? "قيمنا" : "Our Values"}</span>
            <h2 id="values-heading" className="font-heading text-display-sm font-black text-gray-900 dark:text-white">
              {t("whyUs")}
            </h2>
            <div className="divider-accent mt-5 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = valueIcons[value];
              return (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: .5, delay: index * .1 }}
                >
                  <Card className="p-8 text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-6 shadow-lg shadow-accent/20 group-hover:scale-110 group-hover:shadow-accent/30 transition-all duration-400">
                      <Icon className="w-8 h-8 text-dark" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {t(`values.${value}.title`)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {t(`values.${value}.description`)}
                    </p>
                  </Card>
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
