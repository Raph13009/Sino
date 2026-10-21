import Image from "next/image";
import type { Dictionary } from "@/content/locales/types";
import { media } from "@/content/media";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";

export function HomeClientLogos({ dict }: { dict: Dictionary }) {
  const copy = dict.home.clientLogos;
  const logos = media.home.clientLogos;
  // Duplicate for seamless infinite marquee
  const track = [...logos, ...logos];

  return (
    <Section tone="white" className="border-b border-border py-16 md:py-20">
      <Container>
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl text-[1.65rem] leading-tight tracking-[-0.03em] md:text-[2rem]">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-charcoal">
            {copy.subtitle}
          </p>
        </Reveal>
      </Container>

      <div className="client-logo-marquee relative mt-10 lg:mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white-warm to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white-warm to-transparent md:w-20" />

        <div className="client-logo-marquee__track" aria-hidden={false}>
          <ul role="list" className="client-logo-marquee__list">
            {track.map((logo, index) => {
              const isDuplicate = index >= logos.length;
              return (
                <li
                  key={`${logo.id}-${index}`}
                  className="client-logo-marquee__item"
                  aria-hidden={isDuplicate || undefined}
                >
                  <div className="relative flex h-12 w-[7.5rem] items-center justify-center sm:h-14 sm:w-[8.5rem] md:h-16 md:w-[9.5rem]">
                    <Image
                      src={logo.src}
                      alt={
                        isDuplicate
                          ? ""
                          : (dict.mediaAlts[
                              logo.id as keyof typeof dict.mediaAlts
                            ] ?? logo.alt)
                      }
                      width={logo.width}
                      height={logo.height}
                      className="max-h-full w-auto max-w-full object-contain opacity-70 brightness-0"
                      sizes="152px"
                      priority={!isDuplicate}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
