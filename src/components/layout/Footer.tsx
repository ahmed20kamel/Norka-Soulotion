"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, ArrowUpRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { images } from "@/lib/images.config";
import { TikTokIcon } from "@/components/icons/SocialIcons";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t        = useTranslations("footer");
  const navT     = useTranslations("nav");
  const servicesT = useTranslations("services");
  const contactT  = useTranslations("contact");
  const isAr      = locale === "ar";

  const quickLinks = [
    { href: `/${locale}`,           label: navT("home") },
    { href: `/${locale}/services`,  label: navT("services") },
    { href: `/${locale}/portfolio`, label: navT("portfolio") },
    { href: `/${locale}/about`,     label: navT("about") },
    { href: `/${locale}/contact`,   label: navT("contact") },
  ];

  const serviceLinks = [
    servicesT("software.title"),
    servicesT("mobile.title"),
    servicesT("web.title"),
    servicesT("erp.title"),
    servicesT("infrastructure.title"),
    servicesT("uiux.title"),
    servicesT("marketing.title"),
    servicesT("consulting.title"),
  ];

  const socialLinks = [
    { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61592851251188", Icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/norka_soulotion/",              Icon: Instagram },
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/norka-solution-6a2140413/",   Icon: Linkedin },
    { label: "YouTube",   href: "https://www.youtube.com/@NorkaSolution",                  Icon: Youtube },
    { label: "TikTok",    href: "https://www.tiktok.com/@norkapinkw3",                     Icon: TikTokIcon },
  ];

  const contactItems = [
    { Icon: MapPin, value: contactT("info.addressValue"), dir: undefined },
    { Icon: Phone,  value: contactT("info.phoneValue"), href: `tel:${contactT("info.phoneValue")}`, dir: "ltr" as const },
    { Icon: Mail,   value: contactT("info.emailValue"), href: `mailto:${contactT("info.emailValue")}`, dir: undefined },
  ];

  return (
    <footer className="bg-surface dark:bg-gray-950 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-transparent" role="contentinfo">
      {/* ── Top divider accent ─────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden="true" />

      {/* ── Main body ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Brand column ──────────────────────────────────── */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 mb-5 group"
            >
              {/* Alt left empty — decorative alongside the adjacent visible
                  wordmark, so the link's accessible name comes from that
                  text alone instead of an aria-label that can drift out of
                  sync with it. */}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-1 shrink-0 ring-1 ring-gray-200 dark:ring-transparent">
                <Image
                  src={images.brand.logo.src}
                  alt=""
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-lg font-black text-gray-900 dark:text-white">Norka</span>
                <span className="text-lg font-black gradient-text"> Solution</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-7 text-gray-600 dark:text-gray-400">{t("description")}</p>

            {/* Social icons */}
            <div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold uppercase tracking-widest mb-3">
                {contactT("social")}
              </p>
              <div className="flex items-center gap-2" role="list" aria-label={isAr ? "مواقع التواصل الاجتماعي" : "Social media"}>
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-0 hover:bg-accent text-gray-500 dark:text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Quick links ──────────────────────────────────── */}
          <nav aria-label={isAr ? "روابط سريعة" : "Quick links"}>
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-widest mb-6">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-sm group"
                  >
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Services ─────────────────────────────────────── */}
          <nav aria-label={isAr ? "خدماتنا" : "Our services"}>
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-widest mb-6">
              {t("ourServices")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href={`/${locale}/services`}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200 text-sm group"
                  >
                    <ArrowUpRight
                      className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden="true"
                    />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Contact ──────────────────────────────────────── */}
          <address className="not-italic">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-widest mb-6">
              {t("contactUs")}
            </h3>
            <ul className="space-y-4">
              {contactItems.map(({ Icon, value, href, dir }) => {
                const Tag = href ? "a" : "div";
                return (
                  <li key={value}>
                    <Tag
                      {...(href ? { href, dir } : {})}
                      className="flex items-start gap-3 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors text-sm group cursor-default"
                    >
                      <Icon className="w-4 h-4 text-accent mt-0.5 shrink-0" aria-hidden="true" />
                      <span dir={dir}>{value}</span>
                    </Tag>
                  </li>
                );
              })}
            </ul>

            {/* CTA card */}
            <Link
              href={`/${locale}/contact`}
              className="mt-6 flex items-center gap-3 p-4 rounded-2xl border border-accent/20 bg-white dark:bg-transparent hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                <Mail className="w-4 h-4 text-accent group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <div>
                <div className="text-gray-900 dark:text-white text-sm font-semibold">
                  {isAr ? "ابدأ مشروعك" : "Start your project"}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">
                  {isAr ? "رد خلال 24 ساعة" : "Reply within 24 hours"}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-accent ml-auto transition-colors duration-200" aria-hidden="true" />
            </Link>
          </address>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <Separator className="bg-gray-200 dark:bg-gray-800/60" />
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Norka Solution.{" "}
              <span>{t("rights")}</span>
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <Link href={`/${locale}/privacy`} className="px-3 py-1.5 rounded-lg hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[.06] transition-all duration-200">
                {t("privacy")}
              </Link>
              <span aria-hidden="true">·</span>
              <Link href={`/${locale}/terms`} className="px-3 py-1.5 rounded-lg hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[.06] transition-all duration-200">
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
