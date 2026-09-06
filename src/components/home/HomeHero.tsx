import { media } from "@/content/media";
import type { Dictionary } from "@/content/locales/types";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { localePath, type Locale } from "@/i18n/config";

export function HomeHero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const hero = media.home.hero;
  const copy = dict.home.hero;

  return (
    <section className="border-b border-border bg-ivory">
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-8 md:min-h-[calc(100svh-5rem)] md:py-10 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-0 lg:gap-y-0">
          <div className="lg:col-span-5">
            <Eyebrow accent>{copy.eyebrow}</Eyebrow>
            <h1 className="mt-3 max-w-[18ch] text-[clamp(2.25rem,1rem+3.2vw,4.125rem)] leading-[1.05] tracking-[-0.025em] md:mt-4 md:max-w-none">
              {copy.title}
            </h1>
            <Rule tone="accent" className="mt-5 md:mt-6" />
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-charcoal md:mt-6 md:text-lg">
              {copy.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-7 md:gap-4">
              <Button href={localePath(locale, "/contact")}>
                {copy.primaryCta}
              </Button>
              <Button href={localePath(locale, "/services")} variant="tertiary">
                {copy.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <MediaImage
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              frameClassName="aspect-[4/3] max-h-[min(48svh,28rem)] w-full lg:max-h-[min(56svh,32rem)]"
              caption={copy.caption}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
