"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images.config";
import {
  MapPin, Phone, Mail, Clock,
  Send, CheckCircle, AlertCircle, Loader2, ArrowRight,
} from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";

export default function ContactContent() {
  const t      = useTranslations("contact");
  const navT   = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const isAr   = locale === "ar";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]               = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const contactInfo = [
    { icon: MapPin, label: t("info.address"), value: t("info.addressValue"), href: undefined },
    { icon: Phone,  label: t("info.phone"),   value: t("info.phoneValue"),   href: `tel:${t("info.phoneValue")}` },
    { icon: Mail,   label: t("info.email"),   value: t("info.emailValue"),   href: `mailto:${t("info.emailValue")}` },
    { icon: Clock,  label: t("info.hours"),   value: t("info.hoursValue"),   href: undefined },
  ];

  const serviceOptions = [
    "webApp", "mobileApp", "erp", "website",
    "infrastructure", "uiux", "marketing", "consulting", "other",
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name:    formData.get("name") as string,
      email:   formData.get("email") as string,
      phone:   formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setIsSubmitted(true);
      formRef.current?.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setError(isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/40 focus:border-accent outline-none transition-all duration-200 text-sm";

  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden" aria-label={isAr ? "ترويسة الصفحة" : "Page hero"}>
        <div className="absolute inset-0">
          <Image
            src={images.pageHeroes.contact.src}
            alt={images.pageHeroes.contact.alt}
            fill className="object-cover scale-105" priority
            sizes="100vw"
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

      {/* ── Contact Section ─────────────────────────────────────── */}
      <section className="section-py bg-background dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-16">

            {/* ── Left: Info ────────────────────────────────────── */}
            <motion.div
              variants={staggerContainer(.1)}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 space-y-4"
              aria-label={isAr ? "معلومات الاتصال" : "Contact information"}
            >
              {contactInfo.map(({ icon: Icon, label, value, href }) => {
                const Tag = href ? "a" : "div";
                return (
                  <motion.div key={label} variants={staggerItem}>
                    <Tag
                      {...(href ? { href } : {})}
                      className={`flex items-start gap-4 p-5 rounded-2xl bg-surface dark:bg-surface-dark border border-gray-200 dark:border-gray-800 transition-all duration-300 ${href ? "hover:border-accent/40 hover:shadow-lg cursor-pointer group" : ""}`}
                    >
                      <div className="p-3 rounded-xl bg-accent/10 dark:bg-accent/15 shrink-0">
                        <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                        <div
                          className={`text-sm font-semibold text-gray-900 dark:text-white truncate ${href ? "group-hover:text-accent transition-colors" : ""}`}
                          dir={Icon === Phone ? "ltr" : undefined}
                        >
                          {value}
                        </div>
                      </div>
                    </Tag>
                  </motion.div>
                );
              })}

              {/* Quick CTA */}
              <motion.div variants={staggerItem}>
                <div className="p-6 rounded-2xl bg-gray-950 dark:bg-gray-900 border border-gray-800">
                  <p className="text-white font-semibold text-sm mb-4">
                    {isAr ? "هل تريد استشارة سريعة؟" : "Want a quick consultation?"}
                  </p>
                  <a
                    href="https://wa.me/971507257157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center text-sm py-3"
                    aria-label={isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                  >
                    {isAr ? "واتساب مباشر" : "WhatsApp us now"}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <p className="text-gray-600 text-xs text-center mt-3">
                    {isAr ? "رد فوري · بدون رسوم" : "Instant reply · No fees"}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: Form ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .6, delay: .3 }}
              className="lg:col-span-3"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-surface dark:bg-surface-dark rounded-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-800 shadow-sm"
                aria-label={isAr ? "نموذج الاتصال" : "Contact form"}
                noValidate
              >
                <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  {isAr ? "أرسل لنا رسالة" : "Send us a message"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.name")} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text" name="name" required
                      className={inputClass}
                      placeholder={t("form.name")}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.email")} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email" name="email" required
                      className={inputClass}
                      placeholder={t("form.email")}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.phone")}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel" name="phone"
                      className={inputClass}
                      placeholder={t("form.phone")}
                      dir="ltr"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.service")} <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service" required
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>{t("form.servicePlaceholder")}</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{t(`form.serviceOptions.${opt}`)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t("form.message")} <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message" required rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder={t("form.message")}
                  />
                </div>

                {error && (
                  <div role="alert" className="mb-5 flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitted || isSubmitting}
                  className="btn btn-primary w-full sm:w-auto px-10 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  aria-live="polite"
                >
                  {isSubmitted ? (
                    <><CheckCircle className="w-5 h-5" aria-hidden="true" /> {t("form.sent")}</>
                  ) : isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> {t("form.sending")}</>
                  ) : (
                    <><Send className="w-5 h-5" aria-hidden="true" /> {t("form.send")}</>
                  )}
                </button>

                <p className="text-xs text-gray-400 mt-4">
                  {isAr
                    ? "بإرسال هذه الرسالة، أنت توافق على سياسة الخصوصية الخاصة بنا."
                    : "By submitting, you agree to our Privacy Policy."}
                  {" "}
                  <Link href={`/${locale}/privacy`} className="text-accent hover:underline">
                    {isAr ? "اقرأ المزيد" : "Read more"}
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Google Maps ─────────────────────────────────────────── */}
      <section className="pb-20 bg-background dark:bg-background-dark" aria-label={isAr ? "الموقع الجغرافي" : "Location map"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: .6 }}
            className="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl"
            style={{ height: 420 }}
          >
            <iframe
              src="https://www.google.com/maps?q=Abu+Dhabi,+United+Arab+Emirates&output=embed"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isAr ? "موقعنا على الخريطة" : "Our location on the map"}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
