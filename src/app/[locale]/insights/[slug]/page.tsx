import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/layout/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaImage } from "@/components/ui/MediaImage";
import {
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { insightSlugs } from "@/content/catalog";
import { getDictionary } from "@/content/locales";
import {
  getIndustry,
  getInsight,
  getService,
} from "@/content/localized";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createMetadata,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return insightSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const insight = getInsight(locale, dict, slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.seoTitle,
    description: insight.seoDescription,
    path: `/insights/${slug}`,
    locale,
    ogImage: insight.image.src,
    type: "article",
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const insight = getInsight(locale, dict, slug);
  if (!insight) notFound();

  const relatedServices = insight.relatedServices
    .map((item) => getService(locale, dict, item))
    .filter(Boolean);
  const relatedIndustries = insight.relatedIndustries
    .map((item) => getIndustry(locale, dict, item))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.insightsPage.eyebrow, path: "/insights" },
              { name: insight.title, path: `/insights/${slug}` },
            ],
            locale,
          ),
          articleJsonLd(
            {
              title: insight.title,
              description: insight.excerpt,
              path: `/insights/${slug}`,
              datePublished: insight.date,
              image: insight.image.src,
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
                label: dict.insightsPage.eyebrow,
                href: localePath(locale, "/insights"),
              },
              { label: insight.category },
            ]}
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <Eyebrow accent>
              {insight.category} · {insight.readingTime}
            </Eyebrow>
            <h1 className="mt-4 text-[2.25rem] leading-[1.08] md:text-[3.25rem]">
              {insight.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal">
              {insight.excerpt}
            </p>
            <p className="eyebrow mt-8 text-charcoal">
              {dict.common.published} {insight.date}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-12 md:py-16">
        <Container>
          <MediaImage
            src={insight.image.src}
            alt={insight.image.alt}
            width={insight.image.width}
            height={insight.image.height}
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="mx-auto max-w-4xl"
            frameClassName="aspect-[16/9]"
          />
        </Container>
      </Section>

      <Section className="pb-16 md:pb-24">
        <Container>
          <div className="prose-editorial mx-auto">
            {insight.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl gap-10 border-t border-border pt-10 md:grid-cols-2">
            <div>
              <Eyebrow>{dict.common.relatedExpertise}</Eyebrow>
              <ul className="mt-4 space-y-3">
                {relatedServices.map((service) =>
                  service ? (
                    <li key={service.slug}>
                      <Link
                        href={service.href}
                        className="font-medium hover:text-accent"
                      >
                        {service.name} →
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
            <div>
              <Eyebrow>{dict.common.relatedIndustries}</Eyebrow>
              <ul className="mt-4 space-y-3">
                {relatedIndustries.map((industry) =>
                  industry ? (
                    <li key={industry.slug}>
                      <Link
                        href={industry.href}
                        className="font-medium hover:text-accent"
                      >
                        {industry.name} →
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
