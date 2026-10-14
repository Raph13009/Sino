import Image from "next/image";
import { media } from "@/content/media";
import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const fitVisuals = [
  media.industries.industrialEquipment,
  media.industries.advancedManufacturing,
  media.services.afterSalesWarehouse,
  media.industries.greenTechnology,
] as const;

export function HomeIndustriesFit({ dict }: { dict: Dictionary }) {
  const copy = dict.home.industriesFit;

  return (
    <Section tone="white" className="border-b border-border py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow-accent mb-5">
            {copy.number} / {copy.eyebrow}
          </p>
          <h2 className="display-section max-w-4xl">{copy.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal">
            {copy.description}
          </p>
        </Reveal>
      </Container>

      <ul className="mt-14 grid sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {copy.industries.map((industry, index) => {
          const image = fitVisuals[index] ?? fitVisuals[0];
          const tall = index % 2 === 0;

          return (
            <li
              key={industry}
              className={cn(
                "group relative isolate overflow-hidden bg-ink",
                tall ? "aspect-[3/4] sm:aspect-[3/5] lg:aspect-auto lg:min-h-[28rem]" : "aspect-[3/4] sm:aspect-[4/5] lg:min-h-[28rem]",
              )}
            >
              <Reveal delayMs={index * 70} className="absolute inset-0">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/15 transition-opacity duration-500 group-hover:via-ink/55"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="eyebrow text-white-warm/50">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-[1.45rem] leading-tight tracking-[-0.025em] text-white-warm md:text-[1.65rem]">
                    {industry}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <Container>
        <Reveal>
          <p className="mt-10 max-w-2xl text-[1.0125rem] leading-relaxed text-charcoal/80 md:mt-12">
            {copy.closing}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
