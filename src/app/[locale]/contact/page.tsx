"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/lib/images.config";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const params = useParams();
  const locale = params.locale as string;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

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

  const serviceOptions = [
    "webApp", "mobileApp", "erp", "website",
    "infrastructure", "uiux", "marketing", "consulting", "other"
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setIsSubmitted(true);
      formRef.current?.reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch {
      setError(locale === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.pageHeroes.contact.src}
            alt={images.pageHeroes.contact.alt}
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

            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <form
                ref={formRef}
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
                      name="name"
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
                      name="email"
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
                      name="phone"
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
                      name="service"
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
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all resize-none"
                    placeholder={t("form.message")}
                  />
                </div>

                {error && (
                  <div className="mb-4 flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitted || isSubmitting}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-dark bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {t("form.sent")}
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t("form.sending")}
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
