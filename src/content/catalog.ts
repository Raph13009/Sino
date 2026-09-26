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

/** Homepage features four entry points. The hub lists the full catalogue. */
export const homeServiceCardSlugs = [
  "european-market-entry",
  "european-experts-and-partners",
  "european-sales-representation",
  "after-sales-maintenance",
] as const satisfies readonly ServiceSlug[];

export type HomeServiceCardSlug = (typeof homeServiceCardSlugs)[number];

export const serviceGroupIds = ["plan", "build", "grow"] as const;

export type ServiceGroupId = (typeof serviceGroupIds)[number];

export const serviceGroups: Record<ServiceGroupId, readonly ServiceSlug[]> = {
  plan: ["european-market-entry"],
  build: [
    "european-experts-and-partners",
    "legal-and-regulatory-support",
    "after-sales-maintenance",
  ],
  grow: ["european-sales-representation", "sales-ai-automation"],
};

export const serviceMeta: Record<
  ServiceSlug,
  {
    number: string;
    group: ServiceGroupId;
    image: (typeof media.services)[keyof typeof media.services] | (typeof media.home)["context"] | (typeof media.industries)["industrialEquipment"];
    complementary: readonly ServiceSlug[];
  }
> = {
  "european-market-entry": {
    number: "01",
    group: "plan",
    image: media.home.context,
    complementary: [
      "european-experts-and-partners",
      "legal-and-regulatory-support",
      "european-sales-representation",
    ],
  },
  "european-experts-and-partners": {
    number: "02",
    group: "build",
    image: media.services.expertPartnerSourcing,
    complementary: [
      "european-market-entry",
      "legal-and-regulatory-support",
      "after-sales-maintenance",
    ],
  },
  "legal-and-regulatory-support": {
    number: "03",
    group: "build",
    image: media.services.salesEnablement,
    complementary: [
      "european-experts-and-partners",
      "european-market-entry",
    ],
  },
  "after-sales-maintenance": {
    number: "04",
    group: "build",
    image: media.industries.industrialEquipment,
    complementary: [
      "european-market-entry",
      "european-experts-and-partners",
      "european-sales-representation",
    ],
  },
  "european-sales-representation": {
    number: "05",
    group: "grow",
    image: media.services.outsourcedSales,
    complementary: [
      "european-market-entry",
      "sales-ai-automation",
      "european-experts-and-partners",
    ],
  },
  "sales-ai-automation": {
    number: "06",
    group: "grow",
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
