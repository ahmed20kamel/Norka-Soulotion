export const apiVersion = "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Whether a Sanity project is actually wired up. Every fetch helper in
// lib/fetch-content.ts checks this first and falls back to the local
// src/lib/data/*.ts files when it's false — the site works with zero
// Sanity config today, and gains CMS-editability the moment a real
// project ID is set, no cutover required.
export const sanityConfigured = Boolean(projectId);
