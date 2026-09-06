import Link from "next/link";
import type { Dictionary } from "@/content/locales/types";
import { getIndustries } from "@/content/localized";
import { MediaImage } from "@/components/ui/MediaImage";
import { Button } from "@/components/ui/Button";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Section";
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
    <Section tone="concrete" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            number={copy.number}
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
          <Button
            href={localePath(locale, "/industries")}
            variant="secondary"
            className="shrink-0"
          >
            {copy.viewAll}
          </Button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <Link key={industry.slug} href={industry.href} className="group block">
              <MediaImage
                src={industry.image.src}
                alt={industry.image.alt}
                width={industry.image.width}
                height={industry.image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                frameClassName="aspect-[4/5]"
                imageClassName="transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <p className="eyebrow mt-4">{industry.number}</p>
              <h3 className="mt-2 text-xl transition-colors group-hover:text-accent">
                {industry.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
