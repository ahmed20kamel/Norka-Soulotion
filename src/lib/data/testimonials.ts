export interface Testimonial {
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  company: { en: string; ar: string };
  text: { en: string; ar: string };
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: { en: "John Smith", ar: "جون سميث" },
    role: { en: "CEO", ar: "الرئيس التنفيذي" },
    company: { en: "TechInnovate", ar: "تك إنوفيت" },
    text: {
      en: "Working with Norka Solution was a game-changer for our business. Their team developed a custom software solution that streamlined our operations and increased our productivity by 40%.",
      ar: "العمل مع نوركا سوليوشن كان نقطة تحول لأعمالنا. فريقهم طوّر حلاً برمجياً مخصصاً بسّط عملياتنا وزاد إنتاجيتنا بنسبة 40%.",
    },
    image: "/images/testimonials/john.jpg",
    rating: 5,
  },
  {
    name: { en: "Sarah Johnson", ar: "سارة جونسون" },
    role: { en: "CTO", ar: "المدير التقني" },
    company: { en: "DataFlow Corp", ar: "داتا فلو كورب" },
    text: {
      en: "The network infrastructure they built for us is rock-solid. Zero downtime in 6 months and our inter-branch communication has never been better.",
      ar: "البنية التحتية الشبكية التي بنوها لنا صلبة كالصخر. صفر انقطاع في 6 أشهر والاتصال بين فروعنا لم يكن أفضل من ذلك.",
    },
    image: "/images/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    name: { en: "Ahmed Hassan", ar: "أحمد حسن" },
    role: { en: "Operations Director", ar: "مدير العمليات" },
    company: { en: "Gulf Industries", ar: "صناعات الخليج" },
    text: {
      en: "Their ERP system transformed how we manage our business. From inventory to HR, everything is now in one place. Highly recommended!",
      ar: "نظام ERP الخاص بهم حوّل طريقة إدارتنا لأعمالنا. من المخزون إلى الموارد البشرية، كل شيء الآن في مكان واحد. أنصح بهم بشدة!",
    },
    image: "/images/testimonials/ahmed.jpg",
    rating: 5,
  },
  {
    name: { en: "Maria Chen", ar: "ماريا تشين" },
    role: { en: "Security Manager", ar: "مدير الأمن" },
    company: { en: "SecureVault", ar: "سيكيور فولت" },
    text: {
      en: "The AI-powered surveillance system Norka built for us is incredible. It detected threats we would have never caught with traditional CCTV.",
      ar: "نظام المراقبة الذكي الذي بنته نوركا لنا مذهل. اكتشف تهديدات لم نكن لنلاحظها أبداً مع كاميرات المراقبة التقليدية.",
    },
    image: "/images/testimonials/maria.jpg",
    rating: 5,
  },
];
