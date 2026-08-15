/**
 * One-time content seed: pushes the site's existing local content
 * (src/lib/data/{projects,testimonials}.ts + the "services.*" strings in
 * src/messages/{en,ar}.json) into a connected Sanity dataset as starter
 * documents, so Studio isn't empty on first login.
 *
 * Usage (after completing the Sanity setup steps in README.md):
 *   npx tsx scripts/seed-sanity.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
 * a write-scoped SANITY_API_TOKEN in .env.local. Safe to re-run — every
 * document uses a stable, deterministic _id and is written with
 * createOrReplace, so re-running just re-syncs rather than duplicating.
 */
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local" });
import { projects } from "../src/lib/data/projects";
import { testimonials } from "../src/lib/data/testimonials";
import { services } from "../src/lib/data/services";
import en from "../src/messages/en.json";
import ar from "../src/messages/ar.json";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local — " +
      "see the Sanity setup steps in README.md before running this script."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

async function uploadImageFromUrl(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = url.split("/").pop()?.split("?")[0] || "image.jpg";
  return client.assets.upload("image", buffer, { filename });
}

async function seedProjects() {
  console.log(`Seeding ${projects.length} projects...`);
  for (const p of projects) {
    const coverAsset = await uploadImageFromUrl(p.image);
    const screenshotAssets = await Promise.all(p.screenshots.map(uploadImageFromUrl));

    await client.createOrReplace({
      _id: `project-${p.slug}`,
      _type: "project",
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      featured: p.featured,
      image: { _type: "image", asset: { _type: "reference", _ref: coverAsset._id } },
      screenshots: screenshotAssets.map((a) => ({
        _type: "image",
        _key: a._id,
        asset: { _type: "reference", _ref: a._id },
      })),
      techStack: p.techStack,
      title: p.title,
      description: p.description,
      fullDescription: p.fullDescription,
      challenge: p.challenge,
      solution: p.solution,
      results: p.results,
      features: p.features,
      demoUrl: p.demoUrl,
    });
    console.log(`  ✓ ${p.slug}`);
  }
}

async function seedServices() {
  console.log(`Seeding ${services.length} services...`);
  for (const [index, s] of services.entries()) {
    const enCopy = (en as Record<string, Record<string, unknown>>).services[s.key] as {
      title: string;
      description: string;
      features: string[];
    };
    const arCopy = (ar as Record<string, Record<string, unknown>>).services[s.key] as {
      title: string;
      description: string;
      features: string[];
    };

    await client.createOrReplace({
      _id: `service-${s.key}`,
      _type: "service",
      key: s.key,
      order: index + 1,
      title: { en: enCopy.title, ar: arCopy.title },
      description: { en: enCopy.description, ar: arCopy.description },
      features: { en: enCopy.features, ar: arCopy.features },
    });
    console.log(`  ✓ ${s.key}`);
  }
}

async function seedTestimonials() {
  console.log(`Seeding ${testimonials.length} testimonials...`);
  // Deliberately no photo upload — the site now shows a branded initials
  // avatar for testimonials by default (see MonogramAvatar). Add a real
  // photo per testimonial from within Studio whenever one is available.
  for (const [index, t] of testimonials.entries()) {
    await client.createOrReplace({
      _id: `testimonial-${index}`,
      _type: "testimonial",
      order: index + 1,
      name: t.name,
      role: t.role,
      company: t.company,
      text: t.text,
      rating: t.rating,
    });
    console.log(`  ✓ ${t.name.en}`);
  }
}

async function main() {
  await seedServices();
  await seedTestimonials();
  await seedProjects();
  console.log("\nDone. Visit /studio to review and edit the seeded content.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
