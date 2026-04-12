"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsContent() {
  const navT = useTranslations("nav");
  const footerT = useTranslations("footer");
  const params = useParams();
  const locale = params.locale as string;
  const isAr = locale === "ar";

  const sections = isAr
    ? [
        {
          title: "قبول الشروط",
          content:
            "باستخدام موقع نوركا سوليوشن أو خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام موقعنا.",
        },
        {
          title: "الخدمات المقدمة",
          content:
            "تقدم نوركا سوليوشن خدمات تطوير البرمجيات وتطبيقات الويب والهاتف المحمول وأنظمة ERP والبنية التحتية لتكنولوجيا المعلومات والتصميم وخدمات التسويق الرقمي. تخضع جميع الخدمات لاتفاقية خدمة منفصلة.",
        },
        {
          title: "حقوق الملكية الفكرية",
          content:
            "جميع المحتويات على هذا الموقع، بما في ذلك النصوص والصور والشعارات والتصاميم، هي ملك لنوركا سوليوشن ومحمية بموجب قوانين حقوق الملكية الفكرية. لا يجوز نسخ أي محتوى أو توزيعه أو تعديله دون إذن كتابي مسبق.",
        },
        {
          title: "حدود المسؤولية",
          content:
            "لا تتحمل نوركا سوليوشن المسؤولية عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة ناجمة عن استخدام أو عدم القدرة على استخدام خدماتنا أو موقعنا الإلكتروني.",
        },
        {
          title: "القانون المطبق",
          content:
            "تخضع هذه الشروط وتُفسَّر وفقاً لقوانين دولة الإمارات العربية المتحدة. أي نزاعات تنشأ بموجب هذه الشروط تخضع للاختصاص القضائي الحصري لمحاكم أبوظبي، الإمارات.",
        },
        {
          title: "التواصل معنا",
          content:
            "لأي استفسارات تتعلق بهذه الشروط، يرجى التواصل معنا: info@norkasolution.com | +971 50 725 7157",
        },
      ]
    : [
        {
          title: "Acceptance of Terms",
          content:
            "By using Norka Solution's website or services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.",
        },
        {
          title: "Services Provided",
          content:
            "Norka Solution provides software development, web and mobile application, ERP systems, IT infrastructure, design, and digital marketing services. All services are subject to a separate service agreement.",
        },
        {
          title: "Intellectual Property",
          content:
            "All content on this website, including text, images, logos, and designs, is the property of Norka Solution and is protected by intellectual property laws. No content may be copied, distributed, or modified without prior written permission.",
        },
        {
          title: "Limitation of Liability",
          content:
            "Norka Solution shall not be liable for any direct, indirect, incidental, or special damages arising from the use or inability to use our services or website.",
        },
        {
          title: "Governing Law",
          content:
            "These Terms are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising under these Terms are subject to the exclusive jurisdiction of the courts of Abu Dhabi, UAE.",
        },
        {
          title: "Contact Us",
          content:
            "For any questions about these Terms, please contact us: info@norkasolution.com | +971 50 725 7157",
        },
      ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,98,252,.08),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/50 text-sm mb-6 font-medium"
          >
            <Link href={`/${locale}`} className="hover:text-white/70 transition-colors">
              {navT("home")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-accent">{footerT("terms")}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-black text-white mb-4"
          >
            {footerT("terms")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm"
          >
            {isAr ? "آخر تحديث: أبريل 2026" : "Last updated: April 2026"}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background dark:bg-background-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
              {isAr
                ? "يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدمات نوركا سوليوشن."
                : "Please read these Terms of Service carefully before using Norka Solution's services."}
            </p>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="p-8 rounded-2xl bg-surface dark:bg-surface-dark border border-gray-200 dark:border-gray-800"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {i + 1}. {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
