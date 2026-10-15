import { media } from "./media";

export const serviceSlugs = [
  "european-market-entry",
  "european-experts-and-partners",
  "legal-and-regulatory-support",
  "after-sales-maintenance",
  "european-sales-representation",
  "sales-ai-automation",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Homepage features the two entry pillars. The hub lists the full catalogue. */
export const homePillarIds = ["access", "support"] as const;

export type HomePillarId = (typeof homePillarIds)[number];

export const serviceGroupIds = ["access", "support"] as const;

export type ServiceGroupId = (typeof serviceGroupIds)[number];

export const serviceGroups: Record<ServiceGroupId, readonly ServiceSlug[]> = {
  access: [
    "european-market-entry",
    "european-sales-representation",
    "sales-ai-automation",
  ],
  support: [
    "european-experts-and-partners",
    "legal-and-regulatory-support",
    "after-sales-maintenance",
  ],
};

/** Supporting capabilities: kept as URLs, de-emphasized in nav/hub. */
export const supportingServiceSlugs = ["sales-ai-automation"] as const;

export type SupportingServiceSlug = (typeof supportingServiceSlugs)[number];

export function isSupportingService(slug: string): boolean {
  return (supportingServiceSlugs as readonly string[]).includes(slug);
}

/** Hub section anchors (aliases keep #group-* working for one release). */
export const serviceGroupAnchors: Record<
  ServiceGroupId,
  { primary: string; alias: string }
> = {
  access: { primary: "market-access", alias: "group-access" },
  support: { primary: "local-support", alias: "group-support" },
};

export const serviceMeta: Record<
  ServiceSlug,
  {
    number: string;
    group: ServiceGroupId;
    image:
      | (typeof media.services)[keyof typeof media.services]
      | (typeof media.home)["context"]
      | (typeof media.industries)["industrialEquipment"];
    complementary: readonly ServiceSlug[];
  }
> = {
  "european-market-entry": {
    number: "01",
    group: "access",
    image: media.services.marketEntry,
    complementary: [
      "european-sales-representation",
      "european-experts-and-partners",
      "after-sales-maintenance",
    ],
  },
  "european-experts-and-partners": {
    number: "02",
    group: "support",
    image: media.services.expertPartnerSourcing,
    complementary: [
      "legal-and-regulatory-support",
      "after-sales-maintenance",
      "european-market-entry",
    ],
  },
  "legal-and-regulatory-support": {
    number: "03",
    group: "support",
    image: media.services.legalRegulatory,
    complementary: [
      "european-experts-and-partners",
      "european-market-entry",
      "after-sales-maintenance",
    ],
  },
  "after-sales-maintenance": {
    number: "04",
    group: "support",
    image: media.services.afterSalesWarehouse,
    complementary: [
      "european-experts-and-partners",
      "european-market-entry",
      "european-sales-representation",
    ],
  },
  "european-sales-representation": {
    number: "05",
    group: "access",
    image: media.services.outsourcedSales,
    complementary: [
      "european-market-entry",
      "sales-ai-automation",
      "european-experts-and-partners",
    ],
  },
  "sales-ai-automation": {
    number: "06",
    group: "access",
    image: media.services.salesAiAutomation,
    complementary: [
      "european-sales-representation",
      "european-market-entry",
    ],
  },
};

export const industrySlugs = [
  "industrial-equipment",
  "advanced-manufacturing",
  "green-technology",
  "mobility-infrastructure",
] as const;

export type IndustrySlug = (typeof industrySlugs)[number];

export const industryMeta: Record<
  IndustrySlug,
  {
    number: string;
    image: (typeof media.industries)[keyof typeof media.industries];
  }
> = {
  "industrial-equipment": {
    number: "01",
    image: media.industries.industrialEquipment,
  },
  "advanced-manufacturing": {
    number: "02",
    image: media.industries.advancedManufacturing,
  },
  "green-technology": {
    number: "03",
    image: media.industries.greenTechnology,
  },
  "mobility-infrastructure": {
    number: "04",
    image: media.industries.mobilityInfrastructure,
  },
};
