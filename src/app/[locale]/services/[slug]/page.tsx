import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/layout/FinalCta";
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
import { serviceSlugs } from "@/content/catalog";
import { getDictionary } from "@/content/locales";
import { getService, getServices } from "@/content/localized";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import {
  breadcrumbJsonLd,
  createMetadata,
  serviceJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const service = getService(locale, dict, slug);
  if (!service) return {};
  return createMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${slug}`,
    locale,
    ogImage: service.image.src,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const service = getService(locale, dict, slug);
  if (!service) notFound();

  const related = getServices(locale, dict).filter(
    (item) => item.slug !== service.slug,
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.servicesPage.eyebrow, path: "/services" },
              { name: service.name, path: `/services/${slug}` },
            ],
            locale,
          ),
          serviceJsonLd(
            {
              name: service.name,
              description: service.summary,
              path: `/services/${slug}`,
            },
            locale,
          ),
        ]}
      />

      <Section className="border-b border-border py-14 md:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              {
                label: dict.servicesPage.eyebrow,
                href: localePath(locale, "/services"),
              },
              { label: service.name },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow accent>
                {service.number} / {dict.servicesPage.detailEyebrowSuffix}
              </Eyebrow>
              <h1 className="mt-4 text-[2.5rem] leading-[1.04] md:text-[3.75rem]">
                {service.name}
              </h1>
              <p className="mt-5 text-xl text-accent md:text-2xl">
                {service.positioning}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal">
                {service.summary}
              </p>
              <div className="mt-8">
                <Button href={localePath(locale, "/contact")}>
                  {dict.common.primaryCta}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <MediaImage
                src={service.image.src}
                alt={service.image.alt}
                width={service.image.width}
                height={service.image.height}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                frameClassName="aspect-[4/3]"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{dict.common.purpose}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] md:text-[2.25rem]">
                {service.purpose}
              </h2>
              <Rule tone="accent" className="mt-8" />
              <p className="mt-6 text-lg leading-relaxed text-charcoal">
                <span className="font-medium text-ink">
                  {dict.common.clientProblem}{" "}
                </span>
                {service.clientProblem}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>{dict.common.typicalScope}</Eyebrow>
              <ul className="mt-6 border-t border-border">
                {service.scope.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-border py-4 text-[1.0625rem] text-charcoal"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="concrete" className="py-16 md:py-20">
        <Container>
          <Eyebrow>{dict.common.relatedExpertise}</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="border-t border-border pt-5">
                <p className="eyebrow">{item.number}</p>
                <h3 className="mt-3 text-xl">
                  <Link href={item.href} className="hover:text-accent">
                    {item.name}
                  </Link>
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal">
                  {item.positioning}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
