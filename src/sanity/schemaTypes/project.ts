import { defineType, defineField } from "sanity";

// Mirrors src/lib/data/projects.ts' `Project` interface field-for-field so
// the fallback-safe fetch layer (src/sanity/lib/fetch-content.ts) can
// normalize a Sanity document into exactly the same shape components
// already consume.
export default defineType({
  name: "project",
  title: "Portfolio project",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titleEn", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    // Helper field only — feeds the slug generator above, not rendered.
    defineField({ name: "titleEn", title: "Title (English, for slug generation)", type: "string", hidden: true }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["erp", "web", "mobile", "software", "infrastructure", "security"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "screenshots",
      title: "Gallery screenshots",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "techStack",
      title: "Tech stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Short description", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "fullDescription", title: "Full description", type: "localeText" }),
    defineField({ name: "challenge", title: "Challenge", type: "localeText" }),
    defineField({ name: "solution", title: "Solution", type: "localeText" }),
    defineField({ name: "results", title: "Results", type: "localeText" }),
    defineField({ name: "features", title: "Features", type: "localeStringList" }),
    defineField({ name: "demoUrl", title: "Live demo URL", type: "url" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "category", media: "image" },
  },
});
