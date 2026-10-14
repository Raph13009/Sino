import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/locales/types";
import { media } from "@/content/media";
import { getHomePillars } from "@/content/localized";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { localePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const pillarMedia = {
  access: media.services.marketEntry,
  support: media.services.afterSalesFieldService,
} as const;

export function HomeServices({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pillars = getHomePillars(locale, dict);
  const copy = dict.home.services;

  return (
    <Section className="border-b border-border py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow-accent mb-5">
            {copy.number} / {copy.eyebrow}
          </p>
          <h2 className="display-section max-w-3xl">{copy.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal">
            {copy.description}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:mt-16 md:gap-6 lg:grid-cols-2 lg:gap-7">
          {pillars.map((pillar, index) => {
            const image = pillarMedia[pillar.id as keyof typeof pillarMedia];
            return (
              <li key={pillar.id}>
                <Reveal delayMs={index * 90}>
                  <Link
                    href={pillar.href}
                    className={cn(
                      "group relative flex min-h-[28rem] flex-col overflow-hidden bg-ink text-white-warm",
                      "outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent",
                      "md:min-h-[32rem]",
                    )}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
                        aria-hidden
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25 transition-opacity duration-500 group-hover:via-ink/75"
                        aria-hidden
                      />
                      <div
                        className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10"
                        aria-hidden
                      />
                    </div>

                    <div className="relative flex h-full flex-1 flex-col justify-end p-7 md:p-9 lg:p-10">
                      <p className="eyebrow text-white-warm/55">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-4 max-w-[14ch] text-[2.15rem] leading-[1.02] tracking-[-0.03em] !text-white-warm md:text-[2.65rem] lg:text-[2.85rem]">
                        {pillar.title}
                      </h3>
                      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white-warm/75 md:text-lg">
                        {pillar.description}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-3 text-[0.875rem] font-medium tracking-[0.06em] text-white-warm uppercase">
                        <span className="border-b border-white-warm/40 pb-0.5 transition-colors group-hover:border-accent group-hover:text-accent">
                          {pillar.cta}
                        </span>
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal>
          <Link
            href={localePath(locale, "/services")}
            className="mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent"
          >
            <span>{copy.exploreAll}</span>
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
