const PRODUCTION_SITE_URL = "https://www.opopa-partners.com";

export const siteConfig = {
  name: "OPOPA",
  legalName: "OPOPA Partners",
  tagline: "Markets in Sync",
  description:
    "European market-entry and commercial partner for Chinese industrial and green-tech companies.",
  /** Canonical origin. Not taken from env — preview/localhost must never leak. */
  url: PRODUCTION_SITE_URL,
  locale: "en",
  locales: ["en", "zh"] as const,
  defaultLocale: "en" as const,
  /** Temporary public contact destination until a production inbox is set. */
  email: "raphaellevy027@gmail.com",
  /** French micro-entrepreneur SIRET — confirmed. */
  siret: "92011864300021",
  linkedIn: "https://www.linkedin.com/in/raphael-levy-london/",
  founders: {
    maxMarchesseauLaskar: {
      linkedIn: "https://www.linkedin.com/in/max-marchesseau-laskar/",
    },
    raphaelLevy: {
      linkedIn: "https://www.linkedin.com/in/raphael-levy-london/",
    },
  },
  primaryCta: {
    label: "Discuss your European expansion",
    href: "/contact",
  },
  ogImage: "/images/hero/hero-industrial-port.jpg",
} as const;

export type Locale = (typeof siteConfig.locales)[number];

/**
 * Noindex Vercel Preview and `vercel dev` only.
 * Production (`VERCEL_ENV=production`) and hosts without VERCEL_ENV stay indexable.
 */
export function shouldNoIndexDeployment() {
  const env = process.env.VERCEL_ENV;
  return env === "preview" || env === "development";
}

export function isProductionDeployment() {
  if (shouldNoIndexDeployment()) return false;
  if (process.env.VERCEL_ENV === "production") return true;
  return process.env.NODE_ENV === "production";
}

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
