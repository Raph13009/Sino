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
    title: dict.legal.meta.title,
    description: dict.legal.meta.description,
    path: "/legal",
    locale,
    noIndex: true,
  });
}

export default async function LegalPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);

  return (
    <Section className="py-14 md:py-20">
      <Container>
        <Eyebrow>{dict.legal.eyebrow}</Eyebrow>
        <h1 className="mt-4 text-[2.5rem]">{dict.legal.title}</h1>

        <aside className="mt-8 border border-border bg-concrete px-5 py-4 text-[0.9375rem] leading-relaxed text-charcoal">
          <p className="eyebrow text-accent">{dict.legal.todoEyebrow}</p>
          <p className="mt-3">{dict.legal.todoBody}</p>
        </aside>

        <div className="prose-editorial mt-10 space-y-4">
          {dict.legal.body.map((paragraph, index) =>
            index === dict.legal.body.length - 1 ? (
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
