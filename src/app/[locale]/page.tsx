import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechStack from "@/components/home/TechStack";
import CEOQuote from "@/components/home/CEOQuote";
import Testimonials from "@/components/home/Testimonials";
import Partners from "@/components/home/Partners";
import CTASection from "@/components/home/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <ServicesPreview locale={locale} />
      <AboutPreview locale={locale} />
      <FeaturedProjects locale={locale} />
      <TechStack />
      <CEOQuote locale={locale} />
      <Testimonials locale={locale} />
      <Partners />
      <CTASection locale={locale} />
    </>
  );
}
