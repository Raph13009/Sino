import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Section } from "@/components/ui/Section";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import { unsubscribeNewsletter } from "@/lib/newsletter/actions";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  return createMetadata({
    title: dict.newsletter.unsubscribe.metaTitle,
    description: dict.newsletter.unsubscribe.metaDescription,
    path: "/newsletter/unsubscribe",
    locale,
    noIndex: true,
  });
}

export default async function NewsletterUnsubscribePage({
  params,
  searchParams,
}: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const { token } = await searchParams;
  const normalized = token?.trim() ?? "";

  let message = dict.newsletter.unsubscribe.missing;
  if (normalized) {
    const result = await unsubscribeNewsletter(normalized);
    if (result.ok) {
      message = result.already
        ? dict.newsletter.unsubscribe.already
        : dict.newsletter.unsubscribe.success;
    } else {
      message = dict.newsletter.unsubscribe.failed;
    }
  }

  return (
    <Section className="border-b border-border pt-16 pb-14 md:pt-24 md:pb-20">
      <Container>
        <Breadcrumbs
          label={dict.common.breadcrumb}
          items={[
            { label: dict.common.home, href: localePath(locale, "/") },
            { label: dict.newsletter.unsubscribe.title },
          ]}
        />
        <div className="mt-10 max-w-2xl">
          <p className="eyebrow text-accent">{dict.newsletter.eyebrow}</p>
          <h1 className="mt-4 text-3xl md:text-4xl">
            {dict.newsletter.unsubscribe.title}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-charcoal">
            {message}
          </p>
          <p className="mt-8 text-sm text-charcoal/70">
            {siteConfig.email}
          </p>
        </div>
      </Container>
    </Section>
  );
}
