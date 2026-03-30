import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Norka Solution | AI-Powered Software & App Development in UAE",
    template: "%s | Norka Solution",
  },
  description:
    "NORKA SOLUTION — Leading software development company in UAE specializing in AI-integrated applications, custom web & mobile apps, ERP systems, and digital transformation across Abu Dhabi, Al Ain & Dubai.",
  keywords: [
    "software development company UAE",
    "AI application development UAE",
    "custom app development Abu Dhabi",
    "mobile app development UAE",
    "web application development Dubai",
    "AI integration UAE",
    "artificial intelligence software UAE",
    "ERP systems UAE",
    "digital transformation UAE",
    "Norka Solution",
    "programming company UAE",
    "React Next.js development UAE",
    "full-stack development Abu Dhabi",
    "smart software solutions UAE",
    "tech startup UAE",
    "IT consulting Abu Dhabi",
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
    title: "Norka Solution — AI-Powered Software Development in UAE",
    description:
      "Leading software development company in UAE. We build AI-integrated apps, custom web & mobile applications, ERP systems, and enterprise software. Based in Abu Dhabi, Al Ain & Dubai.",
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
    title: "Norka Solution — AI-Powered Software Development in UAE",
    description:
      "Leading software & AI development company in UAE. Custom apps, mobile apps, ERP systems, AI integration & more.",
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
