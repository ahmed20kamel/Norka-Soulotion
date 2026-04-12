import { type Metadata } from "next";
import TermsContent from "./TermsContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr ? "الشروط والأحكام" : "Terms of Service";
  const description = isAr
    ? "الشروط والأحكام الخاصة باستخدام خدمات نوركا سوليوشن."
    : "Terms of Service governing the use of Norka Solution's services and website.";

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/terms`,
      languages: { en: "/en/terms", ar: "/ar/terms" },
    },
  };
}

export default function TermsPage({ params }: Props) {
  return <TermsContent />;
}
