import { type Metadata } from "next";
import AboutContent from "./AboutContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "من نحن | نوركا سوليوشن"
    : "About Us | Norka Solution";
  const description = isAr
    ? "تعرف على نوركا سوليوشن — شركة تقنية متخصصة في تطوير البرمجيات، تطبيقات الموبايل، وحلول الذكاء الاصطناعي في الإمارات منذ 2020."
    : "Learn about Norka Solution — a UAE-based technology company specializing in software development, mobile apps, and AI solutions since 2020.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        ar: "/ar/about",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/about`,
      images: [{ url: "/images/og-about.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
