"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const params = useParams();
  const locale = params.locale as string;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      label: t("info.address"),
      value: t("info.addressValue"),
      color: "text-accent",
      bg: "bg-accent/5 dark:bg-accent/10",
    },
    {
      icon: Phone,
      label: t("info.phone"),
      value: t("info.phoneValue"),
      color: "text-accent",
      bg: "bg-accent/5 dark:bg-accent/10",
      href: `tel:${t("info.phoneValue")}`,
    },
    {
      icon: Mail,
      label: t("info.email"),
      value: t("info.emailValue"),
      color: "text-accent",
      bg: "bg-accent/5 dark:bg-accent/10",
      href: `mailto:${t("info.emailValue")}`,
    },
    {
      icon: Clock,
      label: t("info.hours"),
      value: t("info.hoursValue"),
      color: "text-accent",
      bg: "bg-accent/5 dark:bg-accent/10",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const serviceOptions = [
    "webApp", "mobileApp", "erp", "website",
    "infrastructure", "uiux", "marketing", "consulting", "other"
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

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

      {/* Contact Section */}
      <section className="py-24 bg-background dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const Wrapper = info.href ? "a" : "div";
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Wrapper
                      {...(info.href ? { href: info.href } : {})}
                      className={`flex items-start gap-4 p-5 rounded-2xl ${info.bg} border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 ${info.href ? "cursor-pointer" : ""}`}
                    >
                      <div className={`p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm ${info.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {info.label}
                        </div>
                        <div className="text-base font-semibold text-gray-900 dark:text-white" dir={info.icon === Phone ? "ltr" : undefined}>
                          {info.value}
                        </div>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("social")}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-3 rounded-xl bg-surface dark:bg-surface-dark hover:bg-accent hover:text-white text-gray-600 dark:text-gray-400 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-surface dark:bg-surface-dark rounded-3xl p-8 md:p-10 border border-gray-200 dark:border-gray-800"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                      placeholder={t("form.name")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                      placeholder={t("form.email")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                      placeholder={t("form.phone")}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("form.service")}
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                      defaultValue=""
                    >
                      <option value="" disabled>{t("form.servicePlaceholder")}</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {t(`form.serviceOptions.${opt}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("form.message")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all resize-none"
                    placeholder={t("form.message")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-dark bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {t("form.sent")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t("form.send")}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
