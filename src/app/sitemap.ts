import type { MetadataRoute } from "next";
import {
  industrySlugs,
  insightSlugs,
  serviceSlugs,
} from "@/content/catalog";
import { getDictionary } from "@/content/locales";
import { locales, localePath } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const enDict = getDictionary("en");

  const staticPaths = [
    "/",
    "/services",
    "/industries",
    "/insights",
    "/about",
    "/contact",
    "/legal",
    "/privacy",
  ];

  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
  );

  const serviceRoutes = locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({
      url: absoluteUrl(localePath(locale, `/services/${slug}`)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  );

  const industryRoutes = locales.flatMap((locale) =>
    industrySlugs.map((slug) => ({
      url: absoluteUrl(localePath(locale, `/industries/${slug}`)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  );

  const insightRoutes = locales.flatMap((locale) =>
    insightSlugs.map((slug) => ({
      url: absoluteUrl(localePath(locale, `/insights/${slug}`)),
      lastModified: new Date(enDict.insights[slug].date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...insightRoutes];
}
