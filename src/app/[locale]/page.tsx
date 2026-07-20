import { type Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import ServicesPreview from "@/components/home/ServicesPreview";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechStack from "@/components/home/TechStack";
import CEOQuote from "@/components/home/CEOQuote";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  if (isAr) {
    return {
      title: "نوركا سوليوشن | تطوير البرمجيات والذكاء الاصطناعي في الإمارات",
      description:
        "نوركا سوليوشن — شركة تقنية رائدة في الإمارات متخصصة في تطوير تطبيقات الذكاء الاصطناعي، البرمجيات المخصصة، تطبيقات الجوال، أنظمة ERP، والتحول الرقمي في أبوظبي والعين ودبي.",
      alternates: {
        canonical: "/ar",
        languages: { en: "/en", ar: "/ar" },
      },
    };
  }

  return {
    alternates: {
      canonical: "/en",
      languages: { en: "/en", ar: "/ar" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <StatsCounter />
      <ServicesPreview locale={locale} />
      <AboutPreview locale={locale} />
      <FeaturedProjects locale={locale} />
      <TechStack />
      <CEOQuote locale={locale} />
      <Testimonials locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
