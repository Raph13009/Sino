import Image from "next/image";
import { media } from "@/content/media";
import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";

export function HomeUseCase({ dict }: { dict: Dictionary }) {
  const copy = dict.home.useCase;
  const image = media.services.marketEntryMap;

  return (
    <Section className="overflow-hidden border-b border-border py-24 md:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow-accent mb-5">
              {copy.number} / {copy.eyebrow}
            </p>
            <h2 className="display-section">{copy.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal">
              {copy.lead}
            </p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-charcoal/85">
              {copy.body}
            </p>
          </Reveal>

          <Reveal className="relative lg:col-span-7" delayMs={100}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-concrete">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={120}>
          <div className="mt-14 hidden border-t border-border pt-8 md:mt-16 md:grid md:grid-cols-12">
            <div className="md:col-span-3" />
            <p className="eyebrow text-charcoal/55 md:col-span-4 md:pr-8">
              {copy.withoutLabel}
            </p>
            <p className="eyebrow text-accent md:col-span-5 md:border-l md:border-border md:pl-8 lg:pl-10">
              {copy.withLabel}
            </p>
          </div>
          <ul className="mt-2 grid gap-0 border-t border-border">
            {copy.metrics.map((metric) => (
              <li
                key={metric.label}
                className="grid gap-4 border-b border-border py-8 last:border-b-0 md:grid-cols-12 md:gap-0 md:py-9"
              >
                <p className="eyebrow text-accent md:col-span-3 md:pr-6">
                  {metric.label}
                </p>
                <div className="md:col-span-4 md:pr-8">
                  <p className="eyebrow mb-2 text-charcoal/55 md:hidden">
                    {copy.withoutLabel}
                  </p>
                  <p className="text-[1.0125rem] leading-relaxed text-charcoal/80">
                    {metric.without}
                  </p>
                </div>
                <div className="md:col-span-5 md:border-l md:border-border md:pl-8 lg:pl-10">
                  <p className="eyebrow mb-2 text-accent md:hidden">
                    {copy.withLabel}
                  </p>
                  <p className="text-[1.0125rem] leading-relaxed text-ink">
                    {metric.with}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[0.9375rem] leading-relaxed text-charcoal/75">
            {copy.note}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
