import type { Metadata } from "next";
import { ServiceHubCard } from "@/components/services/ServiceHubCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import {
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ServiceGroupId, ServiceSlug } from "@/content/catalog";
import { media } from "@/content/media";
import { getDictionary } from "@/content/locales";
import { getServiceGroups, localizeMediaAsset } from "@/content/localized";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  return createMetadata({
    title: dict.servicesPage.meta.title,
    description: dict.servicesPage.meta.description,
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const groups = getServiceGroups(locale, dict);
  const copy = dict.servicesPage;
  const contactHref = localePath(locale, "/contact");
  const heroImage = localizeMediaAsset(dict, media.services.marketEntry);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.common.home, path: "/" },
            { name: copy.eyebrow, path: "/services" },
          ],
          locale,
        )}
      />

      <Section className="border-b border-border pt-16 pb-14 md:pt-24 md:pb-20">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: copy.eyebrow },
            ]}
          />
          <div className="mt-12 grid items-end gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-6">
              <Eyebrow accent>{copy.eyebrow}</Eyebrow>
              <h1 className="display-section mt-4 max-w-2xl">{copy.title}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal">
                {copy.description}
              </p>
              <div className="mt-8">
                <Button href={contactHref}>{copy.secondaryCta}</Button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <MediaImage
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                frameClassName="aspect-[16/11]"
                imageClassName="object-[center_35%]"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="border-b border-border py-16 md:py-20">
        <Container>
          <h2 className="text-[1.45rem] leading-tight tracking-[-0.02em] text-white-warm md:text-[1.75rem]">
            {copy.pillarsIntro}
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {copy.pillars.map((pillar) => (
              <li key={pillar.id}>
                <a
                  href={`#group-${pillar.id}`}
                  className="group flex h-full flex-col border border-white/15 bg-white/[0.03] p-7 transition-colors hover:border-accent/60 hover:bg-white/[0.06] md:p-8"
                >
                  <h3 className="text-[1.55rem] leading-tight tracking-[-0.02em] text-white-warm md:text-[1.85rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[1.0125rem] leading-relaxed text-white-warm/65">
                    {pillar.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium tracking-[0.04em] text-white-warm uppercase transition-colors group-hover:text-accent">
                    <span>{pillar.cta}</span>
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div id="services">
        {groups.map((group, groupIndex) => {
          const groupCopy = copy.groups[group.id as ServiceGroupId];
          const cardCount = group.services.length;

          return (
            <Section
              key={group.id}
              id={`group-${group.id}`}
              className={`scroll-mt-32 border-b border-border py-16 md:py-24 ${
                groupIndex % 2 === 1 ? "bg-white-warm" : ""
              }`}
              tone={groupIndex % 2 === 1 ? "white" : "ivory"}
            >
              <Container>
                <div className="max-w-2xl">
                  <h2 className="display-section text-[1.85rem] md:text-[2.5rem]">
                    {groupCopy.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-[1.0125rem] leading-relaxed text-charcoal md:text-[1.0625rem]">
                    {groupCopy.note}
                  </p>
                </div>

                <ul
                  className={`mt-10 gap-4 md:gap-5 ${
                    cardCount === 1
                      ? "grid max-w-xl"
                      : cardCount === 2
                        ? "grid md:grid-cols-2"
                        : "grid md:grid-cols-2 xl:grid-cols-3"
                  }`}
                >
                  {group.services.map((service) => {
                    const card =
                      copy.cards[service.slug as ServiceSlug];
                    return (
                      <li
                        key={service.slug}
                        id={service.slug}
                        className="min-h-0 scroll-mt-32"
                      >
                        <ServiceHubCard
                          service={{
                            id: service.slug,
                            href: service.href,
                            number: service.number,
                            name: service.name,
                            tag: card.tag,
                            description: card.description,
                            image: service.image,
                            learnMoreLabel: dict.common.learnMore,
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </Container>
            </Section>
          );
        })}
      </div>

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
                {copy.closing.primaryCta}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
