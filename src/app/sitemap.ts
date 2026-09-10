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

function languageAlternates(
  path: string,
): NonNullable<SitemapEntry["alternates"]> {
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
  options?: {
    lastModified?: Date;
    images?: string[];
  },
): SitemapEntry[] {
  const locales: Locale[] = ["en", "zh"];
  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    ...(options?.lastModified ? { lastModified: options.lastModified } : {}),
    alternates: languageAlternates(path),
    ...(options?.images?.length ? { images: options.images } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home = entryForLocales("/", {
    images: [absoluteUrl("/images/hero/hero-industrial-port.jpg")],
  });

  const corePages = [
    "/services",
    "/industries",
    "/insights",
    "/about",
    "/contact",
    "/legal",
    "/privacy",
  ].flatMap((path) => entryForLocales(path));

  const serviceRoutes = serviceSlugs.flatMap((slug) => {
    const image = serviceMeta[slug].image.src;
    return entryForLocales(`/services/${slug}`, {
      images: [absoluteUrl(image)],
    });
  });

  const industryRoutes = industrySlugs.flatMap((slug) => {
    const image = industryMeta[slug].image.src;
    return entryForLocales(`/industries/${slug}`, {
      images: [absoluteUrl(image)],
    });
  });

  const insightRoutes = (["en", "zh"] as const).flatMap((locale) =>
    getInsightSummaries(locale).map((insight) => ({
      url: absoluteUrl(localePath(locale, `/insights/${insight.slug}`)),
      lastModified: new Date(insight.updatedAt),
      alternates: languageAlternates(`/insights/${insight.slug}`),
      images: [absoluteUrl(insight.image.src)],
    })),
  );

  return [
    ...home,
    ...corePages,
    ...serviceRoutes,
    ...industryRoutes,
    ...insightRoutes,
  ];
}
