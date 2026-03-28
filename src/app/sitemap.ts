import type { MetadataRoute } from "next";

const baseUrl = "https://norkasolution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ar"];
  const routes = ["", "/services", "/portfolio", "/about", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
