import type { Metadata } from "next";
import {
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/Section";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams } from "@/i18n/config";
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
    noIndex: true,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);

  return (
    <Section className="py-14 md:py-20">
      <Container>
        <Eyebrow>{dict.privacy.eyebrow}</Eyebrow>
        <h1 className="mt-4 text-[2.5rem]">{dict.privacy.title}</h1>

        <aside className="mt-8 border border-border bg-concrete px-5 py-4 text-[0.9375rem] leading-relaxed text-charcoal">
          <p className="eyebrow text-accent">{dict.privacy.todoEyebrow}</p>
          <p className="mt-3">{dict.privacy.todoBody}</p>
        </aside>

        <div className="prose-editorial mt-10">
          {dict.privacy.paragraphs.map((paragraph, index) =>
            index === dict.privacy.paragraphs.length - 1 ? (
              <p key={paragraph}>
                {paragraph}{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
            ) : (
              <p key={paragraph}>{paragraph}</p>
            ),
          )}
        </div>
      </Container>
    </Section>
  );
}
