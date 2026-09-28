import type { Dictionary } from "@/content/locales/types";
import { getHomeServiceCards } from "@/content/localized";
import { ServiceCard } from "@/components/services/ServiceCard";
import {
  HomeServicesCarousel,
} from "@/components/home/HomeServicesCarousel";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { localePath, type Locale } from "@/i18n/config";
import Link from "next/link";

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
            <ServiceCard key={service.slug} service={service} />
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
