import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { Container, Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedServiceCards } from "@/components/services/RelatedServiceCards";
import type { ServiceSlug } from "@/content/catalog";
import type { Dictionary } from "@/content/locales/types";
import { getService } from "@/content/localized";
import type { MediaAsset } from "@/content/media";
import { media } from "@/content/media";
import { localePath, type Locale } from "@/i18n/config";
import type { InsightSummary } from "@/lib/insights/types";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";

export function MarketEntryPage({
  locale,
  dict,
  image,
  breadcrumbName,
  relatedInsights,
}: {
  locale: Locale;
  dict: Dictionary;
  image: MediaAsset;
  breadcrumbName: string;
  relatedInsights: InsightSummary[];
}) {
  const copy = dict.services["european-market-entry"].detail;
  const contactHref = localePath(locale, "/contact");
  const [decisionLabel, examinesLabel, givesLabel] = copy.work.columns;
  const relatedServices = copy.followOn.links.flatMap((link) => {
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
                path: "/services/european-market-entry",
              },
            ],
            locale,
          ),
          serviceJsonLd(
            {
              name: copy.headline,
              description: `${copy.lead} ${copy.intro}`,
              path: "/services/european-market-entry",
            },
            locale,
          ),
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
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
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
            <div className="lg:col-span-5">
              <MediaImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                frameClassName="aspect-[4/3]"
                imageClassName="scale-[1.06] object-[center_40%]"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.plan.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              {copy.plan.paragraphs.map((paragraph) => (
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

      <Section tone="white" className="border-y border-border py-0">
        <MediaImage
          src={media.services.marketEntryMap.src}
          alt={
            dict.mediaAlts["service-market-entry-map"] ??
            media.services.marketEntryMap.alt
          }
          width={media.services.marketEntryMap.width}
          height={media.services.marketEntryMap.height}
          quality={90}
          sizes="100vw"
          frameClassName="aspect-[7/2] w-full bg-white-warm md:aspect-[4/1]"
          imageClassName="object-cover object-center scale-[1.12]"
        />
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <h2 className="max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.work.title}
          </h2>

          <ul className="mt-8 grid gap-4 lg:hidden">
            {copy.work.rows.map((row) => (
              <li
                key={row.decision}
                className="border border-border bg-white-warm p-5"
              >
                <h3 className="text-lg leading-snug">{row.decision}</h3>
                <p className="eyebrow mt-5">{examinesLabel}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal">
                  {row.examines}
                </p>
                <p className="eyebrow mt-4">{givesLabel}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal">
                  {row.gives}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 hidden overflow-x-auto lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{copy.work.title}</caption>
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="eyebrow w-[22%] pb-4 pr-6 font-medium"
                  >
                    {decisionLabel}
                  </th>
                  <th
                    scope="col"
                    className="eyebrow w-[39%] pb-4 pr-6 font-medium"
                  >
                    {examinesLabel}
                  </th>
                  <th scope="col" className="eyebrow w-[39%] pb-4 font-medium">
                    {givesLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {copy.work.rows.map((row) => (
                  <tr
                    key={row.decision}
                    className="border-b border-border align-top"
                  >
                    <th
                      scope="row"
                      className="py-5 pr-6 text-base font-medium text-ink"
                    >
                      {row.decision}
                    </th>
                    <td className="py-5 pr-6 text-[0.9375rem] leading-relaxed text-charcoal">
                      {row.examines}
                    </td>
                    <td className="py-5 text-[0.9375rem] leading-relaxed text-charcoal">
                      {row.gives}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-3xl text-[1.0625rem] leading-relaxed text-charcoal">
            {copy.work.note}
          </p>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.route.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              {copy.route.paragraphs.map((paragraph) => (
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

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <h2 className="max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.steps.title}
          </h2>
          <ol className="mt-10 grid border-t border-border md:grid-cols-2">
            {copy.steps.items.map((step, index) => (
              <li
                key={step.title}
                className="border-b border-border py-8 md:px-8 md:py-10 md:odd:border-r md:odd:pl-0 md:even:pr-0"
              >
                <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
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
                {copy.deliverable.title}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal">
                {copy.deliverable.intro}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="border-t border-border">
                {copy.deliverable.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-border py-4 text-[1.0625rem] leading-relaxed text-charcoal"
                  >
                    <span
                      className="mt-3 h-px w-3 shrink-0 bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lg leading-relaxed text-charcoal">
                {copy.deliverable.closing}
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
                {copy.followOn.title}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-5">
                {copy.followOn.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-lg leading-relaxed text-charcoal"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <RelatedServiceCards
              services={relatedServices}
              relatedInsights={relatedInsights}
              relatedInsightsLabel={dict.common.relatedInsights}
            />
          </div>
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
