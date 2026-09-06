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
import { industrySlugs } from "@/content/catalog";
import { getDictionary } from "@/content/locales";
import { getIndustry, getServices } from "@/content/localized";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const industry = getIndustry(locale, dict, slug);
  if (!industry) return {};
  return createMetadata({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/industries/${slug}`,
    locale,
    ogImage: industry.image.src,
  });
}

export default async function IndustryPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const industry = getIndustry(locale, dict, slug);
  if (!industry) notFound();

  const services = getServices(locale, dict);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.industriesPage.eyebrow, path: "/industries" },
            { name: industry.name, path: `/industries/${slug}` },
          ],
          locale,
        )}
      />

      <Section className="border-b border-border py-14 md:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              {
                label: dict.industriesPage.eyebrow,
                href: localePath(locale, "/industries"),
              },
              { label: industry.name },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow accent>
                {industry.number} / {dict.industriesPage.detailEyebrowSuffix}
              </Eyebrow>
              <h1 className="mt-4 text-[2.5rem] leading-[1.04] md:text-[3.75rem]">
                {industry.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal">
                {industry.description}
              </p>
              <Button href={localePath(locale, "/contact")} className="mt-8">
                {dict.common.primaryCta}
              </Button>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <MediaImage
                src={industry.image.src}
                alt={industry.image.alt}
                width={industry.image.width}
                height={industry.image.height}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                frameClassName="aspect-[4/5]"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{dict.common.focusAreas}</Eyebrow>
              <ul className="mt-6 border-t border-border">
                {industry.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="border-b border-border py-4 text-[1.0625rem] text-charcoal"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>{dict.common.howWeHelp}</Eyebrow>
              <p className="mt-4 text-lg leading-relaxed text-charcoal">
                {dict.industriesPage.howWeHelpBody}
              </p>
              <ul className="mt-8 space-y-4">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={service.href}
                      className="text-[1.0625rem] font-medium transition-colors hover:text-accent"
                    >
                      {service.number} — {service.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
