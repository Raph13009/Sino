import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/locales/types";
import { getIndustries } from "@/content/localized";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { localePath, type Locale } from "@/i18n/config";

export function HomeIndustries({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const industries = getIndustries(locale, dict);
  const copy = dict.home.industries;

  return (
    <Section tone="ink" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow text-accent mb-5">
                {copy.number} / {copy.eyebrow}
              </p>
              <h2 className="display-section !text-white-warm">{copy.title}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white-warm/65">
                {copy.description}
              </p>
            </div>
            <Button
              href={localePath(locale, "/industries")}
              variant="ghostOnDark"
              className="shrink-0"
            >
              {copy.viewAll}
            </Button>
          </div>
        </Reveal>
      </Container>

      <div className="mt-14 grid sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {industries.map((industry, index) => (
          <Reveal key={industry.slug} delayMs={index * 80}>
            <Link
              href={industry.href}
              className="group relative block aspect-[4/5] overflow-hidden"
            >
              <Image
                src={industry.image.src}
                alt={industry.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="eyebrow text-white-warm/55">{industry.number}</p>
                <h3 className="mt-2 text-[1.35rem] tracking-[-0.02em] !text-white-warm transition-colors group-hover:!text-accent md:text-[1.5rem]">
                  {industry.name}
                </h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
