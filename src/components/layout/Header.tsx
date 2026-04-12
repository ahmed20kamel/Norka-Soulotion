"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images.config";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t           = useTranslations("nav");
  const pathname    = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [langOpen,  setLangOpen]  = useState(false);
  const [prevY,     setPrevY]     = useState(0);
  const [visible,   setVisible]   = useState(true);

  const otherLocale    = locale === "en" ? "ar" : "en";
  const switchPath     = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const isAr           = locale === "ar";

  /* ── Scroll behavior: hide on scroll-down, show on scroll-up ── */
  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 24);
    if (y > prevY && y > 80) setVisible(false);
    else setVisible(true);
    setPrevY(y);
  }, [prevY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { href: `/${locale}`,           label: t("home") },
    { href: `/${locale}/services`,  label: t("services") },
    { href: `/${locale}/portfolio`, label: t("portfolio") },
    { href: `/${locale}/about`,     label: t("about") },
    { href: `/${locale}/contact`,   label: t("contact") },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== `/${locale}` && pathname.startsWith(href));

  return (
    <>
      {/* ── Skip link ─────────────────────────────────────────── */}
      <a href="#main-content" className="skip-link">
        {isAr ? "انتقل للمحتوى الرئيسي" : "Skip to main content"}
      </a>

      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          visible ? "translate-y-0" : "-translate-y-full",
          scrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,.06)] dark:shadow-[0_1px_0_rgba(255,255,255,.04)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo ────────────────────────────────────────── */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-label="Norka Solution — Home"
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white p-1.5 shadow-sm group-hover:shadow-md transition-shadow shrink-0">
                <Image
                  src={images.brand.logo.src}
                  alt="Norka Solution Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span
                  className={cn(
                    "text-[1.1rem] font-black tracking-tight transition-colors duration-500",
                    scrolled ? "text-gray-900 dark:text-white" : "text-white"
                  )}
                >
                  Norka
                  <span className="gradient-text"> Solution</span>
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium tracking-[.12em] uppercase transition-colors duration-500 mt-0.5",
                    scrolled ? "text-gray-400 dark:text-gray-500" : "text-white/40"
                  )}
                >
                  {isAr ? "حلول رقمية" : "Digital Excellence"}
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ──────────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label={isAr ? "القائمة الرئيسية" : "Main navigation"}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    "after:absolute after:bottom-0.5 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform after:duration-300",
                    isActive(item.href)
                      ? scrolled
                        ? "text-accent after:scale-x-100"
                        : "text-white after:scale-x-100"
                      : cn(
                          "after:scale-x-0 hover:after:scale-x-100",
                          scrolled
                            ? "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            : "text-white/80 hover:text-white"
                        )
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ────────────────────────────────── */}
            <div className="flex items-center gap-2">

              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  aria-label={isAr ? "تغيير اللغة" : "Change language"}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer",
                    scrolled
                      ? "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{locale === "en" ? "EN" : "عر"}</span>
                  <ChevronDown
                    className={cn("w-3 h-3 transition-transform duration-200", langOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>

                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} aria-hidden="true" />
                    <div
                      role="listbox"
                      aria-label={isAr ? "اختيار اللغة" : "Language selection"}
                      className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden min-w-[140px] z-50"
                    >
                      <Link
                        href={switchPath}
                        role="option"
                        aria-selected={false}
                        onClick={() => setLangOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-surface dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-base">{locale === "en" ? "🇦🇪" : "🇬🇧"}</span>
                        {locale === "en" ? "العربية" : "English"}
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <ThemeToggle />

              {/* Desktop CTA */}
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  "hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                  scrolled
                    ? "bg-accent text-dark hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-px"
                    : "bg-white text-gray-900 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-px"
                )}
                aria-label={t("getStarted")}
              >
                {t("getStarted")}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen
                  ? (isAr ? "إغلاق القائمة" : "Close menu")
                  : (isAr ? "فتح القائمة" : "Open menu")}
                className={cn(
                  "lg:hidden p-2 rounded-xl transition-colors cursor-pointer",
                  scrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "hover:bg-white/10"
                )}
              >
                {menuOpen
                  ? <X className={cn("w-6 h-6", scrolled ? "text-gray-800 dark:text-gray-200" : "text-white")} aria-hidden="true" />
                  : <Menu className={cn("w-6 h-6", scrolled ? "text-gray-800 dark:text-gray-200" : "text-white")} aria-hidden="true" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-400",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? "قائمة التنقل" : "Navigation menu"}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={cn(
            "absolute top-[72px] left-3 right-3 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-350",
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <nav className="p-4" aria-label={isAr ? "قائمة الموبايل" : "Mobile navigation"}>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "text-accent bg-accent/10 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-surface dark:hover:bg-gray-800"
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3 px-1">
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary w-full justify-center py-3.5"
                aria-label={t("getStarted")}
              >
                {t("getStarted")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={switchPath}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-surface dark:hover:bg-gray-800 transition-colors"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                {locale === "en" ? "العربية" : "English"}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
