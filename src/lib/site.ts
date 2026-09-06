export const siteConfig = {
  name: "CIVEP",
  legalName: "CIVEP",
  tagline: "Markets in Sync",
  description:
    "European market-entry and commercial partner for Chinese industrial and green-tech companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.civep.com",
  locale: "en",
  locales: ["en", "zh"] as const,
  defaultLocale: "en" as const,
  /** Temporary public contact destination until a production inbox is set. */
  email: "raphaellevy027@gmail.com",
  linkedIn: "https://www.linkedin.com/in/raphael-levy-london/",
  primaryCta: {
    label: "Discuss your European expansion",
    href: "/contact",
  },
  ogImage: "/images/hero/hero-industrial-port.jpg",
} as const;

export type Locale = (typeof siteConfig.locales)[number];

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
