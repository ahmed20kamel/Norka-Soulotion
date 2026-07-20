import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Inter, Syne, Cairo } from "next/font/google";
import { routing } from "@/i18n/routing";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ChatWidget";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Organization structured data for Google Knowledge Panel
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Norka Solution",
  alternateName: "NORKA SOLUTION",
  url: "https://norkasolution.com",
  logo: "https://norkasolution.com/logo.svg",
  image: "https://norkasolution.com/og-image.png",
  description:
    "Leading software development company in UAE specializing in AI-powered applications, custom web & mobile apps, ERP systems, and digital transformation solutions.",
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: "Ahmed Kamel",
    jobTitle: "CEO & Founder",
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Al Ain",
      addressCountry: "AE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971-50-725-7157",
    contactType: "customer service",
    email: "info@norkasolution.com",
    availableLanguage: ["English", "Arabic"],
    areaServed: "AE",
  },
  sameAs: [
    "https://www.facebook.com/norkasolution",
    "https://www.instagram.com/norkasolution",
    "https://www.linkedin.com/company/norkasolution",
    "https://twitter.com/norkasolution",
  ],
  knowsAbout: [
    "AI Application Development",
    "Artificial Intelligence Integration",
    "Custom Software Development",
    "Web Application Development",
    "Mobile App Development",
    "ERP Systems",
    "Machine Learning Solutions",
    "Digital Transformation",
    "UI/UX Design",
    "IT Consulting",
  ],
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  priceRange: "$$",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${syne.variable} ${cairo.variable} antialiased bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <TooltipProvider delay={200}>
              <Header locale={locale} />
              <main id="main-content" className="min-h-screen grain relative">{children}</main>
              <Footer locale={locale} />
              <ChatWidget />
              <WhatsAppButton />
              <ScrollToTop />
              <Toaster />
            </TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
