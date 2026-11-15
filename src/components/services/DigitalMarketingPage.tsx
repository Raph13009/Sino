import { FinalCta } from "@/components/layout/FinalCta";
import { RelatedServiceCards } from "@/components/services/RelatedServiceCards";
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

export function DigitalMarketingPage({
  locale,
  dict,
  relatedInsights,
}: {
  locale: Locale;
  dict: Dictionary;
  relatedInsights: InsightSummary[];
}) {
  const leaf = getService(locale, dict, "digital-marketing");
  if (!leaf) return null;

  const copy = dict.services["digital-marketing"].detail;
  const contactHref = localePath(locale, "/contact");
  const related = getComplementaryServices(locale, dict, "digital-marketing");

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
                path: "/services/digital-marketing",
              },
            ],
            locale,
          ),
          serviceJsonLd(
            {
              name: leaf.name,
              description: leaf.summary,
              path: "/services/digital-marketing",
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
              <h1 className="display-section">{copy.headline}</h1>
              <p className="mt-5 text-xl text-accent md:text-2xl">{copy.lead}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal">
                {copy.intro}
              </p>
              <div className="mt-8">
                <Button href={contactHref}>{copy.heroCta}</Button>
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
          <h2 className="max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.outcomes.title}
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {copy.outcomes.items.map((item, index) => (
              <li key={item.title} className="border-t border-border pt-6">
                <p className="text-[0.75rem] tracking-[0.12em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-[1.2rem] font-medium tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-charcoal">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.services.title}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal">
                {copy.services.intro}
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="border-t border-border">
                {copy.services.items.map((service) => (
                  <li
                    key={service.title}
                    className="border-b border-border py-7"
                  >
                    <h3 className="text-[1.15rem] font-medium tracking-[-0.02em]">
                      {service.title}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[0.975rem] leading-relaxed text-charcoal"
                        >
                          <span
                            className="mt-2 h-px w-3 shrink-0 bg-accent"
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <Eyebrow>{copy.process.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.process.title}
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {copy.process.steps.map((step) => (
              <li key={step.number} className="border-t border-border pt-6">
                <p className="text-[0.75rem] tracking-[0.12em] text-accent">
                  {step.number}
                </p>
                <h3 className="mt-3 text-[1.2rem] font-medium tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-charcoal">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Eyebrow>{copy.approach.title}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.approach.lead}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              {copy.approach.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-charcoal"
                >
                  {paragraph}
                </p>
              ))}
              <Rule tone="accent" className="mt-8" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.closing.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal">
                {copy.closing.body}
              </p>
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Button href={contactHref}>{copy.closing.cta}</Button>
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
