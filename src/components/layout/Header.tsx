"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images.config";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const otherLocale = locale === "en" ? "ar" : "en";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/portfolio`, label: t("portfolio") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const textColor = isScrolled
    ? "text-gray-800 dark:text-gray-200"
    : "text-white";

  const navLinkBase = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg shadow-black/8"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white p-1.5 shadow-md group-hover:shadow-lg transition-shadow shrink-0">
                <Image
                  src={images.brand.logo.src}
                  alt={images.brand.logo.alt}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="hidden sm:block leading-none">
                <span
                  className={cn(
                    "text-xl font-black transition-colors duration-500",
                    isScrolled ? "text-gray-900 dark:text-white" : "text-white"
                  )}
                >
                  Norka
                </span>
                <span className="text-xl font-black gradient-text"> Solution</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== `/${locale}` && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      navLinkBase,
                      isActive
                        ? isScrolled
                          ? "text-accent bg-accent/10"
                          : "text-white bg-white/15 font-semibold"
                        : isScrolled
                          ? "text-gray-700 dark:text-gray-300 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-800"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer",
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline font-semibold">
                    {locale === "en" ? "EN" : "عربي"}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {isLangOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden min-w-[130px] z-50">
                    <Link
                      href={switchLocalePath}
                      onClick={() => setIsLangOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {locale === "en" ? "العربية" : "English"}
                    </Link>
                  </div>
                )}
              </div>

              <ThemeToggle />

              {/* CTA */}
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  "hidden lg:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                  isScrolled
                    ? "text-dark bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
                    : "text-gray-900 bg-white hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5"
                )}
              >
                {t("getStarted")}
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors cursor-pointer",
                  isScrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "hover:bg-white/10"
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className={cn("w-6 h-6", textColor)} />
                ) : (
                  <Menu className={cn("w-6 h-6", textColor)} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute top-20 left-4 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-400",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== `/${locale}` && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                    isActive
                      ? "text-accent bg-accent/10 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 px-1">
              <Link
                href={`/${locale}/contact`}
                className="block px-5 py-3 rounded-xl text-center text-sm font-bold text-dark bg-accent hover:bg-accent-dark"
              >
                {t("getStarted")}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
