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
      "european-experts-and-partners",
      "legal-and-regulatory-support",
      "european-sales-representation",
    ],
  },
  "european-experts-and-partners": {
    number: "02",
    group: "support",
    image: media.services.expertPartnerSourcing,
    complementary: [
      "european-market-entry",
      "legal-and-regulatory-support",
      "after-sales-maintenance",
    ],
  },
  "legal-and-regulatory-support": {
    number: "03",
    group: "support",
    image: media.services.salesEnablement,
    complementary: [
      "european-experts-and-partners",
      "european-market-entry",
    ],
  },
  "after-sales-maintenance": {
    number: "04",
    group: "support",
    image: media.services.afterSalesWarehouse,
    complementary: [
      "european-market-entry",
      "european-experts-and-partners",
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
