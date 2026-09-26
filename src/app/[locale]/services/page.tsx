import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/layout/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import {
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/content/locales";
import { getServiceGroups } from "@/content/localized";
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
  const lead = groups[0]?.services[0];
  const supporting = groups.slice(1);
  const copy = dict.servicesPage;

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
      <Section className="border-b border-border pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: copy.eyebrow },
            ]}
          />
          <div className="mt-12 grid items-start gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-6">
              <Eyebrow accent>{copy.eyebrow}</Eyebrow>
              <h1 className="mt-4 max-w-xl text-[2.25rem] leading-[1.08] tracking-[-0.03em] md:text-[3.25rem]">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal">
                {copy.description}
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Eyebrow>{copy.engagementTitle}</Eyebrow>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal">
                {copy.engagementNote}
              </p>
              <ol
                aria-label={copy.engagementTitle}
                className="mt-6 list-none border-t border-border"
              >
                {copy.engagement.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-b border-border py-4"
                  >
                    <p className="eyebrow pt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <p className="text-[1.0625rem] leading-snug text-ink">
                        {step.title}
                      </p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-charcoal">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {lead ? (
        <Section className="border-b border-border py-16 md:py-20">
          <Container>
            <article className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="min-w-0 lg:col-span-7">
                <p className="eyebrow text-accent">
                  {lead.number} / {groups[0]?.label}
                </p>
                <h2 className="mt-3 text-[2rem] leading-tight md:text-[2.75rem]">
                  <Link href={lead.href} className="hover:text-accent">
                    {lead.name}
                  </Link>
                </h2>
                <p className="mt-4 text-lg text-accent md:text-xl">
                  {lead.positioning}
                </p>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-charcoal">
                  {lead.summary}
                </p>
                <Button href={lead.href} className="mt-8">
                  {dict.common.learnMore}
                </Button>
              </div>
              <div className="lg:col-span-5">
                <MediaImage
                  src={lead.image.src}
                  alt={lead.image.alt}
                  width={lead.image.width}
                  height={lead.image.height}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  frameClassName="aspect-[4/3]"
                />
              </div>
            </article>
          </Container>
        </Section>
      ) : null}

      {supporting.map((group) => (
        <Section key={group.id} className="border-b border-border py-14 md:py-16">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="text-[1.5rem] leading-tight md:text-[1.75rem]">
                  {group.label}
                </h2>
                <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-charcoal">
                  {group.note}
                </p>
              </div>
              <div className="lg:col-span-8">
                <ul className="border-t border-border">
                  {group.services.map((service) => (
                    <li key={service.slug} className="border-b border-border py-6">
                      <div className="grid gap-3 md:grid-cols-12 md:gap-6">
                        <p className="eyebrow md:col-span-1">{service.number}</p>
                        <div className="min-w-0 md:col-span-5">
                          <h3 className="text-xl leading-snug md:text-[1.35rem]">
                            <Link href={service.href} className="hover:text-accent">
                              {service.name}
                            </Link>
                          </h3>
                          <p className="mt-2 text-accent">{service.positioning}</p>
                        </div>
                        <div className="md:col-span-6">
                          <p className="text-[0.9375rem] leading-relaxed text-charcoal">
                            {service.megaDescription}
                          </p>
                          <Button href={service.href} variant="tertiary" className="mt-3" showArrow>
                            {dict.common.learnMore}
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
