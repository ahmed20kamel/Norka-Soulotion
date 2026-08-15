import { type Metadata } from "next";
import PortfolioContent from "./PortfolioContent";
import { getProjects } from "@/sanity/lib/fetch-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isAr = locale === "ar";
  const title = isAr
    ? "أعمالنا | نوركا سوليوشن"
    : "Our Portfolio | Norka Solution";
  const description = isAr
    ? "استعرض مشاريعنا المنجزة في تطوير تطبيقات الويب، الموبايل، وأنظمة ERP لعملاء من الإمارات وخارجها."
    : "Explore our completed projects in web app development, mobile apps, and ERP systems for clients across the UAE and beyond.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: {
        en: "/en/portfolio",
        ar: "/ar/portfolio",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/portfolio`,
      images: [{ url: "/images/og-portfolio.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  return <PortfolioContent projects={projects} />;
}
