import "server-only";

import { getClient } from "./client";
import { urlForImage } from "./image";
import { projectsQuery, projectBySlugQuery, servicesQuery, testimonialsQuery } from "./queries";
import { sanityConfigured } from "../env";
import { projects as localProjects, type Project } from "@/lib/data/projects";
import { testimonials as localTestimonials, type Testimonial } from "@/lib/data/testimonials";
import { services as localServices, type ServiceKey } from "@/lib/data/services";

/**
 * Fallback-safe content layer: every function here returns exactly the
 * same shape as the local src/lib/data/*.ts files, whether the data came
 * from Sanity or from those files directly. Components never need to know
 * which source they got — that's decided once, here, based on whether
 * Sanity is actually configured (see src/sanity/env.ts).
 */

type SanityProjectDoc = Omit<Project, "image" | "screenshots"> & {
  image: { asset?: { _ref: string } };
  screenshots?: { asset?: { _ref: string } }[];
};

function normalizeProject(doc: SanityProjectDoc): Project {
  return {
    ...doc,
    image: urlForImage(doc.image)?.url() || "",
    screenshots: (doc.screenshots || []).map((s) => urlForImage(s)?.url() || "").filter(Boolean),
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!sanityConfigured) return localProjects;
  try {
    const docs = await getClient().fetch<SanityProjectDoc[]>(projectsQuery);
    if (!docs?.length) return localProjects;
    return docs.map(normalizeProject);
  } catch (err) {
    console.error("Sanity getProjects failed, falling back to local data:", err);
    return localProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!sanityConfigured) return localProjects.find((p) => p.slug === slug);
  try {
    const doc = await getClient().fetch<SanityProjectDoc | null>(projectBySlugQuery, { slug });
    return doc ? normalizeProject(doc) : localProjects.find((p) => p.slug === slug);
  } catch (err) {
    console.error("Sanity getProjectBySlug failed, falling back to local data:", err);
    return localProjects.find((p) => p.slug === slug);
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!sanityConfigured) return localTestimonials;
  try {
    type Doc = Omit<Testimonial, "image"> & { photo?: { asset?: { _ref: string } } };
    const docs = await getClient().fetch<Doc[]>(testimonialsQuery);
    if (!docs?.length) return localTestimonials;
    return docs.map((d) => ({ ...d, image: urlForImage(d.photo)?.url() || "" }));
  } catch (err) {
    console.error("Sanity getTestimonials failed, falling back to local data:", err);
    return localTestimonials;
  }
}

export interface ServiceCopy {
  key: ServiceKey;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
}

/**
 * Service *copy* only (title/description/features) — icon, color and
 * gradient always come from src/lib/data/services.ts (see the schema
 * comment in schemaTypes/service.ts for why). Returns null when Sanity
 * isn't configured or has no service docs yet, and callers fall back to
 * their existing next-intl `t()` calls unchanged.
 */
export async function getServiceCopy(): Promise<ServiceCopy[] | null> {
  if (!sanityConfigured) return null;
  try {
    const docs = await getClient().fetch<ServiceCopy[]>(servicesQuery);
    if (!docs?.length) return null;
    // Guard against CMS entries for keys src/lib/data/services.ts doesn't
    // know about (e.g. a typo in Studio) — keep only recognized keys.
    const knownKeys = new Set(localServices.map((s) => s.key));
    return docs.filter((d) => knownKeys.has(d.key));
  } catch (err) {
    console.error("Sanity getServiceCopy failed, falling back to i18n messages:", err);
    return null;
  }
}
