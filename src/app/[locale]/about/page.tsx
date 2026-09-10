import type { Metadata } from "next";
import { FounderProfile } from "@/components/about/FounderProfile";
import { FinalCta } from "@/components/layout/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import {
  Container,
  Eyebrow,
  Rule,
  Section,
  SectionHeading,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { getDictionary } from "@/content/locales";
import { getServices } from "@/content/localized";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import {
  breadcrumbJsonLd,
  createMetadata,
  personJsonLd,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  return createMetadata({
    title: dict.about.meta.title,
    description: dict.about.meta.description,
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const copy = dict.about;
  const services = getServices(locale, dict);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: dict.common.home, path: "/" },
              { name: copy.eyebrow, path: "/about" },
            ],
            locale,
          ),
          ...copy.founders.items.map((founder) => {
            const portrait =
              founder.mediaKey in media.team
                ? media.team[founder.mediaKey as keyof typeof media.team]
                : undefined;
            return personJsonLd({
              name: founder.name,
              jobTitle: founder.role,
              linkedIn: founder.linkedIn,
              image: portrait?.src,
            });
          }),
        ]}
      />

      {/* Hero — text only */}
      <Section className="border-b border-border py-14 md:py-20">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: copy.eyebrow },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <Eyebrow accent>{copy.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-[2.5rem] leading-[1.04] tracking-[-0.03em] md:text-[3.75rem]">
              {copy.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal md:text-xl">
              {copy.lead}
            </p>
          </div>
        </Container>
      </Section>

      {/* Founders */}
      <Section id="founders" className="py-16 md:py-24">
        <Container>
          <SectionHeading
            number={copy.founders.number}
            eyebrow={copy.founders.eyebrow}
            title={copy.founders.title}
            description={copy.founders.description}
          />

          <div className="mt-4 md:mt-6">
            {copy.founders.items.map((founder, index) => (
              <FounderProfile
                key={founder.id}
                founder={founder}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Why OPOPA exists */}
      <Section tone="white" className="border-y border-border py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionHeading
                number={copy.why.number}
                eyebrow={copy.why.eyebrow}
                title={copy.why.title}
              />
            </div>
            <div className="prose-editorial lg:col-span-6 lg:col-start-7">
              {copy.why.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Advisory + execution */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                number={copy.bridge.number}
                eyebrow={copy.bridge.eyebrow}
                title={copy.bridge.title}
              />
            </div>
            <div className="prose-editorial lg:col-span-6 lg:col-start-7">
              {copy.bridge.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-0 border-t border-border md:grid-cols-3">
            {copy.bridge.points.map((point, index) => (
              <article
                key={point.title}
                className={cn(
                  "border-b border-border px-8 py-8 md:border-b-0 md:py-10",
                  index < copy.bridge.points.length - 1 && "md:border-r",
                )}
              >
                <h3 className="text-xl tracking-[-0.02em]">{point.title}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-charcoal">
                  {point.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Eyebrow>{dict.nav.footer.services}</Eyebrow>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Button href={service.href} variant="tertiary" showArrow>
                    {service.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* What clients can expect */}
      <Section tone="white" className="border-y border-border py-16 md:py-24">
        <Container>
          <SectionHeading
            number={copy.expect.number}
            eyebrow={copy.expect.eyebrow}
            title={copy.expect.title}
            description={copy.expect.description}
          />

          <div className="mt-14 grid gap-0 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {copy.expect.items.map((item, index) => (
              <article
                key={item.title}
                className={cn(
                  "border-b border-border px-8 py-8 md:py-10",
                  index % 2 === 0 && "sm:max-lg:border-r",
                  index % 3 !== 2 && "lg:border-r",
                )}
              >
                <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 max-w-sm text-[1.0625rem] leading-relaxed text-charcoal">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Future-ready proof area */}
      <Section id="proof" className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                number={copy.proof.number}
                eyebrow={copy.proof.eyebrow}
                title={copy.proof.title}
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-charcoal md:text-xl">
                {copy.proof.body}
              </p>
              <Rule className="my-8" />
              <div
                className="mt-10 grid gap-4 border border-dashed border-border p-6 md:grid-cols-2 md:p-8"
                aria-hidden
              >
                <div className="aspect-video bg-concrete/60" />
                <div className="aspect-video bg-concrete/60" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
