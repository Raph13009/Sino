import type { Dictionary } from "@/content/locales/types";
import {
  homePillarIds,
  industryMeta,
  industrySlugs,
  isSupportingService,
  serviceGroupAnchors,
  serviceGroupIds,
  serviceGroups,
  serviceMeta,
  serviceSlugs,
  type HomePillarId,
  type IndustrySlug,
  type ServiceSlug,
} from "@/content/catalog";
import { localePath, type Locale } from "@/i18n/config";

type LocalizableMedia = {
  id: string;
  alt: string;
};

export function localizeMediaAsset<T extends LocalizableMedia>(
  dict: Dictionary,
  asset: T,
): T {
  const alt =
    dict.mediaAlts[asset.id as keyof typeof dict.mediaAlts] ?? asset.alt;
  return { ...asset, alt };
}

export function getServices(locale: Locale, dict: Dictionary) {
  return serviceSlugs.map((slug) => {
    const copy = dict.services[slug];
    const meta = serviceMeta[slug];
    return {
      slug,
      number: meta.number,
      group: meta.group,
      image: localizeMediaAsset(dict, meta.image),
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

export function getHomePillars(locale: Locale, dict: Dictionary) {
  return homePillarIds.map((id: HomePillarId) => {
    const homePillar = dict.home.services.pillars[id];
    // Single source of truth for category body copy (shared with Services hub)
    const hubPillar = dict.servicesPage.pillars.find((p) => p.id === id);
    const anchor = serviceGroupAnchors[id].primary;
    return {
      id,
      href: localePath(locale, `/services#${anchor}`),
      title: hubPillar?.title ?? homePillar.title,
      description: hubPillar?.description ?? "",
      cta: homePillar.cta,
    };
  });
}

export function getServiceGroups(locale: Locale, dict: Dictionary) {
  const services = getServices(locale, dict);
  return serviceGroupIds.map((id) => {
    const anchor = serviceGroupAnchors[id];
    return {
      id,
      label: dict.nav.megaMenu.groups[id].label,
      // Single source with hub category notes (avoids dual mega/hub variants)
      note: dict.servicesPage.groups[id].note,
      href: localePath(locale, `/services#${anchor.primary}`),
      anchorPrimary: anchor.primary,
      anchorAlias: anchor.alias,
      services: serviceGroups[id]
        .map((slug) => services.find((item) => item.slug === slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((service) => ({
          ...service,
          supporting: isSupportingService(service.slug),
        })),
    };
  });
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
      image: localizeMediaAsset(dict, meta.image),
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
