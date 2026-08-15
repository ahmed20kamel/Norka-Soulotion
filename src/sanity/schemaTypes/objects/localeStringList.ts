import { defineType, defineField } from "sanity";

/** A bilingual list of short strings — used for feature bullets. */
export default defineType({
  name: "localeStringList",
  title: "Localized list",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "ar",
      title: "Arabic",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
  ],
});
