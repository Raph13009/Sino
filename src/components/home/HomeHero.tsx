import Image from "next/image";
import { media } from "@/content/media";
import type { Dictionary } from "@/content/locales/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white-warm">
      <Image
        src={hero.src}
        alt={copy.imageAlt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/55 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40"
        aria-hidden
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-32 lg:justify-end lg:pb-28 lg:pt-36">
        <div className="max-w-[38rem] lg:max-w-[42rem]">
          <p className="eyebrow text-accent">{copy.eyebrow}</p>
          <h1 className="display-hero mt-5 text-white-warm">{copy.title}</h1>
          <div className="rule-accent mt-7" />
          <p className="mt-7 max-w-xl text-[1.125rem] leading-relaxed text-white-warm/90 md:text-[1.35rem]">
            {copy.rhythm}
          </p>
          <p className="mt-4 max-w-lg text-[1.0125rem] leading-relaxed text-white-warm/70 md:text-[1.0625rem]">
            {copy.description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={localePath(locale, "/contact")} variant="primaryOnDark">
              {copy.primaryCta}
            </Button>
            <Button
              href={localePath(locale, "/services")}
              variant="ghostOnDark"
            >
              {copy.secondaryCta}
            </Button>
          </div>
        </div>

        <p className="eyebrow mt-16 text-white-warm/45 md:mt-20">
          {copy.caption}
        </p>
      </Container>
    </section>
  );
}
