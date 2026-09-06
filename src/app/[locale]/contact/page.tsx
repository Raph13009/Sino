import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  return createMetadata({
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.contact.eyebrow, path: "/contact" },
          ],
          locale,
        )}
      />
      <Section className="border-b border-border py-14 md:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: dict.contact.eyebrow },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow accent>{dict.contact.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-[2.5rem] leading-[1.04] md:text-[3.5rem]">
                {dict.contact.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-charcoal">
                {dict.contact.description}
              </p>
              <div className="mt-10 border-t border-border pt-8">
                <p className="eyebrow">{dict.contact.direct}</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-3 block text-lg hover:text-accent"
                >
                  {siteConfig.email}
                </a>
                <a
                  href={siteConfig.linkedIn}
                  className="mt-3 block text-lg hover:text-accent"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {dict.contact.linkedIn}
                </a>
              </div>
            </div>
            <div className="relative lg:col-span-6 lg:col-start-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
