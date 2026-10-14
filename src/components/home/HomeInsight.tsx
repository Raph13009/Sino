import Link from "next/link";
import type { Dictionary } from "@/content/locales/types";
import { getInsightSummaries } from "@/content/insights/load";
import { CoverFallback } from "@/components/insights/ArticleContent";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";

export async function HomeInsight({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const insights = await getInsightSummaries(locale);
  const featured = insights.find((insight) => insight.featured) ?? insights[0];
  const copy = dict.home.insight;

  if (!featured) return null;

  return (
    <Section className="border-b border-border py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow-accent mb-5">
            {copy.number} / {copy.eyebrow}
          </p>
          <h2 className="display-section max-w-3xl">{copy.title}</h2>
        </Reveal>

        <Reveal delayMs={100}>
          <article className="group mt-14 grid items-stretch gap-0 overflow-hidden rounded-card border border-border lg:mt-16 lg:grid-cols-12">
            <Link
              href={featured.href}
              className="relative block min-h-[18rem] overflow-hidden bg-ink lg:col-span-7 lg:min-h-[26rem]"
            >
              {featured.image.fileId ? (
                <MediaImage
                  src={featured.image.src}
                  alt={featured.image.alt}
                  width={featured.image.width}
                  height={featured.image.height}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  frameClassName="absolute inset-0 h-full w-full"
                  imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  className="absolute inset-0 h-full"
                />
              ) : (
                <CoverFallback alt={featured.title} />
              )}
            </Link>
            <div className="flex flex-col justify-center border-t border-border bg-white-warm p-8 md:p-10 lg:col-span-5 lg:border-t-0 lg:border-l">
              <p className="eyebrow">
                {featured.category} · {featured.readingTime}
              </p>
              <h3 className="mt-5 text-[1.85rem] leading-[1.1] tracking-[-0.03em] md:text-[2.25rem]">
                <Link
                  href={featured.href}
                  className="transition-colors hover:text-accent"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-charcoal">
                {featured.excerpt}
              </p>
              <Button href={featured.href} variant="tertiary" className="mt-8">
                {copy.readCta}
              </Button>
            </div>
          </article>
        </Reveal>
      </Container>
    </Section>
  );
}
