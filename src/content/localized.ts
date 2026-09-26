import type { Dictionary } from "@/content/locales/types";
import {
  homeServiceCardSlugs,
  industryMeta,
  industrySlugs,
  serviceGroupIds,
  serviceGroups,
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
      group: meta.group,
      image: meta.image,
      href: localePath(locale, `/services/${slug}`),
      complementary: meta.complementary,
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

export function getHomeServiceCards(locale: Locale, dict: Dictionary) {
  return homeServiceCardSlugs.map((slug) => {
    const service = getService(locale, dict, slug);
    const card = dict.home.services.cards[slug];
    if (!service) {
      throw new Error(`Missing homepage service: ${slug}`);
    }
    return {
      slug,
      href: service.href,
      name: card.title,
      description: card.description,
    };
  });
}

export function getServiceGroups(locale: Locale, dict: Dictionary) {
  const services = getServices(locale, dict);
  return serviceGroupIds.map((id) => ({
    id,
    label: dict.nav.megaMenu.groups[id].label,
    note: dict.nav.megaMenu.groups[id].note,
    services: serviceGroups[id]
      .map((slug) => services.find((item) => item.slug === slug))
      .filter((item): item is NonNullable<typeof item> => Boolean(item)),
  }));
}

export function getComplementaryServices(
  locale: Locale,
  dict: Dictionary,
  slug: ServiceSlug,
) {
  const services = getServices(locale, dict);
  return serviceMeta[slug].complementary
    .map((related) => services.find((item) => item.slug === related))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
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
