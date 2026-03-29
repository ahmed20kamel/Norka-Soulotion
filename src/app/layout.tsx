import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Norka Solution | Complete IT Services in UAE",
    template: "%s | Norka Solution",
  },
  description:
    "NORKA SOLUTION delivers cutting-edge technology services — Web Applications, Mobile Apps, ERP Systems, IT Infrastructure, UI/UX Design, and Digital Marketing across Abu Dhabi, Al Ain & Dubai, UAE.",
  keywords: [
    "IT services UAE",
    "web development Abu Dhabi",
    "mobile app development UAE",
    "ERP systems Dubai",
    "IT infrastructure Al Ain",
    "UI/UX design UAE",
    "digital marketing Abu Dhabi",
    "Norka Solution",
    "software development Dubai",
    "IT consulting UAE",
    "company setup UAE",
    "web applications Abu Dhabi",
    "React Next.js development",
    "technology partner UAE",
  ],
  authors: [{ name: "Norka Solution", url: "https://norkasolution.com" }],
  creator: "Norka Solution",
  publisher: "Norka Solution",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/favicon.ico", sizes: "48x48" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_AE",
    url: "https://norkasolution.com",
    siteName: "Norka Solution",
    title: "Norka Solution — We Build Digital Products That Matter",
    description:
      "Leading IT solutions provider in UAE. Custom web apps, mobile apps, ERP systems, IT infrastructure, UI/UX design, and digital marketing. Based in Abu Dhabi, Al Ain & Dubai.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Norka Solution - Complete IT Services in UAE",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norka Solution — We Build Digital Products That Matter",
    description:
      "Leading IT solutions provider in UAE. Web apps, mobile apps, ERP systems, IT infrastructure & more.",
    images: ["/og-image.png"],
    creator: "@norkasolution",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://norkasolution.com",
    languages: {
      "en": "https://norkasolution.com/en",
      "ar": "https://norkasolution.com/ar",
    },
  },
  category: "technology",
  metadataBase: new URL("https://norkasolution.com"),
};

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
    "Leading IT solutions provider in UAE delivering web applications, mobile apps, ERP systems, IT infrastructure, UI/UX design, and digital marketing services.",
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
    "Web Development",
    "Mobile App Development",
    "ERP Systems",
    "IT Infrastructure",
    "UI/UX Design",
    "Digital Marketing",
    "IT Consulting",
  ],
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
  },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
