import { type Metadata } from "next";
import ContactContent from "./ContactContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isAr = locale === "ar";
  const title = isAr
    ? "تواصل معنا | نوركا سوليوشن"
    : "Contact Us | Norka Solution";
  const description = isAr
    ? "تواصل مع فريق نوركا سوليوشن اليوم. نحن هنا للإجابة على استفساراتك وتقديم حلول تقنية مخصصة لعملك في الإمارات."
    : "Get in touch with Norka Solution today. We're ready to answer your questions and deliver tailored tech solutions for your business in the UAE.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        ar: "/ar/contact",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/contact`,
      images: [{ url: "/images/og-contact.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
