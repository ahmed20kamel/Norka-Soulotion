import { type Metadata } from "next";
import ServicesContent from "./ServicesContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isAr = locale === "ar";
  const title = isAr
    ? "خدماتنا | نوركا سوليوشن"
    : "Our Services | Norka Solution";
  const description = isAr
    ? "نقدم خدمات متكاملة: تطوير البرمجيات، تطبيقات الجوال، أنظمة ERP، البنية التحتية، تصميم UI/UX، التسويق الرقمي وإعداد الشركات في الإمارات."
    : "We offer end-to-end services: custom software, mobile apps, ERP systems, IT infrastructure, UI/UX design, digital marketing, and business consulting across the UAE.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: "/en/services",
        ar: "/ar/services",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/services`,
      images: [{ url: "/images/og-services.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}
