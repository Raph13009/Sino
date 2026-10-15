import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedServiceCards } from "@/components/services/RelatedServiceCards";
import type { ServiceSlug } from "@/content/catalog";
import type { Dictionary } from "@/content/locales/types";
import { getComplementaryServices } from "@/content/localized";
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
  const service = dict.services["european-market-entry"];
  const copy = service.detail;
  const contactHref = localePath(locale, "/contact");
  const relatedServices = getComplementaryServices(
    locale,
    dict,
    "european-market-entry",
  ).map((item) => ({
    slug: item.slug as ServiceSlug,
    href: item.href,
    name: item.name,
    description: item.megaDescription,
  }));

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
              name: breadcrumbName,
              description: service.summary,
              path: "/services/european-market-entry",
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
              { label: breadcrumbName },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow-accent mb-4">{copy.eyebrow}</p>
              <h1 className="display-section max-w-3xl">{breadcrumbName}</h1>
              <p className="mt-5 text-xl text-accent md:text-2xl">
                {service.positioning}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal">
                {copy.intro}
              </p>
              <div className="mt-8">
                <Button href={contactHref}>{copy.nextStep.cta}</Button>
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

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{dict.servicesPage.situationLabel}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.whatWeDo.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              {copy.whatWeDo.paragraphs.map((paragraph) => (
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
          <Eyebrow>{dict.common.typicalScope}</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-[1.75rem] leading-tight md:text-[2.15rem]">
            {copy.inPractice.title}
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[1.0625rem] leading-relaxed text-charcoal">
                {copy.inPractice.intro}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="border-t border-border">
                {copy.inPractice.activities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-border py-3.5 text-[1rem] text-charcoal"
                  >
                    <span
                      className="mt-2 h-px w-3 shrink-0 bg-accent"
                      aria-hidden
                    />
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
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{dict.servicesPage.coordinatesLabel}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.howWeOperate.title}
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              {copy.howWeOperate.paragraphs.map((paragraph) => (
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
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{dict.servicesPage.receivesLabel}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] leading-tight md:text-[2.15rem]">
                {copy.youReceive.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-charcoal">
                {copy.youReceive.intro}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="border-t border-border">
                {copy.youReceive.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-4 text-[1.0625rem] leading-relaxed text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-20">
        <Container>
          <RelatedServiceCards
            title={dict.common.complementaryServices}
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
                {copy.nextStep.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white-warm/70">
                {copy.nextStep.body}
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <Button href={contactHref} variant="primaryOnDark">
                {copy.nextStep.cta}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
