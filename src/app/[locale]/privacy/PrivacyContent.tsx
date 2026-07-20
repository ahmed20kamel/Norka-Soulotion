"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function PrivacyContent() {
  const navT = useTranslations("nav");
  const footerT = useTranslations("footer");
  const params = useParams();
  const locale = params.locale as string;
  const isAr = locale === "ar";

  const sections = isAr
    ? [
        {
          title: "المعلومات التي نجمعها",
          content:
            "نجمع المعلومات التي تقدمها لنا مباشرة، مثل الاسم والبريد الإلكتروني ورقم الهاتف عند التواصل معنا عبر نماذج الاتصال. كما نجمع معلومات تقنية مثل عنوان IP ونوع المتصفح وصفحات الموقع التي تزورها.",
        },
        {
          title: "كيف نستخدم معلوماتك",
          content:
            "نستخدم المعلومات التي نجمعها للرد على استفساراتك وتقديم خدماتنا وتحسين تجربتك على الموقع. لن نبيع معلوماتك الشخصية لأي طرف ثالث.",
        },
        {
          title: "حماية البيانات",
          content:
            "نتخذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الكشف عنها أو التعديل عليها أو إتلافها. نستخدم تشفير SSL لجميع البيانات المنقولة.",
        },
        {
          title: "ملفات تعريف الارتباط (Cookies)",
          content:
            "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع. يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط، لكن ذلك قد يؤثر على بعض وظائف الموقع.",
        },
        {
          title: "التواصل معنا",
          content:
            "إذا كانت لديك أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر البريد الإلكتروني: info@norkasolution.com أو الاتصال بنا على: +971 50 725 7157",
        },
      ]
    : [
        {
          title: "Information We Collect",
          content:
            "We collect information you provide directly to us, such as your name, email address, and phone number when contacting us through our forms. We also collect technical information such as your IP address, browser type, and pages visited.",
        },
        {
          title: "How We Use Your Information",
          content:
            "We use the information we collect to respond to your inquiries, provide our services, and improve your experience on our website. We will not sell your personal information to any third party.",
        },
        {
          title: "Data Protection",
          content:
            "We take appropriate security measures to protect your personal information from unauthorized access, disclosure, modification, or destruction. We use SSL encryption for all transmitted data.",
        },
        {
          title: "Cookies",
          content:
            "We use cookies to improve your experience on our website. You can set your browser to refuse cookies, but this may affect some website functionality.",
        },
        {
          title: "Contact Us",
          content:
            "If you have questions about this Privacy Policy, please contact us at: info@norkasolution.com or call us at: +971 50 725 7157",
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
            <span className="text-accent">{footerT("privacy")}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-display font-black text-white mb-4"
          >
            {footerT("privacy")}
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
      <section className="section-py-sm bg-background dark:bg-background-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose dark:prose-invert max-w-none"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
              {isAr
                ? "في نوركا سوليوشن، نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمعنا لمعلوماتك واستخدامها وحمايتها."
                : "At Norka Solution, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information."}
            </p>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                <Card className="block p-8 rounded-2xl bg-surface dark:bg-surface-dark ring-gray-200 dark:ring-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {i + 1}. {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
