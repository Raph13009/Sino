export type MediaAsset = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  page: string;
  section: string;
  status: "placeholder" | "final";
  replacementNote: string;
};

export const media = {
  brand: {
    logoLight: {
      id: "brand-logo-light",
      src: "/brand/logo-light.webp",
      alt: "OPOPA Partners",
      width: 400,
      height: 107,
      aspectRatio: "400:107",
      page: "global",
      section: "brand",
      status: "final" as const,
      replacementNote: "Light-surface lockup (navy + red on transparent)",
    },
    logoDark: {
      id: "brand-logo-dark",
      src: "/brand/logo-dark.webp",
      alt: "OPOPA Partners",
      width: 400,
      height: 113,
      aspectRatio: "400:113",
      page: "global",
      section: "brand",
      status: "final" as const,
      replacementNote: "Dark-surface lockup (white + red on transparent)",
    },
    mark: {
      id: "brand-mark",
      src: "/brand/mark.png",
      alt: "OPOPA mark",
      width: 512,
      height: 512,
      aspectRatio: "1:1",
      page: "global",
      section: "brand",
      status: "final" as const,
      replacementNote: "Architectural monogram for compact contexts",
    },
    favicon: {
      id: "brand-favicon",
      src: "/brand/favicon.png",
      alt: "OPOPA favicon",
      width: 512,
      height: 512,
      aspectRatio: "1:1",
      page: "global",
      section: "brand",
      status: "final" as const,
      replacementNote:
        "Source mark. Served at /favicon.ico, /icon.png, /favicon-192.png and /apple-touch-icon.png",
    },
    plaquette: {
      id: "brand-plaquette",
      src: "/brand/plaquette.webp",
      alt: "OPOPA Partners brand direction board",
      width: 1122,
      height: 1402,
      aspectRatio: "1122:1402",
      page: "global",
      section: "brand",
      status: "final" as const,
      replacementNote: "Internal brand reference board",
    },
  },
  home: {
    hero: {
      id: "home-hero-01",
      src: "/images/hero/hero-industrial-port.webp",
      alt: "Container port and industrial logistics infrastructure",
      width: 1920,
      height: 1280,
      aspectRatio: "3:2",
      page: "home",
      section: "hero",
      status: "placeholder" as const,
      replacementNote:
        "Replace with final China–Europe industrial hero photograph (port, manufacturing, or machinery)",
    },
    context: {
      id: "home-context-01",
      src: "/images/hero/hero-manufacturing-floor.webp",
      alt: "Manufacturing floor with industrial production equipment",
      width: 1920,
      height: 1200,
      aspectRatio: "16:10",
      page: "home",
      section: "context",
      status: "placeholder" as const,
      replacementNote: "Replace with documentary manufacturing or factory photography",
    },
  },
  services: {
    salesEnablement: {
      id: "service-sales-enablement",
      src: "/images/services/service-sales-enablement.webp",
      alt: "Technical discussion on an industrial production floor",
      width: 1600,
      height: 1067,
      aspectRatio: "3:2",
      page: "services",
      section: "sales-enablement",
      status: "placeholder" as const,
      replacementNote: "Replace with commercial training or B2B sales context photography",
    },
    expertPartnerSourcing: {
      id: "service-expert-partner-sourcing",
      src: "/images/services/service-expert-partner-sourcing.webp",
      alt: "Engineer reviewing technical documentation in an industrial setting",
      width: 1600,
      height: 1067,
      aspectRatio: "3:2",
      page: "services",
      section: "expert-partner-sourcing",
      status: "placeholder" as const,
      replacementNote: "Replace with specialist collaboration or partner qualification photography",
    },
    outsourcedSales: {
      id: "service-outsourced-sales",
      src: "/images/services/service-outsourced-sales.webp",
      alt: "Industrial machinery and manufacturing equipment detail",
      width: 1600,
      height: 1066,
      aspectRatio: "3:2",
      page: "services",
      section: "outsourced-sales",
      status: "placeholder" as const,
      replacementNote: "Replace with European sales / client representation context photography",
    },
    salesAiAutomation: {
      id: "service-sales-ai-automation",
      src: "/images/services/service-sales-ai-automation.webp",
      alt: "Industrial operations workstation supporting commercial workflows",
      width: 1600,
      height: 1066,
      aspectRatio: "3:2",
      page: "services",
      section: "sales-ai-automation",
      status: "placeholder" as const,
      replacementNote:
        "Replace with restrained commercial-operations / industrial workflow photography — avoid generic AI imagery",
    },
  },
  industries: {
    industrialEquipment: {
      id: "industry-industrial-equipment",
      src: "/images/industries/industry-industrial-equipment.webp",
      alt: "Heavy industrial equipment on a construction site",
      width: 1600,
      height: 1066,
      aspectRatio: "3:2",
      page: "industries",
      section: "industrial-equipment",
      status: "placeholder" as const,
      replacementNote: "Replace with industrial equipment / heavy machinery photography",
    },
    advancedManufacturing: {
      id: "industry-advanced-manufacturing",
      src: "/images/industries/industry-advanced-manufacturing.webp",
      alt: "Advanced manufacturing production line",
      width: 1600,
      height: 1200,
      aspectRatio: "4:3",
      page: "industries",
      section: "advanced-manufacturing",
      status: "placeholder" as const,
      replacementNote: "Replace with advanced manufacturing / automation photography",
    },
    greenTechnology: {
      id: "industry-green-technology",
      src: "/images/industries/industry-green-technology.webp",
      alt: "Solar energy infrastructure in an industrial landscape",
      width: 1600,
      height: 1065,
      aspectRatio: "3:2",
      page: "industries",
      section: "green-technology",
      status: "placeholder" as const,
      replacementNote: "Replace with green-tech / energy equipment photography",
    },
    mobilityInfrastructure: {
      id: "industry-mobility-infrastructure",
      src: "/images/industries/industry-mobility-infrastructure.webp",
      alt: "Rail and mobility infrastructure across an open landscape",
      width: 1600,
      height: 943,
      aspectRatio: "16:9",
      page: "industries",
      section: "mobility-infrastructure",
      status: "placeholder" as const,
      replacementNote: "Replace with mobility and infrastructure photography",
    },
  },
  about: {
    main: {
      id: "about-main-01",
      src: "/images/about/about-china-europe.webp",
      alt: "Contemporary commercial architecture against a clear sky",
      width: 1600,
      height: 1066,
      aspectRatio: "3:2",
      page: "about",
      section: "hero",
      status: "placeholder" as const,
      replacementNote:
        "Replace with China–Europe industrial / commercial context photography — avoid flags and clichés",
    },
    founderIntroduction: {
      id: "about-founder-introduction",
      src: "/video/founder-introduction.mp4",
      alt: "OPOPA founder introduction",
      width: 1920,
      height: 1080,
      aspectRatio: "16:9",
      page: "about",
      section: "founders",
      status: "final" as const,
      replacementNote:
        "Web delivery: /video/founder-introduction.mp4 (H.264 CRF 18, 1080p). 4K source kept in /video-source/",
    },
  },
  team: {
    maxMarchesseauLaskar: {
      id: "team-max-marchesseau-laskar",
      src: "/images/team/profile-MM-2026.webp",
      alt: "Portrait of Max Marchesseau Laskar, co-founder of OPOPA",
      width: 900,
      height: 1125,
      aspectRatio: "4:5",
      page: "about",
      section: "founders",
      status: "final" as const,
      replacementNote: "Founder portrait — Max Marchesseau Laskar",
    },
    raphaelLevy: {
      id: "team-raphael-levy",
      src: "/images/team/profile-RL-2026.webp",
      alt: "Portrait of Raphael Sacha Antoine Levy, co-founder of OPOPA",
      width: 900,
      height: 1125,
      aspectRatio: "4:5",
      page: "about",
      section: "founders",
      status: "final" as const,
      replacementNote: "Founder portrait — Raphael Sacha Antoine Levy (Europe)",
    },
  },
  insights: {
    marketEntry: {
      id: "insight-market-entry",
      src: "/images/insights/insight-market-entry.webp",
      alt: "Business planning documents on a desk",
      width: 1600,
      height: 1068,
      aspectRatio: "3:2",
      page: "insights",
      section: "article",
      status: "placeholder" as const,
      replacementNote: "Replace with article-specific industrial photography",
    },
    europeanSales: {
      id: "insight-european-sales",
      src: "/images/insights/insight-european-sales.webp",
      alt: "Engineer working with industrial equipment",
      width: 1600,
      height: 1067,
      aspectRatio: "3:2",
      page: "insights",
      section: "article",
      status: "placeholder" as const,
      replacementNote: "Replace with article-specific industrial photography",
    },
    distributorStrategy: {
      id: "insight-distributor-strategy",
      src: "/images/insights/insight-distributor-strategy.webp",
      alt: "Warehouse logistics and palletized industrial goods",
      width: 1600,
      height: 1067,
      aspectRatio: "3:2",
      page: "insights",
      section: "article",
      status: "placeholder" as const,
      replacementNote: "Replace with article-specific logistics / distribution photography",
    },
  },
} as const;

export type MediaRegistry = typeof media;

export function flattenMedia(): MediaAsset[] {
  const assets: MediaAsset[] = [];

  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    if (
      typeof record.id === "string" &&
      typeof record.src === "string" &&
      typeof record.alt === "string"
    ) {
      assets.push(record as unknown as MediaAsset);
      return;
    }
    Object.values(record).forEach(walk);
  };

  walk(media);
  return assets;
}
