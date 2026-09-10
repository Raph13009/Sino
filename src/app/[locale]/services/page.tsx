import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/layout/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import {
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/content/locales";
import { getServices } from "@/content/localized";
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
  const services = getServices(locale, dict);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.servicesPage.eyebrow, path: "/services" },
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
              { label: dict.servicesPage.eyebrow },
            ]}
          />
          <Eyebrow className="mt-8" accent>
            {dict.servicesPage.eyebrow}
          </Eyebrow>
          <h1 className="mt-4 max-w-4xl text-[2.75rem] leading-[1.04] md:text-[4rem]">
            {dict.servicesPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal md:text-xl">
            {dict.servicesPage.description}
          </p>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="border-t border-border">
            {services.map((service) => (
              <article
                key={service.slug}
                className="grid gap-6 border-b border-border py-10 md:grid-cols-12 md:py-14"
              >
                <div className="md:col-span-2">
                  <p className="eyebrow">{service.number}</p>
                </div>
                <div className="md:col-span-4">
                  <h2 className="text-[1.75rem] leading-tight md:text-[2rem]">
                    <Link
                      href={service.href}
                      className="transition-colors hover:text-accent"
                    >
                      {service.name}
                    </Link>
                  </h2>
                  <p className="mt-3 text-accent">{service.positioning}</p>
                </div>
                <div className="md:col-span-5 md:col-start-8">
                  <p className="text-[1.0625rem] leading-relaxed text-charcoal">
                    {service.summary}
                  </p>
                  <Button href={service.href} variant="tertiary" className="mt-5">
                    {dict.common.learnMore}
                  </Button>
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
