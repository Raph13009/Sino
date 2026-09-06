import type { Dictionary } from "@/content/locales/types";
import { getServices } from "@/content/localized";
import { Button } from "@/components/ui/Button";
import {
  Container,
  Rule,
  Section,
  SectionHeading,
} from "@/components/ui/Section";
import { localePath, type Locale } from "@/i18n/config";
import Link from "next/link";

export function HomeServices({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const services = getServices(locale, dict);
  const copy = dict.home.services;

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          number={copy.number}
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-14 border-t border-border">
          {services.map((service) => (
            <article
              key={service.slug}
              className="grid gap-4 border-b border-border py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10"
            >
              <p className="eyebrow md:col-span-2">{service.number}</p>
              <div className="md:col-span-4">
                <h3 className="text-2xl leading-tight md:text-[1.75rem]">
                  <Link
                    href={service.href}
                    className="transition-colors hover:text-accent"
                  >
                    {service.name}
                  </Link>
                </h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-[1.0625rem] leading-relaxed text-charcoal">
                  {service.summary}
                </p>
                <Button href={service.href} variant="tertiary" className="mt-4">
                  {dict.common.learnMore}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Rule tone="accent" />
          <Button
            href={localePath(locale, "/services")}
            variant="tertiary"
            className="mt-6"
          >
            {dict.common.viewAllExpertise}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
