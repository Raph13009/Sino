import Link from "next/link";
import type { Dictionary } from "@/content/locales/types";
import { getInsights } from "@/content/localized";
import { MediaImage } from "@/components/ui/MediaImage";
import { Button } from "@/components/ui/Button";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";

export function HomeInsight({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const featured = getInsights(locale, dict)[0];
  const copy = dict.home.insight;

  return (
    <Section tone="white" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          number={copy.number}
          eyebrow={copy.eyebrow}
          title={copy.title}
        />

        <article className="mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MediaImage
              src={featured.image.src}
              alt={featured.image.alt}
              width={featured.image.width}
              height={featured.image.height}
              sizes="(max-width: 1024px) 100vw, 40vw"
              frameClassName="aspect-[4/3]"
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">
              {featured.category} · {featured.readingTime}
            </p>
            <h3 className="mt-4 text-[1.75rem] leading-tight md:text-[2.25rem]">
              <Link
                href={featured.href}
                className="transition-colors hover:text-accent"
              >
                {featured.title}
              </Link>
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-charcoal">
              {featured.excerpt}
            </p>
            <Button href={featured.href} variant="tertiary" className="mt-6">
              {copy.readCta}
            </Button>
          </div>
        </article>
      </Container>
    </Section>
  );
}
