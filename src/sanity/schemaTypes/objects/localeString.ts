import { defineType, defineField } from "sanity";

/**
 * A plain-text field with an English and Arabic value — mirrors the
 * `{ en: string; ar: string }` shape used throughout src/lib/data/*.ts.
 */
export default defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ar", title: "Arabic", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "en" },
  },
});
