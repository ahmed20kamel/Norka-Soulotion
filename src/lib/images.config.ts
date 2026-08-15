/**
 * Central Image Configuration for NORKA SOLUTION
 *
 * All image paths, alt text, and section placements are managed here.
 * To update images:
 *  1. Drop your image files into /public/images/
 *  2. Update the paths below
 *  3. All components reference this config — no hardcoded URLs in components
 *
 * Supported formats: .jpg, .png, .webp, .svg
 *
 * NOTE: several entries below (services, pageHeroes, about.team, team.nourhan)
 * are being phased out in favor of the generative brand-art components in
 * src/components/art/ (see ServiceArt, PageHeroArt, AboutArt, MonogramAvatar).
 * Real photography can still replace those components' output at any time —
 * just swap the component usage for an <Image src={...} /> pointing at a
 * file dropped into /public/images/, using the paths below as the convention.
 */

export const images = {
  /** Site branding */
  brand: {
    logo: {
      src: "/logo.svg",
      alt: "Norka Solution",
    },
  },

  /** Home page — real curated photography (Unsplash), chosen for UAE/Gulf
   *  relevance rather than generic stock. Swap any `src` for a real Norka
   *  Solution photo the moment one is available; nothing else needs to
   *  change since every component reads from here. */
  home: {
    heroWorkspace: {
      src: "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?w=1600&q=80&auto=format&fit=crop",
      alt: "Developer working across a multi-monitor coding setup",
    },
    ctaSkyline: {
      src: "https://images.unsplash.com/photo-1748373452031-ee1ae4eb624d?w=1600&q=80&auto=format&fit=crop",
      alt: "Dubai skyline and fountain at dusk",
    },
    aboutTeam: {
      src: "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?w=1200&q=80&auto=format&fit=crop",
      alt: "Team collaborating in a modern office",
    },
    ceoOffice: {
      src: "https://images.unsplash.com/photo-1758518729463-0bb73ed899ac?w=1200&q=80&auto=format&fit=crop",
      alt: "Professionals in a modern office lobby",
    },
    servicesCode: {
      src: "https://images.unsplash.com/photo-1760670399462-f5e479452c27?w=1200&q=80&auto=format&fit=crop",
      alt: "Monitor displaying colorful source code",
    },
  },

  /** Inner page hero backgrounds */
  pageHeroes: {
    services: {
      src: "/images/hero/services-hero.jpg",
      alt: "Our services",
    },
    about: {
      src: "/images/hero/about-hero.jpg",
      alt: "About Norka Solution",
    },
    portfolio: {
      src: "/images/hero/portfolio-hero.jpg",
      alt: "Our portfolio",
    },
    contact: {
      src: "/images/hero/contact-hero.jpg",
      alt: "Contact us",
    },
  },

  /** About section */
  about: {
    team: {
      src: "/images/about/team.jpg",
      alt: "Norka Solution team at work",
    },
    ceo: {
      src: "/images/team/ahmed.jpg",
      alt: "Ahmed Kamel - CEO & Founder",
    },
  },

  /** Team members */
  team: {
    nourhan: {
      src: "/images/team/nourhan.jpg",
      alt: "Eng. Nourhan - Managing Director",
    },
    ahmed: {
      src: "/images/team/ahmed.jpg",
      alt: "Ahmed - CEO & Founder",
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
} as const;

export type ImageConfig = typeof images;
