"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewport } from "@/lib/animations";

const technologies = [
  {
    name: "React",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="4" fill="#61DAFB" />
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" fill="currentColor" />
        <path d="M16 12V28L28 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 24V28" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#3178C6" />
        <text x="20" y="28" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="20" fill="white">TS</text>
      </svg>
    ),
  },
  {
    name: "Django",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#092E20" />
        <text x="20" y="28" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="16" fill="white">Dj</text>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" fill="#336791" />
        <text x="20" y="26" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="12" fill="white">PG</text>
      </svg>
    ),
  },
  {
    name: "React Native",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="10" y="4" width="20" height="32" rx="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="20" r="3" fill="#61DAFB" />
        <ellipse cx="20" cy="20" rx="12" ry="5" stroke="#61DAFB" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#339933" />
        <text x="20" y="27" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="14" fill="white">N</text>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M10 18C12 12 16 10 22 12C25 13 27 12 29 9C30 14 27 17 22 17C19 17 17 18 15 21C14 16 12 14 10 18Z" fill="#06B6D4" />
        <path d="M16 26C18 20 22 18 28 20C31 21 33 20 35 17C36 22 33 25 28 25C25 25 23 26 21 29C20 24 18 22 16 26Z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: "Python",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#3776AB" />
        <text x="20" y="27" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="14" fill="#FFD43B">Py</text>
      </svg>
    ),
  },
  {
    name: "Docker",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#2496ED" />
        <rect x="10" y="14" width="5" height="4" rx="0.5" fill="white" />
        <rect x="17" y="14" width="5" height="4" rx="0.5" fill="white" />
        <rect x="24" y="14" width="5" height="4" rx="0.5" fill="white" />
        <rect x="10" y="20" width="5" height="4" rx="0.5" fill="white" />
        <rect x="17" y="20" width="5" height="4" rx="0.5" fill="white" />
        <path d="M8 26C12 28 32 28 34 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "AWS",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="2" y="2" width="36" height="36" rx="4" fill="#232F3E" />
        <text x="20" y="24" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="11" fill="#FF9900">aws</text>
        <path d="M10 28 Q20 32 30 28" stroke="#FF9900" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Figma",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="12" y="4" width="8" height="10" rx="4" fill="#F24E1E" />
        <rect x="20" y="4" width="8" height="10" rx="4" fill="#FF7262" />
        <rect x="12" y="14" width="8" height="10" rx="4" fill="#A259FF" />
        <circle cx="24" cy="19" r="5" fill="#1ABCFE" />
        <rect x="12" y="24" width="8" height="12" rx="4" fill="#0ACF83" />
      </svg>
    ),
  },
];

export default function TechStack() {
  const t = useTranslations("techStack");

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 text-accent text-sm font-semibold mb-4">
            {t("badge")}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto" />
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={staggerItem}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-surface dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:border-accent/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                {tech.logo}
              </div>
              <span className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-accent transition-colors duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
