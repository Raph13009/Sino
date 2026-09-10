import type { MetadataRoute } from "next";
import {
  industryMeta,
  industrySlugs,
  serviceMeta,
  serviceSlugs,
} from "@/content/catalog";
import { getInsightSummaries } from "@/content/insights/load";
import { localePath, type Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];

function languageAlternates(path: string): NonNullable<SitemapEntry["alternates"]> {
  return {
    languages: {
      en: absoluteUrl(localePath("en", path)),
      "zh-Hans": absoluteUrl(localePath("zh", path)),
      "x-default": absoluteUrl(localePath("en", path)),
    },
  };
}

function entryForLocales(
  path: string,
  options: {
    lastModified?: Date;
    changeFrequency: SitemapEntry["changeFrequency"];
    priority: number;
    images?: string[];
  },
): SitemapEntry[] {
  const locales: Locale[] = ["en", "zh"];
  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: languageAlternates(path),
    ...(options.images?.length ? { images: options.images } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const insights = getInsightSummaries("en");

  const home = entryForLocales("/", {
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    images: [absoluteUrl("/images/hero/hero-industrial-port.jpg")],
  });

  const corePages = (
    [
      ["services", 0.95, "weekly"],
      ["industries", 0.9, "weekly"],
      ["insights", 0.85, "weekly"],
      ["about", 0.7, "monthly"],
      ["contact", 0.75, "monthly"],
      ["legal", 0.2, "yearly"],
      ["privacy", 0.2, "yearly"],
    ] as const
  ).flatMap(([segment, priority, changeFrequency]) =>
    entryForLocales(`/${segment}`, {
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  const serviceRoutes = serviceSlugs.flatMap((slug) => {
    const image = serviceMeta[slug].image.src;
    return entryForLocales(`/services/${slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [absoluteUrl(image)],
    });
  });

  const industryRoutes = industrySlugs.flatMap((slug) => {
    const image = industryMeta[slug].image.src;
    return entryForLocales(`/industries/${slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [absoluteUrl(image)],
    });
  });

  const insightRoutes = insights.flatMap((insight) =>
    entryForLocales(`/insights/${insight.slug}`, {
      lastModified: new Date(insight.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absoluteUrl(insight.image.src)],
    }),
  );

  return [
    ...home,
    ...corePages,
    ...serviceRoutes,
    ...industryRoutes,
    ...insightRoutes,
  ];
}
