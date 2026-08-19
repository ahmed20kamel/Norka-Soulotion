/**
 * Central Image Configuration for NORKA SOLUTION
 *
 * All real photography has been pulled out of the site — every photo slot
 * now renders <PhotoPlaceholder /> (src/components/ui/PhotoPlaceholder.tsx)
 * instead. The entries below are kept as empty slots: `src` is blank, but
 * the comment above each one is the exact path to drop the new file at.
 *
 * To bring a photo back:
 *  1. Drop the file into the path named in that entry's comment
 *  2. Set this entry's `src` to that same path
 *  3. Swap the component's <PhotoPlaceholder /> back for an <Image src={images....src} fill ... />
 *     (see git history on that component for the exact props it used to have)
 */

export const images = {
  /** Site branding — logo, not a content photo, left untouched */
  brand: {
    logo: {
      src: "/logo.png",
      alt: "Norka Solution",
    },
  },

  /** Home page */
  home: {
    // -> /public/images/home/hero-developer.jpg
    heroWorkspace: {
      src: "/images/home/hero-developer.jpg",
      alt: "Developer workspace with a desktop monitor and laptop showing code",
    },
    // -> /public/images/home/cta-skyline.jpg (reused as the Contact page hero too)
    ctaSkyline: {
      src: "",
      alt: "Dubai skyline and fountain at dusk",
    },
    // -> /public/images/home/about-team.jpg
    aboutTeam: {
      src: "/images/home/about-team.jpg",
      alt: "Close-up of a developer typing on a laptop showing code",
    },
    // -> /public/images/home/ceo-office.jpg
    ceoOffice: {
      src: "",
      alt: "Professionals in a modern office lobby",
    },
    // -> /public/images/home/services-code.jpg
    servicesCode: {
      src: "",
      alt: "Monitor displaying colorful source code",
    },
  },

  /** Inner page hero backgrounds */
  pageHeroes: {
    // -> /public/images/hero/services-hero.jpg
    services: { src: "/images/hero/services-hero.jpg", alt: "Website mockup shown across laptop, tablet, and phone screens" },
    // -> /public/images/hero/about-hero.jpg
    about: { src: "/images/hero/about-hero.jpg", alt: "Developer typing code on a laptop" },
    // -> /public/images/hero/portfolio-hero.png
    portfolio: { src: "/images/hero/portfolio-hero.png", alt: "Laptop displaying an analytics dashboard with sales charts" },
    // -> /public/images/hero/contact-hero.jpg
    contact: { src: "/images/hero/contact-hero.jpg", alt: "Businessperson holding a phone with call and email icons" },
  },

  /** About section */
  about: {
    // -> /public/images/about/team.jpg
    team: { src: "", alt: "Norka Solution team at work" },
    // -> /public/images/team/ahmed.jpg
    ceo: { src: "", alt: "Ahmed Kamel - CEO & Founder" },
  },

  /** Team members */
  team: {
    // -> /public/images/team/nourhan.jpg
    nourhan: { src: "", alt: "Eng. Nourhan - Managing Director" },
    // -> /public/images/team/ahmed.jpg
    ahmed: { src: "", alt: "Ahmed - CEO & Founder" },
  },

  /** Homepage services carousel — one photo per service key (matches the
   *  `ServiceKey` union in src/lib/data/services.ts). */
  services: {
    software:       { src: "/images/services/software.jpg",       alt: "Website mockup on a laptop screen — \"Building Websites That Drive Real Results\"" },
    web:             { src: "/images/services/web.jpg",             alt: "Developer writing code across two monitors" },
    mobile:          { src: "/images/services/mobile.jpg",          alt: "Mobile app dashboard shown on a smartphone" },
    erp:             { src: "/images/services/erp.jpg",             alt: "ERP executive dashboard with procurement and operations charts" },
    infrastructure:  { src: "/images/services/infrastructure.jpg",  alt: "Technician connecting cables in a server rack" },
    uiux:            { src: "/images/services/uiux.jpg",            alt: "UI design software open on a laptop during a team review" },
    marketing:       { src: "/images/services/marketing.jpg",       alt: "Social media strategy mapped out on a glass whiteboard" },
    consulting:      { src: "/images/services/consulting.jpg",      alt: "Consultant pointing a pen at a laptop during a meeting" },
  },

  /** Portfolio / Work section — each project's `image`/`screenshots` live in
   *  src/lib/data/projects.ts, also cleared. Drop files into
   *  /public/images/projects/{slug}/ (matches the hint already shown on the
   *  project detail page) and set them there. */
  projects: {
    basePath: "/images/projects",
  },

  /** Tech Stack logos — real SVGs only, untouched */
  techStack: {
    basePath: "/images/tech",
  },

  /** Testimonials — avatars, drop into /public/images/testimonials/{name}.jpg
   *  and set the matching testimonial's `image` in src/lib/data/testimonials.ts */
  testimonials: {
    basePath: "/images/testimonials",
  },
} as const;

export type ImageConfig = typeof images;
