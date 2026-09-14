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
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ArticleBody,
  ArticleCta,
  CoverFallback,
} from "@/components/insights/ArticleContent";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import {
  getInsightBySlug,
  getRelatedInsights,
  getTranslation,
} from "@/lib/insights/service";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createMetadata,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 180;
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const insight = await getInsightBySlug(locale, slug);
  if (!insight) {
    return { robots: { index: false, follow: false } };
  }

  const en =
    locale === "en"
      ? insight
      : await getTranslation(insight, "en");
  const zh =
    locale === "zh"
      ? insight
      : await getTranslation(insight, "zh");

  const languagePaths: { en?: string; zh?: string } = {};
  if (en) languagePaths.en = `/insights/${en.slug}`;
  if (zh) languagePaths.zh = `/insights/${zh.slug}`;

  return createMetadata({
    title: insight.seoTitle,
    description: insight.description,
    path: `/insights/${slug}`,
    locale,
    ogImage: insight.image.src,
    ogImageAlt: insight.image.alt,
    type: "article",
    publishedTime: insight.date,
    modifiedTime: insight.updatedAt,
    authors: [insight.author],
    languagePaths,
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const insight = await getInsightBySlug(locale, slug);
  if (!insight) notFound();

  const related = await getRelatedInsights(locale, insight);

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

      <article>
        <Section className="border-b border-border py-14 md:py-20">
          <Container>
            <header>
              <Breadcrumbs
                label={dict.common.breadcrumb}
                items={[
                  { label: dict.common.home, href: localePath(locale, "/") },
                  {
                    label: dict.insightsPage.eyebrow,
                    href: localePath(locale, "/insights"),
                  },
                  { label: insight.title },
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
                    {dict.common.published}{" "}
                    <time dateTime={insight.date}>{insight.date}</time>
                  </p>
                  <p>{insight.author}</p>
                  {insight.updatedAt !== insight.date ? (
                    <p>
                      {dict.common.updated}{" "}
                      <time dateTime={insight.updatedAt}>{insight.updatedAt}</time>
                    </p>
                  ) : null}
                </div>
              </div>
            </header>
          </Container>
        </Section>

        <Section className="py-12 md:py-16">
          <Container>
            {insight.image.fileId ? (
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
            ) : (
              <div className="mx-auto max-w-4xl">
                <CoverFallback alt={insight.title} />
              </div>
            )}
          </Container>
        </Section>

        <Section className="pb-16 md:pb-24">
          <Container>
            <ArticleBody
              blocks={insight.body.blocks}
              className="prose-editorial mx-auto max-w-3xl"
            />

            <div className="mx-auto max-w-3xl">
              <ArticleCta
                eyebrow={dict.insightsPage.articleCtaEyebrow}
                title={dict.insightsPage.articleCtaTitle}
                description={dict.insightsPage.articleCtaDescription}
                action={
                  <Button href={localePath(locale, "/contact")} variant="tertiary">
                    {dict.insightsPage.articleCtaLabel}
                  </Button>
                }
              />
            </div>

            {related.length > 0 ? (
              <nav
                aria-label={dict.insightsPage.relatedArticles}
                className="mx-auto mt-16 max-w-3xl border-t border-border pt-10"
              >
                <Eyebrow>{dict.insightsPage.relatedArticles}</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.href}
                        className="font-medium hover:text-accent"
                      >
                        {item.title} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </Container>
        </Section>
      </article>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
