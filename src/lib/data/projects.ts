export interface Project {
  slug: string;
  category: "erp" | "web" | "mobile" | "software" | "infrastructure" | "security";
  image: string;          // Cover image  — replace with your actual screenshot
  screenshots: string[];  // Gallery images — replace with your actual screenshots
  techStack: string[];
  featured: boolean;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  fullDescription: { en: string; ar: string };
  challenge: { en: string; ar: string };
  solution: { en: string; ar: string };
  results: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  demoUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO REPLACE IMAGES:
//   1. Put your screenshots in:  public/images/projects/<slug>/
//   2. Replace the "image" and "screenshots" fields with:
//      "/images/projects/<slug>/cover.png"
//      "/images/projects/<slug>/screen-1.png"  etc.
// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [

  // ══════════════════════════════════════════
  //  ERP SYSTEMS
  // ══════════════════════════════════════════

  {
    slug: "enterprise-erp-system",
    category: "erp",
    featured: true,
    image: "/images/projects/enterprise-erp-system/cover.jpg",
    screenshots: [
      "/images/projects/enterprise-erp-system/cover.jpg",
      "/images/projects/enterprise-erp-system/screen-1.jpg",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "Redis"],
    title: {
      en: "Enterprise ERP System",
      ar: "نظام ERP للمؤسسات",
    },
    description: {
      en: "Full-scale ERP covering inventory, HR, finance and supply chain — boosted productivity by 40%.",
      ar: "نظام ERP متكامل يغطي المخزون والموارد البشرية والمالية وسلسلة التوريد — رفع الإنتاجية 40%.",
    },
    fullDescription: {
      en: "We developed a fully customized ERP system for a large enterprise covering inventory management, HR & payroll, financial management, and supply chain operations. The system replaced multiple legacy tools with a single unified platform, giving management real-time visibility across all departments.",
      ar: "طورنا نظام ERP مخصص بالكامل لمؤسسة كبيرة يغطي إدارة المخزون والموارد البشرية والرواتب والإدارة المالية وعمليات سلسلة التوريد. استبدل النظام أدوات قديمة متعددة بمنصة موحدة واحدة، مما أتاح لإدارة رؤية فورية عبر جميع الأقسام.",
    },
    challenge: {
      en: "The client operated 6 separate legacy tools with no shared data, causing manual re-entry errors and delayed monthly reports.",
      ar: "كان العميل يشغّل 6 أنظمة قديمة منفصلة بدون بيانات مشتركة، مما أدى إلى أخطاء الإدخال اليدوي وتأخر التقارير الشهرية.",
    },
    solution: {
      en: "One unified platform with automated workflows, real-time dashboards, and role-based access for every department.",
      ar: "منصة موحدة واحدة مع سير عمل آلي ولوحات معلومات فورية وصلاحيات مخصصة لكل قسم.",
    },
    results: {
      en: "40% productivity increase · 60% faster reporting · zero double-entry errors · ROI in 8 months.",
      ar: "زيادة الإنتاجية 40% · التقارير أسرع بـ 60% · صفر أخطاء إدخال مزدوج · عائد الاستثمار في 8 أشهر.",
    },
    features: {
      en: ["Real-time Dashboard", "Inventory & Warehouse", "HR & Payroll", "Financial Reports", "Role-based Access", "Mobile App"],
      ar: ["لوحة تحكم فورية", "المخزون والمستودعات", "الموارد البشرية والرواتب", "التقارير المالية", "صلاحيات حسب الدور", "تطبيق موبايل"],
    },

  },

  {
    slug: "school-erp-system",
    category: "erp",
    featured: false,
    image: "/images/projects/school-erp-system/cover.jpg",
    screenshots: [
      "/images/projects/school-erp-system/cover.jpg",
      "/images/projects/school-erp-system/screen-1.jpg",
      "/images/projects/school-erp-system/screen-2.jpg",
    ],
    techStack: ["Vue.js", "Laravel", "MySQL", "AWS", "Pusher"],
    title: {
      en: "School Management ERP",
      ar: "نظام ERP لإدارة المدارس",
    },
    description: {
      en: "Complete school management system covering admissions, academics, fees, and parent communication.",
      ar: "نظام إدارة مدرسية متكامل يشمل القبول والشؤون الأكاديمية والرسوم والتواصل مع أولياء الأمور.",
    },
    fullDescription: {
      en: "A comprehensive school management ERP built for K-12 institutions, covering student lifecycle from admission to graduation, academic performance tracking, fee collection, and a parent portal with real-time updates.",
      ar: "نظام ERP لإدارة المدارس مبني للمؤسسات التعليمية K-12، يغطي دورة حياة الطالب من القبول حتى التخرج، وتتبع الأداء الأكاديمي، وتحصيل الرسوم، وبوابة لأولياء الأمور مع تحديثات فورية.",
    },
    challenge: {
      en: "The school used paper-based records and WhatsApp for parent communication, creating chaos during exam periods.",
      ar: "كانت المدرسة تستخدم السجلات الورقية وواتساب للتواصل مع أولياء الأمور، مما خلق فوضى خلال فترات الامتحانات.",
    },
    solution: {
      en: "Unified digital platform for all school operations with an automated parent notification system and online payment gateway.",
      ar: "منصة رقمية موحدة لجميع عمليات المدرسة مع نظام إشعارات آلي لأولياء الأمور وبوابة دفع إلكترونية.",
    },
    results: {
      en: "100% paperless operations · 90% reduction in admin workload · 4.9/5 parent satisfaction score.",
      ar: "عمليات خالية من الورق بنسبة 100% · تقليل عبء الإدارة بنسبة 90% · رضا أولياء الأمور 4.9/5.",
    },
    features: {
      en: ["Student Portal", "Parent App", "Online Fees", "Grade Management", "Attendance Tracking", "Library System"],
      ar: ["بوابة الطلاب", "تطبيق أولياء الأمور", "الرسوم الإلكترونية", "إدارة الدرجات", "تتبع الحضور", "نظام المكتبة"],
    },

  },

  {
    slug: "restaurant-chain-erp",
    category: "erp",
    featured: false,
    image: "/images/projects/restaurant-chain-erp/cover.jpg",
    screenshots: [
      "/images/projects/restaurant-chain-erp/cover.jpg",
      "/images/projects/restaurant-chain-erp/screen-1.jpg",
      "/images/projects/restaurant-chain-erp/screen-2.jpg",
    ],
    techStack: ["React", "Express.js", "MongoDB", "Socket.io", "Stripe"],
    title: {
      en: "Restaurant Chain ERP",
      ar: "نظام ERP لسلسلة مطاعم",
    },
    description: {
      en: "Multi-branch restaurant management system with POS, kitchen display, inventory, and real-time analytics.",
      ar: "نظام إدارة مطاعم متعدد الفروع مع نقطة البيع وشاشة المطبخ والمخزون والتحليلات الفورية.",
    },
    fullDescription: {
      en: "End-to-end restaurant chain ERP covering POS terminals, kitchen display systems, inventory management, staff scheduling, supplier ordering, and a central analytics dashboard for all branches.",
      ar: "نظام ERP شامل لسلسلة المطاعم يغطي أجهزة نقاط البيع وأنظمة عرض المطبخ وإدارة المخزون وجدولة الموظفين وطلبات الموردين ولوحة تحليلات مركزية لجميع الفروع.",
    },
    challenge: {
      en: "Managing 12 branches with different suppliers and menus while preventing stock-outs and food waste.",
      ar: "إدارة 12 فرعاً مع موردين وقوائم طعام مختلفة مع منع نفاد المخزون وهدر الطعام.",
    },
    solution: {
      en: "Centralized ERP with automated stock alerts, recipe-based consumption tracking, and cross-branch reporting.",
      ar: "نظام ERP مركزي مع تنبيهات مخزون آلية وتتبع الاستهلاك القائم على الوصفات وتقارير عبر الفروع.",
    },
    results: {
      en: "35% reduction in food waste · 20% increase in table turnover · unified reporting across all branches.",
      ar: "تقليل هدر الطعام بنسبة 35% · زيادة دوران الطاولات بنسبة 20% · تقارير موحدة عبر جميع الفروع.",
    },
    features: {
      en: ["POS System", "Kitchen Display", "Stock Alerts", "Staff Scheduling", "Supplier Ordering", "Branch Analytics"],
      ar: ["نقطة البيع", "شاشة المطبخ", "تنبيهات المخزون", "جدولة الموظفين", "طلبات الموردين", "تحليلات الفروع"],
    },
  },

  {
    slug: "hr-payroll-erp",
    category: "erp",
    featured: false,
    image: "/images/projects/hr-payroll-erp/cover.jpg",
    screenshots: [
      "/images/projects/hr-payroll-erp/cover.jpg",
      "/images/projects/hr-payroll-erp/screen-1.jpg",
    ],
    techStack: ["Angular", ".NET Core", "SQL Server", "Azure", "Power BI"],
    title: {
      en: "HR & Payroll ERP",
      ar: "نظام ERP للموارد البشرية والرواتب",
    },
    description: {
      en: "Comprehensive HR system covering recruitment, onboarding, performance reviews, payroll, and compliance reporting.",
      ar: "نظام موارد بشرية شامل يغطي التوظيف والتأهيل وتقييم الأداء والرواتب وتقارير الامتثال.",
    },
    fullDescription: {
      en: "A full-cycle HR ERP covering the entire employee journey from recruitment and onboarding to offboarding, with automated payroll processing, leave management, and integrated compliance reporting for labor law adherence.",
      ar: "نظام ERP لدورة الموارد البشرية الكاملة يغطي رحلة الموظف بأكملها من التوظيف والتأهيل إلى إنهاء الخدمة، مع معالجة الرواتب الآلية وإدارة الإجازات وتقارير الامتثال المتكاملة.",
    },
    challenge: {
      en: "HR team spent 60% of their time on manual payroll calculations and compliance reports across 500+ employees.",
      ar: "كان فريق الموارد البشرية يقضي 60% من وقته في حسابات الرواتب اليدوية وتقارير الامتثال لأكثر من 500 موظف.",
    },
    solution: {
      en: "Automated payroll engine with rule-based calculations, self-service employee portal, and auto-generated compliance reports.",
      ar: "محرك رواتب آلي بحسابات قائمة على القواعد وبوابة خدمة ذاتية للموظفين وتقارير امتثال تُنتج تلقائياً.",
    },
    results: {
      en: "Zero payroll errors · 80% faster payroll cycle · self-service reduced HR tickets by 70%.",
      ar: "صفر أخطاء في الرواتب · دورة رواتب أسرع بنسبة 80% · تقليل طلبات الموارد البشرية بنسبة 70% بالخدمة الذاتية.",
    },
    features: {
      en: ["Recruitment Portal", "Automated Payroll", "Leave Management", "Performance Reviews", "Employee Self-Service", "Compliance Reports"],
      ar: ["بوابة التوظيف", "رواتب آلية", "إدارة الإجازات", "تقييم الأداء", "خدمة ذاتية للموظف", "تقارير الامتثال"],
    },
  },

  // ══════════════════════════════════════════
  //  WEBSITES & WEB APPS
  // ══════════════════════════════════════════

  {
    slug: "ecommerce-platform",
    category: "web",
    featured: true,
    image: "/images/projects/ecommerce-platform/cover.jpg",
    screenshots: [
      "/images/projects/ecommerce-platform/cover.jpg",
      "/images/projects/ecommerce-platform/screen-1.jpg",
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "Stripe", "Vercel"],
    title: {
      en: "E-Commerce Platform",
      ar: "منصة تجارة إلكترونية",
    },
    description: {
      en: "Multi-vendor e-commerce platform with advanced search, smart recommendations, and a powerful admin dashboard.",
      ar: "منصة تجارة إلكترونية متعددة البائعين مع بحث متقدم وتوصيات ذكية ولوحة إدارة قوية.",
    },
    fullDescription: {
      en: "A high-performance, scalable e-commerce platform built to handle thousands of concurrent users. Features include multi-vendor support, AI-powered product recommendations, advanced faceted search, real-time inventory sync, and a comprehensive analytics dashboard.",
      ar: "منصة تجارة إلكترونية عالية الأداء وقابلة للتوسع مبنية للتعامل مع آلاف المستخدمين المتزامنين. تشمل دعم متعدد البائعين وتوصيات المنتجات بالذكاء الاصطناعي والبحث المتقدم والمزامنة الفورية للمخزون ولوحة تحليلات شاملة.",
    },
    challenge: {
      en: "The client's old platform crashed during sales events and couldn't support more than 200 concurrent users.",
      ar: "كانت المنصة القديمة للعميل تتعطل خلال فعاليات البيع ولا تستطيع دعم أكثر من 200 مستخدم متزامن.",
    },
    solution: {
      en: "Next.js with ISR, edge CDN, database connection pooling, and Stripe for bulletproof payments.",
      ar: "Next.js مع ISR وشبكة CDN الحافة وتجميع اتصالات قاعدة البيانات وStripe للمدفوعات الموثوقة.",
    },
    results: {
      en: "10,000+ concurrent users supported · 300% faster load time · 25% higher conversion rate.",
      ar: "دعم 10,000+ مستخدم متزامن · وقت تحميل أسرع بـ 300% · معدل تحويل أعلى بـ 25%.",
    },
    features: {
      en: ["Multi-vendor", "AI Recommendations", "Faceted Search", "Real-time Inventory", "Admin Dashboard", "Analytics"],
      ar: ["متعدد البائعين", "توصيات ذكية", "بحث متقدم", "مخزون فوري", "لوحة إدارة", "تحليلات"],
    },

  },

  {
    slug: "corporate-website",
    category: "web",
    featured: false,
    image: "/images/projects/corporate-website/cover.jpg",
    screenshots: [
      "/images/projects/corporate-website/cover.jpg",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS", "Vercel"],
    title: {
      en: "Corporate Website & CMS",
      ar: "موقع الشركة ونظام إدارة المحتوى",
    },
    description: {
      en: "Premium corporate website with animated UI, multi-language support, and a headless CMS for easy content updates.",
      ar: "موقع شركة متميز مع واجهة متحركة ودعم متعدد اللغات ونظام إدارة محتوى بدون رأس لتحديثات سهلة.",
    },
    fullDescription: {
      en: "A premium corporate website built for a financial services firm, featuring cinematic scroll animations, multi-language support (Arabic/English), integrated Sanity CMS for non-technical content editors, and perfect Lighthouse scores.",
      ar: "موقع شركة متميز مبني لشركة خدمات مالية، يضم رسوم متحركة سينمائية عند التمرير ودعم متعدد اللغات (عربي/إنجليزي) ونظام Sanity CMS المدمج لمحرري المحتوى غير التقنيين ودرجات Lighthouse مثالية.",
    },
    challenge: {
      en: "The firm's old website took 8 seconds to load and the marketing team needed a non-technical way to update content.",
      ar: "كان الموقع القديم للشركة يستغرق 8 ثوانٍ للتحميل وكان فريق التسويق بحاجة لطريقة غير تقنية لتحديث المحتوى.",
    },
    solution: {
      en: "Static generation with on-demand ISR, headless CMS with visual editor, and progressive image loading.",
      ar: "التوليد الثابت مع ISR عند الطلب ونظام إدارة محتوى بدون رأس مع محرر مرئي وتحميل تدريجي للصور.",
    },
    results: {
      en: "0.8s load time · 100 Lighthouse performance score · 60% more organic traffic in 3 months.",
      ar: "وقت تحميل 0.8 ثانية · درجة أداء Lighthouse 100 · زيادة 60% في حركة المرور العضوية في 3 أشهر.",
    },
    features: {
      en: ["Cinematic Animations", "Headless CMS", "Multi-language", "SEO Optimized", "Blog System", "Dark Mode"],
      ar: ["رسوم سينمائية", "CMS بدون رأس", "متعدد اللغات", "تحسين SEO", "نظام مدونة", "الوضع الداكن"],
    },

  },

  {
    slug: "real-estate-portal",
    category: "web",
    featured: false,
    image: "/images/projects/real-estate-portal/cover.jpg",
    screenshots: [
      "/images/projects/real-estate-portal/cover.jpg",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Google Maps API", "AWS S3"],
    title: {
      en: "Real Estate Portal",
      ar: "بوابة العقارات",
    },
    description: {
      en: "Full-featured property listing portal with map search, virtual tours, mortgage calculator, and agent dashboard.",
      ar: "بوابة قوائم عقارية متكاملة مع بحث الخريطة والجولات الافتراضية وحاسبة الرهن ولوحة الوكيل.",
    },
    fullDescription: {
      en: "A comprehensive real estate marketplace connecting buyers, sellers, and agents. Features include map-based property search, 360° virtual tours, mortgage calculator, instant messaging between parties, and a powerful agent CRM dashboard.",
      ar: "سوق عقارات شامل يربط المشترين والبائعين والوكلاء. تشمل الميزات البحث العقاري على الخريطة والجولات الافتراضية 360° وحاسبة الرهن والرسائل الفورية بين الأطراف ولوحة إدارة علاقات العملاء للوكيل.",
    },
    challenge: {
      en: "Agents were juggling WhatsApp, spreadsheets, and multiple platforms with no unified lead management.",
      ar: "كان الوكلاء يتعاملون مع واتساب وجداول البيانات ومنصات متعددة بدون إدارة موحدة للعملاء المحتملين.",
    },
    solution: {
      en: "Single platform unifying listings, leads, and client communication with automated follow-up sequences.",
      ar: "منصة واحدة توحد القوائم والعملاء المحتملين والتواصل مع العملاء مع تسلسلات متابعة آلية.",
    },
    results: {
      en: "3x more inquiries per listing · agents close deals 40% faster · 500+ active property listings.",
      ar: "3 أضعاف الاستفسارات لكل قائمة · الوكلاء يغلقون الصفقات بنسبة 40% أسرع · أكثر من 500 قائمة عقارية نشطة.",
    },
    features: {
      en: ["Map Search", "Virtual Tours", "Mortgage Calculator", "Agent CRM", "Instant Chat", "360° Photos"],
      ar: ["بحث الخريطة", "جولات افتراضية", "حاسبة الرهن", "إدارة علاقات الوكيل", "دردشة فورية", "صور 360°"],
    },
  },

  {
    slug: "booking-management-web",
    category: "web",
    featured: false,
    image: "/images/projects/booking-management-web/cover.jpg",
    screenshots: [
      "/images/projects/booking-management-web/cover.jpg",
    ],
    techStack: ["Next.js", "tRPC", "Prisma", "Stripe", "Twilio"],
    title: {
      en: "Online Booking System",
      ar: "نظام الحجز الإلكتروني",
    },
    description: {
      en: "Smart booking platform for clinics, salons, and service businesses with automated reminders and online payments.",
      ar: "منصة حجز ذكية للعيادات والصالونات وشركات الخدمات مع تذكيرات آلية ومدفوعات إلكترونية.",
    },
    fullDescription: {
      en: "A white-label booking platform deployed for multiple business types. Clients get a branded booking page, smart availability calendar, automated SMS/email reminders, online payment collection, and a staff management panel.",
      ar: "منصة حجز بعلامة بيضاء مُنشرة لأنواع متعددة من الأعمال. يحصل العملاء على صفحة حجز بعلامتهم التجارية وتقويم توفر ذكي وتذكيرات SMS/بريد إلكتروني آلية وتحصيل مدفوعات إلكترونية ولوحة إدارة الموظفين.",
    },
    challenge: {
      en: "Service businesses losing 30% of bookings to no-shows and spending hours on phone-based scheduling.",
      ar: "الشركات الخدمية تخسر 30% من الحجوزات بسبب عدم الحضور وتقضي ساعات في الجدولة الهاتفية.",
    },
    solution: {
      en: "Automated booking flow with smart reminders at 24h and 1h before appointment, plus no-show deposit collection.",
      ar: "تدفق حجز آلي مع تذكيرات ذكية قبل 24 ساعة وساعة من الموعد، بالإضافة إلى تحصيل وديعة عدم الحضور.",
    },
    results: {
      en: "No-shows reduced by 75% · 100% online bookings · staff saved 15 hours/week on scheduling.",
      ar: "تقليل حالات عدم الحضور بنسبة 75% · حجوزات إلكترونية بنسبة 100% · الموظفون وفروا 15 ساعة أسبوعياً في الجدولة.",
    },
    features: {
      en: ["Smart Calendar", "Auto Reminders", "Online Payments", "Staff Management", "White-label", "Analytics"],
      ar: ["تقويم ذكي", "تذكيرات آلية", "مدفوعات إلكترونية", "إدارة الموظفين", "علامة بيضاء", "تحليلات"],
    },

  },

  // ══════════════════════════════════════════
  //  MOBILE APPLICATIONS
  // ══════════════════════════════════════════

  {
    slug: "mobile-banking-app",
    category: "mobile",
    featured: true,
    image: "/images/projects/mobile-banking-app/cover.jpg",
    screenshots: [
      "/images/projects/mobile-banking-app/cover.jpg",
    ],
    techStack: ["React Native", "Node.js", "MongoDB", "Firebase", "Stripe"],
    title: {
      en: "Mobile Banking App",
      ar: "تطبيق بنكي للموبايل",
    },
    description: {
      en: "Secure banking app with biometric login, real-time transactions, bill payments, and investment tracking.",
      ar: "تطبيق بنكي آمن مع تسجيل دخول بيومتري ومعاملات فورية ودفع فواتير وتتبع استثمارات.",
    },
    fullDescription: {
      en: "A full-featured mobile banking application for iOS and Android with biometric login, real-time balance and transaction history, P2P transfers, bill payments, QR code payments, and an investment portfolio tracker.",
      ar: "تطبيق بنكي كامل المميزات لنظامي iOS وAndroid مع تسجيل دخول بيومتري والرصيد الفوري وسجل المعاملات والتحويلات P2P ودفع الفواتير ومدفوعات رمز QR ومتتبع محفظة الاستثمار.",
    },
    challenge: {
      en: "The bank needed to modernize its digital offering to retain younger customers moving to neobanks.",
      ar: "كان البنك بحاجة لتحديث عروضه الرقمية للاحتفاظ بالعملاء الأصغر سناً الذين ينتقلون إلى البنوك الرقمية.",
    },
    solution: {
      en: "React Native app with bank-grade AES-256 encryption, biometrics, and seamless core banking integration.",
      ar: "تطبيق React Native بتشفير AES-256 على مستوى البنوك وبيومتريات وتكامل سلس مع الخدمات المصرفية الأساسية.",
    },
    results: {
      en: "200K+ downloads in month 1 · 4.8★ app store rating · 35% increase in digital transaction volume.",
      ar: "200 ألف+ تحميل في الشهر الأول · تقييم 4.8★ في متاجر التطبيقات · زيادة 35% في حجم المعاملات الرقمية.",
    },
    features: {
      en: ["Biometric Login", "Real-time Transfers", "Bill Payments", "QR Payments", "Investment Tracker", "Spending Analytics"],
      ar: ["تسجيل بيومتري", "تحويلات فورية", "دفع الفواتير", "مدفوعات QR", "تتبع الاستثمار", "تحليلات الإنفاق"],
    },

  },

  {
    slug: "food-delivery-app",
    category: "mobile",
    featured: false,
    image: "/images/projects/food-delivery-app/cover.jpg",
    screenshots: [
      "/images/projects/food-delivery-app/cover.jpg",
    ],
    techStack: ["Flutter", "Firebase", "Google Maps", "Stripe", "Node.js"],
    title: {
      en: "Food Delivery App",
      ar: "تطبيق توصيل طعام",
    },
    description: {
      en: "Full food delivery ecosystem — customer app, driver app, restaurant dashboard, and admin panel in one platform.",
      ar: "منظومة توصيل طعام متكاملة — تطبيق العميل وتطبيق السائق ولوحة المطعم ولوحة الإدارة في منصة واحدة.",
    },
    fullDescription: {
      en: "A complete food delivery ecosystem with 4 interconnected apps: customer-facing app, driver app with live navigation, restaurant management dashboard, and an admin control panel. All powered by real-time location tracking and Firebase.",
      ar: "منظومة توصيل طعام كاملة مع 4 تطبيقات مترابطة: تطبيق العملاء وتطبيق السائق مع ملاحة مباشرة ولوحة إدارة المطعم ولوحة تحكم الإدارة. كلها مدعومة بتتبع الموقع الفوري وFirebase.",
    },
    challenge: {
      en: "The restaurant chain needed its own branded delivery solution instead of paying 30% commission to third-party apps.",
      ar: "كانت سلسلة المطاعم بحاجة لحل توصيل بعلامتها التجارية بدلاً من دفع عمولة 30% لتطبيقات الطرف الثالث.",
    },
    solution: {
      en: "Full white-label ecosystem with live driver tracking, dynamic pricing, and integrated loyalty rewards.",
      ar: "منظومة بعلامة بيضاء كاملة مع تتبع السائق الحي والتسعير الديناميكي وبرنامج مكافآت الولاء المتكامل.",
    },
    results: {
      en: "Saved 30% in commissions · average delivery time 28 min · 4.7★ customer rating · 50K active users.",
      ar: "وفّر 30% من العمولات · متوسط وقت التوصيل 28 دقيقة · تقييم العملاء 4.7★ · 50 ألف مستخدم نشط.",
    },
    features: {
      en: ["Live Tracking", "Driver App", "Restaurant Dashboard", "Loyalty Rewards", "Dynamic Pricing", "Push Notifications"],
      ar: ["تتبع مباشر", "تطبيق السائق", "لوحة المطعم", "مكافآت الولاء", "تسعير ديناميكي", "إشعارات فورية"],
    },
  },

  {
    slug: "fitness-health-app",
    category: "mobile",
    featured: false,
    image: "/images/projects/fitness-health-app/cover.jpg",
    screenshots: [
      "/images/projects/fitness-health-app/cover.jpg",
    ],
    techStack: ["React Native", "HealthKit", "Google Fit", "TensorFlow Lite", "Firebase"],
    title: {
      en: "Fitness & Health Tracker",
      ar: "تطبيق اللياقة وتتبع الصحة",
    },
    description: {
      en: "AI-powered fitness app with personalized workout plans, nutrition tracking, wearable sync, and coach messaging.",
      ar: "تطبيق لياقة مدعوم بالذكاء الاصطناعي مع خطط تمرين مخصصة وتتبع التغذية ومزامنة الأجهزة القابلة للارتداء ومراسلة المدرب.",
    },
    fullDescription: {
      en: "A comprehensive health and fitness platform featuring AI-generated workout plans based on user goals, calorie and macro tracking, HealthKit/Google Fit wearable integration, video exercise library, and direct messaging with certified coaches.",
      ar: "منصة صحة ولياقة شاملة تضم خطط تمرين مُنشأة بالذكاء الاصطناعي بناءً على أهداف المستخدم وتتبع السعرات والمغذيات الكبرى وتكامل HealthKit/Google Fit ومكتبة فيديو التمارين والرسائل المباشرة مع المدربين المعتمدين.",
    },
    challenge: {
      en: "Users abandoned generic fitness apps after 2 weeks due to lack of personalization and accountability.",
      ar: "كان المستخدمون يتركون تطبيقات اللياقة العامة بعد أسبوعين بسبب غياب التخصيص والمساءلة.",
    },
    solution: {
      en: "ML-based adaptive plans that evolve weekly, combined with social challenges and live coach sessions.",
      ar: "خطط تكيفية قائمة على التعلم الآلي تتطور أسبوعياً، مدمجة مع تحديات اجتماعية وجلسات مدرب مباشرة.",
    },
    results: {
      en: "78% 30-day retention (industry avg 20%) · 4.9★ rating · 120K downloads in first quarter.",
      ar: "احتفاظ 78% بعد 30 يوماً (متوسط الصناعة 20%) · تقييم 4.9★ · 120 ألف تحميل في الربع الأول.",
    },
    features: {
      en: ["AI Workout Plans", "Nutrition Tracker", "Wearable Sync", "Video Library", "Coach Chat", "Social Challenges"],
      ar: ["خطط تمرين ذكية", "تتبع التغذية", "مزامنة الأجهزة", "مكتبة فيديو", "محادثة المدرب", "تحديات اجتماعية"],
    },
  },

  {
    slug: "elearning-mobile-app",
    category: "mobile",
    featured: false,
    image: "/images/projects/elearning-mobile-app/cover.jpg",
    screenshots: [
      "/images/projects/elearning-mobile-app/cover.jpg",
    ],
    techStack: ["Flutter", "Firebase", "Agora", "AWS CloudFront", "Stripe"],
    title: {
      en: "E-Learning Platform App",
      ar: "تطبيق منصة التعلم الإلكتروني",
    },
    description: {
      en: "Feature-rich e-learning app with live sessions, offline downloads, progress tracking, certificates, and quizzes.",
      ar: "تطبيق تعلم إلكتروني غني بالميزات مع جلسات مباشرة وتنزيلات غير متصلة وتتبع التقدم والشهادات والاختبارات.",
    },
    fullDescription: {
      en: "An end-to-end e-learning platform with live video classes via Agora, recorded course library with offline downloads, adaptive quizzes, auto-generated certificates, and an instructor dashboard with earnings analytics.",
      ar: "منصة تعلم إلكتروني شاملة مع فصول فيديو مباشرة عبر Agora ومكتبة دورات مسجلة مع تنزيلات غير متصلة واختبارات تكيفية وشهادات تُنشأ تلقائياً ولوحة مدرس مع تحليلات الأرباح.",
    },
    challenge: {
      en: "Instructors needed a branded platform to sell courses without paying 50%+ to Udemy/Coursera.",
      ar: "كان المدربون بحاجة لمنصة بعلامتهم التجارية لبيع الدورات دون دفع 50%+ لـ Udemy/Coursera.",
    },
    solution: {
      en: "White-label platform with custom domain, instructor revenue dashboard, and integrated live streaming.",
      ar: "منصة بعلامة بيضاء مع نطاق مخصص ولوحة إيرادات المدرب وبث مباشر متكامل.",
    },
    results: {
      en: "300+ courses published · 25K enrolled students · instructors kept 85% revenue vs 50% on marketplaces.",
      ar: "300+ دورة منشورة · 25 ألف طالب مسجل · المدربون احتفظوا بـ 85% من الإيرادات مقابل 50% في الأسواق.",
    },
    features: {
      en: ["Live Classes", "Offline Downloads", "Adaptive Quizzes", "Certificates", "Instructor Dashboard", "In-app Payments"],
      ar: ["فصول مباشرة", "تنزيل غير متصل", "اختبارات تكيفية", "شهادات", "لوحة المدرس", "مدفوعات داخل التطبيق"],
    },

  },
];
