import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Norka Solution | Complete IT Services in UAE",
    template: "%s | Norka Solution",
  },
  description:
    "A leading provider of comprehensive IT services in the UAE — Web Applications, Mobile Apps, ERP Systems, IT Infrastructure, UI/UX Design, and Digital Marketing across Abu Dhabi, Al Ain & Dubai.",
  keywords: [
    "IT services UAE",
    "web development Abu Dhabi",
    "mobile app development",
    "ERP systems",
    "IT infrastructure",
    "UI/UX design",
    "digital marketing UAE",
    "Norka Solution",
    "software development Dubai",
    "IT consulting Al Ain",
  ],
  authors: [{ name: "Norka Solution" }],
  creator: "Norka Solution",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://norkasolution.com",
    siteName: "Norka Solution",
    title: "Norka Solution | Complete IT Services in UAE",
    description:
      "We build digital products that matter. Web apps, mobile apps, ERP systems, IT infrastructure, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Norka Solution - Complete IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norka Solution | Complete IT Services in UAE",
    description:
      "We build digital products that matter. Web apps, mobile apps, ERP systems, IT infrastructure, and more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://norkasolution.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
