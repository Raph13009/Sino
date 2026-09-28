import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { MediaImage } from "@/components/ui/MediaImage";
import { Container, Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedServiceCards } from "@/components/services/RelatedServiceCards";
import type { ServiceSlug } from "@/content/catalog";
import type { Dictionary } from "@/content/locales/types";
import { getService } from "@/content/localized";
import { media } from "@/content/media";
import { localePath, type Locale } from "@/i18n/config";
import type { InsightSummary } from "@/lib/insights/types";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export function AfterSalesPage({
  locale,
  dict,
  breadcrumbName,
  relatedInsights,
}: {
  locale: Locale;
  dict: Dictionary;
  breadcrumbName: string;
  relatedInsights: InsightSummary[];
}) {
  const copy = dict.services["after-sales-maintenance"].detail;
  const contactHref = localePath(locale, "/contact");
  const warehouse = media.services.afterSalesWarehouse;
  const chart = media.services.afterSalesChart;
  const fieldService = media.services.afterSalesFieldService;
  const relatedServices = copy.related.links.flatMap((link) => {
    const slug = link.href.replace(/^\/services\//, "") as ServiceSlug;
    const service = getService(locale, dict, slug);
    if (!service) return [];
    return [
      {
        slug: service.slug as ServiceSlug,
        href: service.href,
        name: link.label,
        description: service.megaDescription,
      },
    ];
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.servicesPage.eyebrow, path: "/services" },
              {
                name: breadcrumbName,
                path: "/services/after-sales-maintenance",
              },
            ],
            locale,
          ),
          serviceJsonLd(
            {
              name: copy.headline,
              description: `${copy.lead} ${copy.intro}`,
              path: "/services/after-sales-maintenance",
            },
            locale,
          ),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: copy.faq.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />

      <Section className="border-b border-border py-14 md:py-20">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              {
                label: dict.servicesPage.eyebrow,
                href: localePath(locale, "/services"),
              },
              { label: breadcrumbName },
            ]}
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <h1 className="max-w-3xl text-[2.35rem] leading-[1.08] md:text-[3.35rem]">
                {copy.headline}
              </h1>
              <p className="mt-5 max-w-xl text-xl text-accent md:text-2xl">
                {copy.lead}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal">
                {copy.intro}
              </p>
              <div className="mt-8">
                <Button href={contactHref}>{copy.closing.cta}</Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <figure className="rounded-lg border border-border bg-white-warm p-4 md:p-5 lg:p-6">
                <MediaImage
                  src={chart.src}
                  alt={
                    dict.mediaAlts["service-after-sales-chart"] ?? chart.alt
                  }
                  width={chart.width}
                  height={chart.height}
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  frameClassName="aspect-[1665/658] w-full bg-white-warm"
                  imageClassName="object-contain object-center"
                />
              </figure>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.firstStep.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-charcoal">
                {copy.firstStep.intro}
              </p>
              <ul className="space-y-3 text-[1.0625rem] text-charcoal">
                {copy.firstStep.points.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-px w-4 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg leading-relaxed text-charcoal">
                {copy.firstStep.closing}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.model.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-charcoal">
                {copy.model.intro}
              </p>
              <ul className="space-y-3 text-[1.0625rem] text-charcoal">
                {copy.model.examples.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-px w-4 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-8">{copy.model.buildsAroundLabel}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {copy.model.buildsAround.map((item) => (
                  <li
                    key={item}
                    className="border border-border bg-white-warm px-4 py-3 text-[0.9375rem] font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.warehousing.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-charcoal">
                {copy.warehousing.intro}
              </p>
              <p className="eyebrow mt-8">{copy.warehousing.setupLabel}</p>
              <ul className="mt-4 space-y-3 text-[1.0625rem] text-charcoal">
                {copy.warehousing.setup.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-px w-4 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-l-2 border-accent pl-4 text-[1.0625rem] leading-relaxed text-charcoal">
                {copy.warehousing.bestFit}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <MediaImage
                src={warehouse.src}
                alt={
                  dict.mediaAlts["service-after-sales-warehouse"] ??
                  warehouse.alt
                }
                width={warehouse.width}
                height={warehouse.height}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 48vw"
                frameClassName="aspect-[16/9]"
                imageClassName="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight tracking-[-0.02em] md:text-[2.15rem]">
                {copy.logistics.title}
              </h2>
              <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-charcoal md:text-lg">
                {copy.logistics.intro}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow eyebrow-accent">
                {copy.logistics.setupLabel}
              </p>
              <ul className="mt-5 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {copy.logistics.setup.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9375rem] leading-snug text-ink"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <aside className="mt-8 border border-border border-l-2 border-l-accent bg-white-warm px-5 py-4">
                <p className="text-[1.02rem] leading-snug text-ink">
                  {copy.logistics.bestFit}
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <MediaImage
                src={fieldService.src}
                alt={
                  dict.mediaAlts["service-after-sales-field-service"] ??
                  fieldService.alt
                }
                width={fieldService.width}
                height={fieldService.height}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 40vw"
                frameClassName="aspect-[4/5] max-h-[32rem]"
                imageClassName="object-cover object-[center_20%]"
              />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.fieldService.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-charcoal">
                {copy.fieldService.intro}
              </p>
              <p className="eyebrow mt-8">{copy.fieldService.setupLabel}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {copy.fieldService.setup.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9375rem] text-charcoal"
                  >
                    <span
                      className="mt-2 h-px w-3 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[1.0625rem] leading-relaxed text-charcoal">
                {copy.fieldService.closing}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.network.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-charcoal">
                {copy.network.intro}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {copy.network.items.map((item) => (
                  <li
                    key={item}
                    className="border border-border bg-white-warm px-4 py-3 text-[0.9375rem] font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg leading-relaxed text-charcoal">
                {copy.network.closing}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <h2 className="max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.establish.title}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.establish.cards.map((card, index) => (
              <li
                key={card.title}
                className="border border-border bg-white-warm p-6"
              >
                <p className="eyebrow">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-xl leading-snug">{card.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <h2 className="max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.process.title}
          </h2>
          <ol className="mt-10 grid border-t border-border md:grid-cols-2">
            {copy.process.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-b border-border py-8 md:px-8 md:py-10 md:odd:border-r md:odd:pl-0 md:even:pr-0"
              >
                <p className="eyebrow">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-xl leading-snug">{step.title}</h3>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-charcoal">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.why.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-charcoal">
                {copy.why.intro}
              </p>
              <ul className="space-y-3 text-[1.0625rem] text-charcoal">
                {copy.why.points.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-px w-4 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg leading-relaxed text-charcoal">
                {copy.why.closing}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.forManufacturers.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-charcoal">
                {copy.forManufacturers.intro}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow">{copy.forManufacturers.withoutLabel}</p>
              <ul className="mt-4 space-y-3 text-[1.0625rem] text-charcoal">
                {copy.forManufacturers.without.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-px w-4 shrink-0 bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg leading-relaxed text-charcoal">
                {copy.forManufacturers.closing}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <h2 className="max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.industries.title}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.industries.items.map((item) => (
              <li
                key={item}
                className="border-t border-border pt-4 text-[1.02rem] font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <h2 className="max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.faq.title}
          </h2>
          <FaqAccordion items={copy.faq.items} className="mt-10" />
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <RelatedServiceCards
            title={copy.related.title}
            services={relatedServices}
            relatedInsights={relatedInsights}
            relatedInsightsLabel={dict.common.relatedInsights}
          />
        </Container>
      </Section>

      <Section tone="ink" className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="max-w-3xl text-[2.25rem] leading-[1.05] text-white-warm md:text-[3.25rem]">
                {copy.closing.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white-warm/70">
                {copy.closing.body}
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Button href={contactHref} variant="primaryOnDark">
                {copy.closing.cta}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
