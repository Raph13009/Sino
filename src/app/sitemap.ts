import type { MetadataRoute } from "next";
import {
  industryMeta,
  industrySlugs,
  serviceMeta,
  serviceSlugs,
} from "@/content/catalog";
import { localePath, type Locale } from "@/i18n/config";
import { getAllPublishedInsights } from "@/lib/insights/service";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 600;

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const insights = await getAllPublishedInsights();
  const insightRoutes: SitemapEntry[] = insights.map((insight) => {
    const pair = insights.filter(
      (item) => item.translationGroup === insight.translationGroup,
    );
    const en = pair.find((item) => item.locale === "en");
    const zh = pair.find((item) => item.locale === "zh");
    const languages: Record<string, string> = {};
    if (en) languages.en = absoluteUrl(en.href);
    if (zh) languages["zh-Hans"] = absoluteUrl(zh.href);
    languages["x-default"] = languages.en ?? languages["zh-Hans"];

    return {
      url: absoluteUrl(insight.href),
      lastModified: new Date(insight.updatedAt),
      alternates: { languages },
      images: [absoluteUrl(insight.image.src)],
    };
  });

  return [
    ...home,
    ...corePages,
    ...serviceRoutes,
    ...industryRoutes,
    ...insightRoutes,
  ];
}
