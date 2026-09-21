import type { Dictionary } from "@/content/locales/types";
import { getServices } from "@/content/localized";
import {
  CardArrowIcon,
  OpopaBrandField,
  ServiceIcon,
} from "@/components/home/serviceMarks";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { type Locale } from "@/i18n/config";
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
    <Section className="border-b border-border py-14 md:py-20">
      <Container>
        <Eyebrow className="mb-4">
          {copy.number} / {copy.eyebrow}
        </Eyebrow>
        <h2 className="text-[1.75rem] leading-tight md:text-[2.25rem]">
          {copy.title}
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="group relative flex min-h-[20.5rem] cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-white-warm p-6 pt-7 no-underline transition-colors duration-300 md:min-h-[22rem] md:p-7 hover:border-accent hover:bg-accent active:border-accent active:bg-accent"
            >
              <OpopaBrandField />

              <h3 className="relative z-10 min-h-[2.6em] max-w-[16ch] text-[1.25rem] leading-tight tracking-[-0.02em] text-ink transition-colors duration-300 md:text-[1.3125rem] group-hover:text-white-warm group-active:text-white-warm">
                {service.name}
              </h3>
              <p className="relative z-10 mt-3 mb-14 max-w-[26ch] line-clamp-3 text-[0.9375rem] leading-relaxed text-charcoal transition-colors duration-300 md:mb-16 group-hover:text-white-warm group-active:text-white-warm">
                {service.megaDescription}
              </p>

              <span className="absolute bottom-[30%] left-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white-warm transition-colors duration-300 md:left-7 group-hover:bg-white-warm group-hover:text-accent group-active:bg-white-warm group-active:text-accent">
                <CardArrowIcon />
              </span>

              <ServiceIcon
                slug={service.slug}
                className="absolute right-7 bottom-7 z-10 text-white-warm"
              />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
