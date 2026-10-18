import { FinalCta } from "@/components/layout/FinalCta";
import { RelatedServiceCards } from "@/components/services/RelatedServiceCards";
import { SalesRepresentationProcess } from "@/components/services/sales-rep-process/SalesRepresentationProcess";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import {
  Container,
  Eyebrow,
  Rule,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ServiceSlug } from "@/content/catalog";
import type { Dictionary } from "@/content/locales/types";
import {
  getComplementaryServices,
  getService,
} from "@/content/localized";
import { localePath, type Locale } from "@/i18n/config";
import type { InsightSummary } from "@/lib/insights/types";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export function EuropeanSalesRepresentationPage({
  locale,
  dict,
  relatedInsights,
}: {
  locale: Locale;
  dict: Dictionary;
  relatedInsights: InsightSummary[];
}) {
  const leaf = getService(locale, dict, "european-sales-representation");
  if (!leaf) return null;

  const process = dict.services["european-sales-representation"].process;
  const contactHref = localePath(locale, "/contact");
  const related = getComplementaryServices(
    locale,
    dict,
    "european-sales-representation",
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.servicesPage.eyebrow, path: "/services" },
              {
                name: leaf.name,
                path: "/services/european-sales-representation",
              },
            ],
            locale,
          ),
          serviceJsonLd(
            {
              name: leaf.name,
              description: leaf.summary,
              path: "/services/european-sales-representation",
            },
            locale,
          ),
        ]}
      />

      <Section className="border-b border-border pt-16 pb-14 md:pt-24 md:pb-20">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              {
                label: dict.servicesPage.eyebrow,
                href: localePath(locale, "/services"),
              },
              { label: leaf.name },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="display-section">{leaf.name}</h1>
              <p className="mt-5 text-xl text-accent md:text-2xl">
                {leaf.positioning}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal">
                {leaf.summary}
              </p>
              <div className="mt-8">
                <Button href={contactHref}>{leaf.cta}</Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <MediaImage
                src={leaf.image.src}
                alt={leaf.image.alt}
                width={leaf.image.width}
                height={leaf.image.height}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                frameClassName="w-full"
                frameStyle={{
                  aspectRatio: `${leaf.image.width} / ${leaf.image.height}`,
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{dict.servicesPage.situationLabel}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
                {leaf.situationTitle}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              {leaf.situation.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-charcoal"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-20">
        <Container>
          <Eyebrow>{dict.servicesPage.coordinatesLabel}</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {leaf.coordinatesTitle}
          </h2>
          <div className="mt-8 max-w-3xl space-y-5">
            {leaf.coordinates.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1.0625rem] leading-relaxed text-charcoal"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <SalesRepresentationProcess process={process} />

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{dict.servicesPage.receivesLabel}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
                {leaf.receivesTitle}
              </h2>
              <ul className="mt-8 border-t border-border">
                {leaf.receives.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-4 text-[1.0625rem] leading-relaxed text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>{dict.servicesPage.startsLabel}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
                {leaf.startsTitle}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-charcoal">
                {leaf.starts}
              </p>
              <div className="mt-8">
                <Button href={contactHref}>{leaf.cta}</Button>
              </div>
              <Rule tone="accent" className="mt-8" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-20">
        <Container>
          <RelatedServiceCards
            title={dict.common.complementaryServices}
            services={related.map((item) => ({
              slug: item.slug as ServiceSlug,
              href: item.href,
              name: item.name,
              description: item.megaDescription,
            }))}
            relatedInsights={relatedInsights}
            relatedInsightsLabel={dict.common.relatedInsights}
          />
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
