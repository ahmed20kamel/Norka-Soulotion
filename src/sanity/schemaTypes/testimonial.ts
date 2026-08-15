import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Client name", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / job title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Company", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Testimonial quote", type: "localeText", validation: (r) => r.required() }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (r) => r.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "photo",
      title: "Client photo (optional)",
      type: "image",
      options: { hotspot: true },
      description: "Leave empty to show a branded initials avatar instead — no need for a stock/placeholder photo.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      validation: (r) => r.integer(),
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.en", subtitle: "company.en", media: "photo" },
  },
});
