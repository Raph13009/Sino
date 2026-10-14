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
            <div className="relative aspect-[16/10] overflow-hidden bg-concrete">
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
          <ul className="mt-14 grid gap-0 border-t border-border md:mt-16 md:grid-cols-3">
            {copy.metrics.map((metric, index) => (
              <li
                key={metric.label}
                className={
                  index > 0
                    ? "border-t border-border py-8 md:border-t-0 md:border-l md:px-8 md:py-10 lg:px-10"
                    : "py-8 md:py-10 md:pr-8 lg:pr-10"
                }
              >
                <p className="eyebrow text-accent">{metric.label}</p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink">
                  {metric.value}
                </p>
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
