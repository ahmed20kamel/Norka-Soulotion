/**
 * Central Image Configuration for NORKA SOLUTION
 *
 * All image paths, alt text, and section placements are managed here.
 * To update images:
 *  1. Drop your image files into /public/images/
 *  2. Update the paths below
 *  3. All components reference this config — no hardcoded URLs in components
 *
 * Supported formats: .jpg, .png, .webp (static) | .mp4, .webm (video)
 */

export const images = {
  /** Site branding */
  brand: {
    logo: {
      src: "/logo.svg",
      alt: "Norka Solution",
    },
  },

  /** Hero section */
  hero: {
    video: {
      src: "/your-video.mp4",
      type: "video/mp4",
    },
    // Fallback image if video doesn't load
    fallback: {
      src: "/images/hero-fallback.jpg",
      alt: "NORKA SOLUTION office",
    },
  },

  /** About section */
  about: {
    team: {
      src: "/images/about/team.jpg",
      alt: "Norka Solution team at work",
    },
    office: {
      src: "/images/about/office.jpg",
      alt: "Norka Solution office",
    },
    ceo: {
      src: "/images/about/ceo-ahmed-kamel.jpg",
      alt: "Ahmed Kamel - CEO & Founder",
    },
  },

  /** Services section — one image per service card */
  services: {
    webApplications: {
      src: "/images/services/web-applications.jpg",
      alt: "Web application development",
    },
    mobileApps: {
      src: "/images/services/mobile-apps.jpg",
      alt: "Mobile app development",
    },
    erpSystems: {
      src: "/images/services/erp-systems.jpg",
      alt: "ERP system implementation",
    },
    websiteDevelopment: {
      src: "/images/services/website-development.jpg",
      alt: "Website development",
    },
    itInfrastructure: {
      src: "/images/services/it-infrastructure.jpg",
      alt: "IT infrastructure and servers",
    },
    uiuxDesign: {
      src: "/images/services/uiux-design.jpg",
      alt: "UI/UX design process",
    },
    socialMedia: {
      src: "/images/services/social-media.jpg",
      alt: "Social media marketing",
    },
    companySetup: {
      src: "/images/services/company-setup.jpg",
      alt: "IT consulting and company setup",
    },
  },

  /** Portfolio / Work section */
  projects: {
    // Each project image is configured in projects data.
    // Drop screenshots into /public/images/projects/{slug}/
    basePath: "/images/projects",
  },

  /** Tech Stack logos — real SVGs only */
  techStack: {
    basePath: "/images/tech",
  },

  /** Testimonials */
  testimonials: {
    basePath: "/images/testimonials",
  },

  /** Partners */
  partners: {
    basePath: "/images/partners",
  },
} as const;

export type ImageConfig = typeof images;
