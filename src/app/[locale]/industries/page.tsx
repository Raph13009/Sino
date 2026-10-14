import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/layout/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
import { cn } from "@/lib/utils";

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
      <Section className="border-b border-border pt-16 pb-14 md:pt-24 md:pb-20">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: dict.industriesPage.eyebrow },
            ]}
          />
          <Eyebrow className="mt-10" accent>
            {dict.industriesPage.eyebrow}
          </Eyebrow>
          <h1 className="display-section mt-4 max-w-4xl">
            {dict.industriesPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal md:text-xl">
            {dict.industriesPage.description}
          </p>
        </Container>
      </Section>

      <Section className="pb-0">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <li key={industry.slug}>
              <Link
                href={industry.href}
                className={cn(
                  "group relative block min-h-[28rem] overflow-hidden bg-ink outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent md:min-h-[32rem]",
                )}
              >
                <Image
                  src={industry.image.src}
                  alt={industry.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  priority={index < 2}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="eyebrow text-white-warm/50">{industry.number}</p>
                  <h2 className="mt-3 text-[1.55rem] leading-tight tracking-[-0.02em] !text-white-warm transition-colors group-hover:!text-accent md:text-[1.75rem]">
                    {industry.name}
                  </h2>
                  <p className="mt-3 max-w-sm text-[0.975rem] leading-relaxed text-white-warm/70">
                    {industry.summary}
                  </p>
                  <span
                    aria-hidden
                    className="mt-5 inline-block text-white-warm/80 transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
