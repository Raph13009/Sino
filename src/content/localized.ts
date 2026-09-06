import type { Dictionary } from "@/content/locales/types";
import {
  industryMeta,
  industrySlugs,
  insightMeta,
  insightSlugs,
  serviceMeta,
  serviceSlugs,
  type IndustrySlug,
  type InsightSlug,
  type ServiceSlug,
} from "@/content/catalog";
import { localePath, type Locale } from "@/i18n/config";

export function getServices(locale: Locale, dict: Dictionary) {
  return serviceSlugs.map((slug) => {
    const copy = dict.services[slug];
    const meta = serviceMeta[slug];
    return {
      slug,
      number: meta.number,
      image: meta.image,
      href: localePath(locale, `/services/${slug}`),
      ...copy,
    };
  });
}

export function getService(
  locale: Locale,
  dict: Dictionary,
  slug: string,
) {
  if (!serviceSlugs.includes(slug as ServiceSlug)) return undefined;
  return getServices(locale, dict).find((item) => item.slug === slug);
}

export function getIndustries(locale: Locale, dict: Dictionary) {
  return industrySlugs.map((slug) => {
    const copy = dict.industries[slug];
    const meta = industryMeta[slug];
    return {
      slug,
      number: meta.number,
      image: meta.image,
      href: localePath(locale, `/industries/${slug}`),
      ...copy,
    };
  });
}

export function getIndustry(
  locale: Locale,
  dict: Dictionary,
  slug: string,
) {
  if (!industrySlugs.includes(slug as IndustrySlug)) return undefined;
  return getIndustries(locale, dict).find((item) => item.slug === slug);
}

export function getInsights(locale: Locale, dict: Dictionary) {
  return insightSlugs.map((slug) => {
    const copy = dict.insights[slug];
    const meta = insightMeta[slug];
    return {
      slug,
      image: meta.image,
      relatedServices: meta.relatedServices,
      relatedIndustries: meta.relatedIndustries,
      href: localePath(locale, `/insights/${slug}`),
      ...copy,
    };
  });
}

export function getInsight(
  locale: Locale,
  dict: Dictionary,
  slug: string,
) {
  if (!insightSlugs.includes(slug as InsightSlug)) return undefined;
  return getInsights(locale, dict).find((item) => item.slug === slug);
}
