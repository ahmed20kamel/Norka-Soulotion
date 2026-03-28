"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewport } from "@/lib/animations";
import {
  MicrosoftLogo,
  CiscoLogo,
  AWSLogo,
  GoogleCloudLogo,
  FortinetLogo,
  VMwareLogo,
  DellLogo,
  HPLogo,
} from "@/components/icons/PartnerLogos";

const partners = [
  { name: "Microsoft", Logo: MicrosoftLogo },
  { name: "Cisco", Logo: CiscoLogo },
  { name: "AWS", Logo: AWSLogo },
  { name: "Google Cloud", Logo: GoogleCloudLogo },
  { name: "Fortinet", Logo: FortinetLogo },
  { name: "VMware", Logo: VMwareLogo },
  { name: "Dell", Logo: DellLogo },
  { name: "HP", Logo: HPLogo },
];

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section className="py-24 bg-surface dark:bg-surface-dark/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-5 h-1 w-16 bg-gradient-to-r from-accent to-accent-light rounded-full mx-auto" />
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {partners.map(({ name, Logo }) => (
            <motion.div
              key={name}
              variants={staggerItem}
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-accent/30 dark:hover:border-accent/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Gradient hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative text-gray-400 dark:text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-500 filter grayscale group-hover:grayscale-0">
                <Logo className="h-8 w-auto max-w-[120px]" />
              </div>
              <span className="mt-3 text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-accent transition-colors duration-300">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
