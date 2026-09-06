import type { Dictionary } from "@/content/locales/types";
import {
  industryMeta,
  industrySlugs,
  serviceMeta,
  serviceSlugs,
  type IndustrySlug,
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
