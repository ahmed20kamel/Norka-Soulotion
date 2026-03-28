"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { images } from "@/lib/images.config";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const servicesT = useTranslations("services");
  const contactT = useTranslations("contact");

  const quickLinks = [
    { href: `/${locale}`, label: navT("home") },
    { href: `/${locale}/services`, label: navT("services") },
    { href: `/${locale}/portfolio`, label: navT("portfolio") },
    { href: `/${locale}/about`, label: navT("about") },
    { href: `/${locale}/contact`, label: navT("contact") },
  ];

  const serviceLinks = [
    servicesT("software.title"),
    servicesT("mobile.title"),
    servicesT("web.title"),
    servicesT("erp.title"),
    servicesT("infrastructure.title"),
    servicesT("uiux.title"),
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-1">
                <Image
                  src={images.brand.logo.src}
                  alt={images.brand.logo.alt}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Norka</span>
                <span className="text-lg font-bold gradient-text">
                  {" "}Solution
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t("description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-lg bg-gray-800 hover:bg-accent hover:text-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors text-sm group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              {t("ourServices")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href={`/${locale}/services`}
                    className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors text-sm group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              {t("contactUs")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  {contactT("info.addressValue")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a
                  href={`tel:${contactT("info.phoneValue")}`}
                  className="text-sm text-gray-400 hover:text-accent transition-colors"
                  dir="ltr"
                >
                  {contactT("info.phoneValue")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a
                  href={`mailto:${contactT("info.emailValue")}`}
                  className="text-sm text-gray-400 hover:text-accent transition-colors"
                >
                  {contactT("info.emailValue")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Norka Solution. {t("rights")}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {t("privacy")}
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {t("terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
