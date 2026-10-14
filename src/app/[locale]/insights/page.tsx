import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/layout/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaImage } from "@/components/ui/MediaImage";
import {
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { CoverFallback } from "@/components/insights/ArticleContent";
import { getInsightSummaries } from "@/content/insights/load";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 180;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  return createMetadata({
    title: dict.insightsPage.meta.title,
    description: dict.insightsPage.meta.description,
    path: "/insights",
    locale,
  });
}

export default async function InsightsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const insights = await getInsightSummaries(locale);
  const featured = insights.find((insight) => insight.featured) ?? insights[0];
  const rest = insights.filter((insight) => insight.slug !== featured?.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: dict.common.home, path: "/" },
              { name: dict.insightsPage.eyebrow, path: "/insights" },
            ],
            locale,
          ),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: dict.insightsPage.meta.title,
            description: dict.insightsPage.meta.description,
            url: absoluteUrl(localePath(locale, "/insights")),
            inLanguage: locale === "zh" ? "zh-Hans" : "en",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: insights.map((insight, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(insight.href),
                name: insight.title,
              })),
            },
          },
        ]}
      />
      <Section className="border-b border-border pt-16 pb-14 md:pt-24 md:pb-20">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: dict.insightsPage.eyebrow },
            ]}
          />
          <Eyebrow className="mt-10" accent>
            {dict.insightsPage.eyebrow}
          </Eyebrow>
          <h1 className="display-section mt-4 max-w-4xl">
            {dict.insightsPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal md:text-xl">
            {dict.insightsPage.description}
          </p>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          {insights.length === 0 ? (
            <p className="max-w-xl text-lg leading-relaxed text-charcoal">
              {dict.insightsPage.empty}
            </p>
          ) : (
            <div>
              {featured ? (
                <article className="group mb-10 grid overflow-hidden border border-border bg-white-warm md:mb-14 md:grid-cols-12">
                  <Link
                    href={featured.href}
                    className="relative block min-h-[16rem] overflow-hidden bg-ink md:col-span-6 md:min-h-[22rem]"
                  >
                    {featured.image.fileId ? (
                      <MediaImage
                        src={featured.image.src}
                        alt={featured.image.alt}
                        width={featured.image.width}
                        height={featured.image.height}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        frameClassName="absolute inset-0 h-full w-full"
                        imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        className="absolute inset-0 h-full"
                        priority
                      />
                    ) : (
                      <CoverFallback alt={featured.title} />
                    )}
                  </Link>
                  <div className="flex flex-col justify-center p-7 md:col-span-6 md:p-10 lg:p-12">
                    <p className="eyebrow">
                      {featured.featured
                        ? `${dict.insightsPage.featured} · ${featured.category}`
                        : featured.category}{" "}
                      · {featured.date}
                    </p>
                    <h2 className="mt-4 text-[1.875rem] leading-tight tracking-[-0.03em] md:text-[2.35rem]">
                      <Link
                        href={featured.href}
                        className="transition-colors hover:text-accent"
                      >
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-charcoal">
                      {featured.excerpt}
                    </p>
                    {featured.author ? (
                      <p className="mt-6 text-[0.8125rem] uppercase tracking-[0.08em] text-charcoal">
                        {featured.author}
                      </p>
                    ) : null}
                  </div>
                </article>
              ) : null}

              {rest.map((insight) => (
                <article
                  key={insight.slug}
                  className="grid gap-8 border-b border-border py-10 md:grid-cols-12 md:py-12"
                >
                  <div className="md:col-span-4">
                    {insight.image.fileId ? (
                      <MediaImage
                        src={insight.image.src}
                        alt={insight.image.alt}
                        width={insight.image.width}
                        height={insight.image.height}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        frameClassName="aspect-[4/3]"
                      />
                    ) : (
                      <CoverFallback alt={insight.title} />
                    )}
                  </div>
                  <div className="md:col-span-7 md:col-start-6">
                    <p className="eyebrow">
                      {insight.category} ·{" "}
                      <time dateTime={insight.date}>{insight.date}</time>
                    </p>
                    <h2 className="mt-3 text-[1.75rem] leading-tight md:text-[2rem]">
                      <Link
                        href={insight.href}
                        className="transition-colors hover:text-accent"
                      >
                        {insight.title}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-charcoal">
                      {insight.excerpt}
                    </p>
                    {insight.author ? (
                      <p className="mt-4 text-[0.8125rem] uppercase tracking-[0.08em] text-charcoal">
                        {insight.author}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
