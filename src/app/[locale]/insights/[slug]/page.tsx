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
import {
  assertInsightLocalesAligned,
  getInsightBySlug,
  getInsightSlugs,
} from "@/content/insights/load";
import { renderInsightMdx } from "@/content/insights/render";
import { getDictionary } from "@/content/locales";
import { getIndustry, getService } from "@/content/localized";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createMetadata,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  assertInsightLocalesAligned();
  return getInsightSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const insight = getInsightBySlug(locale, slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.seoTitle,
    description: insight.description,
    path: `/insights/${slug}`,
    locale,
    ogImage: insight.image.src,
    type: "article",
    publishedTime: insight.date,
    modifiedTime: insight.updatedAt,
    authors: [insight.author],
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const insight = getInsightBySlug(locale, slug);
  if (!insight) notFound();

  const content = await renderInsightMdx(insight.body);

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
              description: insight.description,
              path: `/insights/${slug}`,
              datePublished: insight.date,
              dateModified: insight.updatedAt,
              author: insight.author,
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
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] uppercase tracking-[0.08em] text-charcoal">
              <p>
                {dict.common.published} {insight.date}
              </p>
              <p>{insight.author}</p>
              {insight.updatedAt !== insight.date ? (
                <p>
                  {dict.common.updated} {insight.updatedAt}
                </p>
              ) : null}
            </div>
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
          <div className="prose-editorial mx-auto max-w-3xl">{content}</div>

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
