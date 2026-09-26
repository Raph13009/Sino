import type { ServiceSlug } from "@/content/catalog";
import type { CmsCtaService } from "./schema";

export const ctaServicePath: Record<Exclude<CmsCtaService, "None">, string> = {
  "Market Entry": "/services/european-market-entry",
  "Sales Outsourcing": "/services/european-sales-representation",
  "Sales Coaching": "/services/european-sales-representation",
  "AI Sales Automation": "/services/sales-ai-automation",
};

export function pathForCtaService(cta: CmsCtaService): string | null {
  if (cta === "None") return null;
  return ctaServicePath[cta];
}

export function serviceSlugForCta(cta: CmsCtaService): ServiceSlug | null {
  const path = pathForCtaService(cta);
  if (!path?.startsWith("/services/")) return null;
  return path.slice("/services/".length) as ServiceSlug;
}
