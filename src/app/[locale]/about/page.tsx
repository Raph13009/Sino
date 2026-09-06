import type { Metadata } from "next";
import { FinalCta } from "@/components/layout/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaImage } from "@/components/ui/MediaImage";
import {
  Container,
  Eyebrow,
  Rule,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { getDictionary } from "@/content/locales";
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
    title: dict.about.meta.title,
    description: dict.about.meta.description,
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const image = media.about.main;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.common.home, path: "/" },
            { name: dict.about.eyebrow, path: "/about" },
          ],
          locale,
        )}
      />
      <Section className="border-b border-border py-14 md:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: dict.about.eyebrow },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow accent>{dict.about.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-[2.5rem] leading-[1.04] md:text-[3.75rem]">
                {dict.about.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-charcoal md:text-xl">
                {dict.about.lead}
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <MediaImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                frameClassName="aspect-[4/5]"
                caption={dict.about.caption}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>{dict.about.whatWeDo.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] md:text-[2.25rem]">
                {dict.about.whatWeDo.title}
              </h2>
            </div>
            <div className="prose-editorial lg:col-span-6 lg:col-start-7">
              {dict.about.whatWeDo.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <Rule className="my-16" />

          <div className="grid gap-8 md:grid-cols-3">
            {dict.about.pillars.map((item) => (
              <article key={item.title} className="border-t border-border pt-5">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-charcoal">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
