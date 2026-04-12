"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";
import {
  MicrosoftLogo, CiscoLogo, AWSLogo, GoogleCloudLogo,
  FortinetLogo, VMwareLogo, DellLogo, HPLogo,
} from "@/components/icons/PartnerLogos";

const partners = [
  { name: "Microsoft",    Logo: MicrosoftLogo },
  { name: "Cisco",        Logo: CiscoLogo },
  { name: "AWS",          Logo: AWSLogo },
  { name: "Google Cloud", Logo: GoogleCloudLogo },
  { name: "Fortinet",     Logo: FortinetLogo },
  { name: "VMware",       Logo: VMwareLogo },
  { name: "Dell",         Logo: DellLogo },
  { name: "HP",           Logo: HPLogo },
];

function PartnerMarquee({ items, reverse = false }: { items: typeof partners; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-1">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface dark:from-surface-dark/40 to-transparent z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface dark:from-surface-dark/40 to-transparent z-10 pointer-events-none" aria-hidden="true" />

      <div className={`flex gap-5 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map(({ name, Logo }, i) => (
          <div
            key={`${name}-${i}`}
            className="group flex items-center gap-4 px-8 py-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-accent/30 hover:shadow-lg transition-all duration-400 shrink-0 cursor-default"
            aria-label={name}
          >
            <div className="text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200 filter grayscale group-hover:grayscale-0 transition-all duration-500">
              <Logo className="h-7 w-auto max-w-[110px]" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section
      className="py-20 md:py-24 bg-surface dark:bg-surface-dark/40 overflow-hidden"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-gray-400 mb-4">
            {t("subtitle")}
          </p>
          <h2
            id="partners-heading"
            className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3"
          >
            {t("title")}
          </h2>
          <div className="divider-accent mt-4 mx-auto" />
        </motion.div>
      </div>

      {/* Full-width marquee */}
      <PartnerMarquee items={partners} />
    </section>
  );
}
