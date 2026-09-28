import Link from "next/link";
import { Eyebrow } from "@/components/ui/Section";
import {
  ServiceCard,
  type ServiceCardData,
} from "@/components/services/ServiceCard";
import type { InsightSummary } from "@/lib/insights/types";

export function RelatedServiceCards({
  title,
  services,
  relatedInsights = [],
  relatedInsightsLabel,
}: {
  title?: string;
  services: ServiceCardData[];
  relatedInsights?: InsightSummary[];
  relatedInsightsLabel?: string;
}) {
  if (services.length === 0) return null;

  return (
    <>
      {title ? (
        <h2 className="max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
          {title}
        </h2>
      ) : null}
      <ul
        className={`grid gap-5 sm:grid-cols-2 lg:gap-6 ${
          title ? "mt-10" : ""
        } ${services.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
      >
        {services.map((service) => (
          <li key={service.slug} className="min-h-0">
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>

      {relatedInsights.length > 0 && relatedInsightsLabel ? (
        <div className="mt-14 border-t border-border pt-10">
          <Eyebrow>{relatedInsightsLabel}</Eyebrow>
          <ul className="mt-6 space-y-3">
            {relatedInsights.map((insight) => (
              <li key={insight.slug}>
                <Link
                  href={insight.href}
                  className="text-[1.0625rem] font-medium transition-colors hover:text-accent"
                >
                  {insight.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
