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
import { getDictionary } from "@/content/locales";
import { getIndustries } from "@/content/localized";
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
    title: dict.industriesPage.meta.title,
    description: dict.industriesPage.meta.description,
    path: "/industries",
    locale,
  });
}

export default async function IndustriesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const industries = getIndustries(locale, dict);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.industriesPage.eyebrow, path: "/industries" },
          ],
          locale,
        )}
      />
      <Section className="border-b border-border py-14 md:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: dict.industriesPage.eyebrow },
            ]}
          />
          <Eyebrow className="mt-8" accent>
            {dict.industriesPage.eyebrow}
          </Eyebrow>
          <h1 className="mt-4 max-w-4xl text-[2.75rem] leading-[1.04] md:text-[4rem]">
            {dict.industriesPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal md:text-xl">
            {dict.industriesPage.description}
          </p>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={industry.href}
                className="group block border-t border-border pt-6"
              >
                <MediaImage
                  src={industry.image.src}
                  alt={industry.image.alt}
                  width={industry.image.width}
                  height={industry.image.height}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  frameClassName="aspect-[16/10]"
                  imageClassName="transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <p className="eyebrow mt-5">{industry.number}</p>
                <h2 className="mt-2 text-[1.75rem] transition-colors group-hover:text-accent">
                  {industry.name}
                </h2>
                <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-charcoal">
                  {industry.summary}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
