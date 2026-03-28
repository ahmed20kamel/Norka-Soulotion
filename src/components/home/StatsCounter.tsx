"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { Trophy, Rocket, Handshake, UsersRound } from "lucide-react";

export default function StatsCounter() {
  const t = useTranslations("stats");

  const stats: { end: number; suffix: string; label: string; icon: typeof Trophy }[] = [
    { end: 5, suffix: "+", label: t("years"), icon: Trophy },
    { end: 150, suffix: "+", label: t("projects"), icon: Rocket },
    { end: 80, suffix: "+", label: t("clients"), icon: Handshake },
    { end: 30, suffix: "+", label: t("team"), icon: UsersRound },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="relative text-center group"
            >
              <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20"
                >
                  <stat.icon className="w-7 h-7 text-accent" />
                </motion.div>
                <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
