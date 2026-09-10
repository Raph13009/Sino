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
import { getInsightSummaries } from "@/content/insights/load";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-static";

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
  const insights = getInsightSummaries(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.insightsPage.eyebrow, path: "/insights" },
          ],
          locale,
        )}
      />
      <Section className="border-b border-border py-14 md:py-20">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: dict.insightsPage.eyebrow },
            ]}
          />
          <Eyebrow className="mt-8" accent>
            {dict.insightsPage.eyebrow}
          </Eyebrow>
          <h1 className="mt-4 max-w-4xl text-[2.75rem] leading-[1.04] md:text-[4rem]">
            {dict.insightsPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal md:text-xl">
            {dict.insightsPage.description}
          </p>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="border-t border-border">
            {insights.map((insight) => (
              <article
                key={insight.slug}
                className="grid gap-8 border-b border-border py-10 md:grid-cols-12 md:py-12"
              >
                <div className="md:col-span-4">
                  <MediaImage
                    src={insight.image.src}
                    alt={insight.image.alt}
                    width={insight.image.width}
                    height={insight.image.height}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    frameClassName="aspect-[4/3]"
                  />
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="eyebrow">
                    {insight.category} · {insight.readingTime}
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
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
