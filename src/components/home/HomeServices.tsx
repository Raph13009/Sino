import type { Dictionary } from "@/content/locales/types";
import { getHomeServiceCards } from "@/content/localized";
import {
  CardArrowIcon,
  OpopaBrandField,
  ServiceIcon,
} from "@/components/home/serviceMarks";
import {
  HomeServicesCarousel,
  type HomeServiceItem,
} from "@/components/home/HomeServicesCarousel";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { localePath, type Locale } from "@/i18n/config";
import Link from "next/link";

function ServiceCardLink({ service }: { service: HomeServiceItem }) {
  return (
    <Link
      href={service.href}
      className="group relative flex h-full min-h-[22rem] cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-white-warm p-7 no-underline transition-colors duration-300 hover:border-accent hover:bg-accent focus-visible:outline-offset-2 active:border-accent active:bg-accent"
      style={{ containerType: "inline-size" }}
    >
      <OpopaBrandField />

      <h3 className="relative z-10 text-[1.3125rem] leading-snug tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-white-warm group-active:text-white-warm">
        {service.name}
      </h3>
      <p className="relative z-10 mt-3 text-[0.9375rem] leading-relaxed text-charcoal transition-colors duration-300 group-hover:text-white-warm group-active:text-white-warm">
        {service.description}
      </p>

      <div className="relative z-20 mt-auto pt-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white-warm transition-colors duration-300 group-hover:bg-white-warm group-hover:text-accent group-active:bg-white-warm group-active:text-accent">
          <CardArrowIcon />
        </span>
      </div>

      <ServiceIcon
        slug={service.slug}
        className="absolute right-7 bottom-7 z-10 text-white-warm"
      />
    </Link>
  );
}

export function HomeServices({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const services = getHomeServiceCards(locale, dict);
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

        <HomeServicesCarousel
          services={services}
          prevLabel={copy.previous}
          nextLabel={copy.next}
        />

        <div className="mt-8 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((service) => (
            <ServiceCardLink key={service.slug} service={service} />
          ))}
        </div>

        <Link
          href={localePath(locale, "/services")}
          className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent"
        >
          <span>{copy.exploreAll}</span>
          <span aria-hidden>→</span>
        </Link>
      </Container>
    </Section>
  );
}
