"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { Trophy, Rocket, Handshake, UsersRound } from "lucide-react";
import { COMPANY_STATS } from "@/lib/constants";

export default function StatsCounter() {
  const t = useTranslations("stats");

  const stats = [
    { end: parseInt(COMPANY_STATS.years),    suffix: "+", label: t("years"),    icon: Trophy,      color: "from-amber-400/20 to-amber-400/5",    iconColor: "text-amber-400" },
    { end: parseInt(COMPANY_STATS.projects), suffix: "+", label: t("projects"), icon: Rocket,      color: "from-blue-400/20 to-blue-400/5",       iconColor: "text-blue-400" },
    { end: parseInt(COMPANY_STATS.clients),  suffix: "+", label: t("clients"),  icon: Handshake,   color: "from-emerald-400/20 to-emerald-400/5", iconColor: "text-emerald-400" },
    { end: parseInt(COMPANY_STATS.team),     suffix: "+", label: t("team"),     icon: UsersRound,  color: "from-purple-400/20 to-purple-400/5",   iconColor: "text-purple-400" },
  ];

  return (
    <section
      className="relative py-20 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,169,110,.8) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [.08, .18, .08] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [.06, .14, .06] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/25 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          role="list"
          aria-label="Company achievement numbers"
        >
          {stats.map(({ end, suffix, label, icon: Icon, color, iconColor }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              role="listitem"
              className="group relative text-center"
            >
              <div className="relative p-6 md:p-8 rounded-3xl bg-white/[.04] backdrop-blur-sm border border-white/[.08] hover:bg-white/[.07] hover:border-white/[.15] transition-all duration-400 hover:-translate-y-2">
                {/* Icon */}
                <div
                  className={`mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${color} border border-white/10 group-hover:scale-110 transition-transform duration-400`}
                >
                  <Icon className={`w-7 h-7 ${iconColor}`} aria-hidden="true" />
                </div>

                {/* Counter */}
                <AnimatedCounter end={end} suffix={suffix} label={label} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
