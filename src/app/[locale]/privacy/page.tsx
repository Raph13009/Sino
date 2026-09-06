import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Section } from "@/components/ui/Section";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams, localePath } from "@/i18n/config";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  return createMetadata({
    title: dict.privacy.meta.title,
    description: dict.privacy.meta.description,
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);

  return (
    <Section className="border-b border-border py-14 md:py-20">
      <Container>
        <Breadcrumbs
          items={[
            { label: dict.common.home, href: localePath(locale, "/") },
            { label: dict.privacy.title },
          ]}
        />
        <div className="mt-10">
          <LegalDoc
            eyebrow={dict.privacy.eyebrow}
            title={dict.privacy.title}
            lastUpdated={dict.privacy.lastUpdated}
            noticeEyebrow={dict.privacy.noticeEyebrow}
            noticeBody={dict.privacy.noticeBody}
            sections={dict.privacy.sections}
            email={siteConfig.email}
          />
        </div>
      </Container>
    </Section>
  );
}
