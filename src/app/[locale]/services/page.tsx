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
            <div className="lg:col-span-7">
              <Eyebrow accent>{copy.eyebrow}</Eyebrow>
              <h1 className="mt-4 max-w-2xl text-[2.35rem] leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal">
                {copy.description}
              </p>
              <div className="mt-8">
                <Button href={contactHref}>{copy.secondaryCta}</Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <MediaImage
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 40vw"
                frameClassName="aspect-[4/3] rounded-xl"
                imageClassName="object-[center_35%]"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="concrete" className="border-b border-border py-12 md:py-14">
        <Container>
          <h2 className="text-[1.35rem] leading-tight tracking-[-0.02em] md:text-[1.6rem]">
            {copy.chooser.title}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5 md:gap-3">
            {copy.chooser.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-border bg-white-warm px-4 py-2.5 text-[0.875rem] leading-snug text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {item.label}
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
              className={`scroll-mt-24 border-b border-border py-16 md:py-24 ${
                groupIndex % 2 === 1 ? "bg-white-warm" : ""
              }`}
              tone={groupIndex % 2 === 1 ? "white" : "ivory"}
            >
              <Container>
                <div className="max-w-2xl">
                  <h2 className="text-[1.85rem] leading-tight tracking-[-0.02em] md:text-[2.35rem]">
                    {groupCopy.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-[1.0125rem] leading-relaxed text-charcoal md:text-[1.0625rem]">
                    {groupCopy.note}
                  </p>
                </div>

                <ul
                  className={`mt-10 gap-5 md:gap-6 ${
                    cardCount === 1
                      ? "mx-auto grid max-w-md md:grid-cols-1"
                      : cardCount === 2
                        ? "mx-auto flex max-w-md flex-col sm:max-w-none sm:flex-row sm:justify-center"
                        : "grid md:grid-cols-2 xl:grid-cols-3"
                  }`}
                >
                  {group.services.map((service) => {
                    const card =
                      copy.cards[service.slug as ServiceSlug];
                    return (
                      <li
                        key={service.slug}
                        className={`min-h-0 ${
                          cardCount === 2 ? "w-full max-w-md" : ""
                        }`}
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
