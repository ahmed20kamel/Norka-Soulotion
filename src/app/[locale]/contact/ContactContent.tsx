"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock,
  Send, CheckCircle, AlertCircle, Loader2, ArrowRight,
} from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { images } from "@/lib/images.config";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ContactContent() {
  const t      = useTranslations("contact");
  const navT   = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const isAr   = locale === "ar";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]               = useState("");
  const [formKey, setFormKey]           = useState(0);
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
      name:     formData.get("name") as string,
      email:    formData.get("email") as string,
      phone:    formData.get("phone") as string,
      service:  formData.get("service") as string,
      message:  formData.get("message") as string,
      // Honeypot — left empty by humans, filled in by bots. Server rejects if non-empty.
      website: formData.get("website") as string,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed");
      }
      setIsSubmitted(true);
      formRef.current?.reset();
      setFormKey((k) => k + 1);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setError(isAr ? "حدث خطأ، يرجى المحاولة مرة أخرى" : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden" aria-label={isAr ? "ترويسة الصفحة" : "Page hero"}>
        <div className="absolute inset-0">
          <Image
            src={images.pageHeroes.contact.src}
            alt={images.pageHeroes.contact.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-950/70" />
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
                    <Tag {...(href ? { href } : {})} className={href ? "block group" : "block"}>
                      <Card
                        className={`flex-row items-start gap-4 p-5 rounded-2xl bg-surface dark:bg-surface-dark ring-gray-200 dark:ring-gray-800 transition-all duration-300 ${href ? "group-hover:ring-accent/40 group-hover:shadow-lg cursor-pointer" : ""}`}
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
                      </Card>
                    </Tag>
                  </motion.div>
                );
              })}

              {/* Quick CTA */}
              <motion.div variants={staggerItem}>
                <Card className="block p-6 rounded-2xl bg-gray-950 dark:bg-gray-900 ring-gray-800">
                  <p className="text-white font-semibold text-sm mb-4">
                    {isAr ? "هل تريد استشارة سريعة؟" : "Want a quick consultation?"}
                  </p>
                  <a
                    href="https://wa.me/971507257157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ className: "w-full justify-center text-sm py-3" })}
                    aria-label={isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                  >
                    {isAr ? "واتساب مباشر" : "WhatsApp us now"}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                  </a>
                  <p className="text-gray-600 text-xs text-center mt-3">
                    {isAr ? "رد فوري · بدون رسوم" : "Instant reply · No fees"}
                  </p>
                </Card>
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
                aria-label={isAr ? "نموذج الاتصال" : "Contact form"}
                noValidate
              >
              <Card className="block bg-surface dark:bg-surface-dark rounded-2xl p-8 md:p-10 ring-gray-200 dark:ring-gray-800 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  {isAr ? "أرسل لنا رسالة" : "Send us a message"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <Label htmlFor="contact-name" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.name")} <span className="text-red-500" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      type="text" name="name" required
                      className="h-auto px-4 py-3.5 rounded-2xl text-sm"
                      placeholder={t("form.name")}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.email")} <span className="text-red-500" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email" name="email" required
                      className="h-auto px-4 py-3.5 rounded-2xl text-sm"
                      placeholder={t("form.email")}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <Label htmlFor="contact-phone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.phone")}
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel" name="phone"
                      className="h-auto px-4 py-3.5 rounded-2xl text-sm"
                      placeholder={t("form.phone")}
                      dir="ltr"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-service" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t("form.service")} <span className="text-red-500" aria-hidden="true">*</span>
                    </Label>
                    <Select key={formKey} name="service" required items={serviceOptions.map((opt) => ({ value: opt, label: t(`form.serviceOptions.${opt}`) }))}>
                      <SelectTrigger id="contact-service" className="w-full h-auto px-4 py-3.5 rounded-2xl text-sm">
                        <SelectValue placeholder={t("form.servicePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{t(`form.serviceOptions.${opt}`)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="contact-message" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t("form.message")} <span className="text-red-500" aria-hidden="true">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message" required rows={5}
                    className="px-4 py-3.5 rounded-2xl text-sm resize-none"
                    placeholder={t("form.message")}
                  />
                </div>

                {/* Honeypot — hidden from real users, tabIndex -1 keeps it out of keyboard/AT flow */}
                <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {error && (
                  <div role="alert" className="mb-5 flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitted || isSubmitting}
                  className="w-full sm:w-auto h-auto px-10 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  aria-live="polite"
                >
                  {isSubmitted ? (
                    <><CheckCircle className="w-5 h-5" aria-hidden="true" /> {t("form.sent")}</>
                  ) : isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> {t("form.sending")}</>
                  ) : (
                    <><Send className="w-5 h-5" aria-hidden="true" /> {t("form.send")}</>
                  )}
                </Button>

                <p className="text-xs text-gray-400 mt-4">
                  {isAr
                    ? "بإرسال هذه الرسالة، أنت توافق على سياسة الخصوصية الخاصة بنا."
                    : "By submitting, you agree to our Privacy Policy."}
                  {" "}
                  <Link href={`/${locale}/privacy`} className="text-accent hover:underline">
                    {isAr ? "اقرأ المزيد" : "Read more"}
                  </Link>
                </p>
              </Card>
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
