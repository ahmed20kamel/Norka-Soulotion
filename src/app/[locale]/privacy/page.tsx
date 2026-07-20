import { type Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr ? "سياسة الخصوصية" : "Privacy Policy";
  const description = isAr
    ? "سياسة الخصوصية الخاصة بنوركا سوليوشن — كيف نجمع معلوماتك ونحميها ونستخدمها."
    : "Norka Solution's Privacy Policy — how we collect, protect, and use your information.";

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { en: "/en/privacy", ar: "/ar/privacy" },
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
