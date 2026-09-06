import { media } from "./media";

export const serviceSlugs = [
  "sales-enablement",
  "expert-partner-sourcing",
  "outsourced-sales",
  "sales-ai-automation",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceMeta: Record<
  ServiceSlug,
  { number: string; image: (typeof media.services)[keyof typeof media.services] }
> = {
  "sales-enablement": {
    number: "01",
    image: media.services.salesEnablement,
  },
  "expert-partner-sourcing": {
    number: "02",
    image: media.services.expertPartnerSourcing,
  },
  "outsourced-sales": {
    number: "03",
    image: media.services.outsourcedSales,
  },
  "sales-ai-automation": {
    number: "04",
    image: media.services.salesAiAutomation,
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
