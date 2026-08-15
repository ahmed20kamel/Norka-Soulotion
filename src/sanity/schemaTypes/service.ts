import { defineType, defineField } from "sanity";

// Only the *copy* for each service is CMS-editable here — icon, accent
// color and gradient stay in src/lib/data/services.ts because they're
// design-system decisions (a Tailwind class/icon picker in a CMS is a
// worse editing experience than just being precise in code, and it keeps
// visual consistency out of non-developers' hands). `key` links a Sanity
// document back to the matching entry in services.ts.
export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Service key",
      type: "string",
      description: "Must match a key in src/lib/data/services.ts — controls which icon/color this service renders with.",
      options: {
        list: ["software", "mobile", "erp", "web", "infrastructure", "uiux", "marketing", "consulting"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "features", title: "Feature tags", type: "localeStringList" }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first. The first service (order 1) is the homepage spotlight card.",
      validation: (r) => r.required().integer().positive(),
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title.en", subtitle: "key" },
  },
});
