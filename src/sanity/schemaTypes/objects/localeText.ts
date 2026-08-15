import { defineType, defineField } from "sanity";

/** Same as localeString but multi-line — for descriptions/paragraphs. */
export default defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "ar", title: "Arabic", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "en" },
  },
});
