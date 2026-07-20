"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, Globe, ChevronDown, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
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
  const [prevY,     setPrevY]     = useState(0);
  const [visible,   setVisible]   = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);

  const otherLocale    = locale === "en" ? "ar" : "en";
  const switchPath     = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const isAr           = locale === "ar";

  /* Close menu on route change (adjusted during render, not in an effect) */
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

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
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer outline-none",
                    scrolled
                      ? "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                  aria-label={isAr ? "تغيير اللغة" : "Change language"}
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{locale === "en" ? "EN" : "عر"}</span>
                  <ChevronDown className="w-3 h-3" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[140px]">
                  <DropdownMenuItem
                    render={<Link href={switchPath} className="gap-2.5 cursor-pointer" />}
                  >
                    <Globe className="w-4 h-4 text-accent" aria-hidden="true" />
                    {locale === "en" ? "العربية" : "English"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />

              {/* Desktop CTA */}
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  "hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                  scrolled
                    ? "bg-accent text-dark hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-px"
                    : "bg-white text-gray-900 hover:bg-gray-50 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-px"
                )}
                aria-label={t("getStarted")}
              >
                {t("getStarted")}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>

              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(true)}
                aria-label={isAr ? "فتح القائمة" : "Open menu"}
                className={cn(
                  "lg:hidden",
                  scrolled
                    ? "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-white hover:bg-white/10"
                )}
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────────── */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-3/4 sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>{isAr ? "القائمة" : "Menu"}</SheetTitle>
          </SheetHeader>
          <nav className="px-4 flex-1" aria-label={isAr ? "قائمة الموبايل" : "Mobile navigation"}>
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
          </nav>
          <SheetFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <Link
              href={`/${locale}/contact`}
              className={buttonVariants({ className: "w-full justify-center py-3.5" })}
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
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
