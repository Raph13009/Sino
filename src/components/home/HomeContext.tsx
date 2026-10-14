import Image from "next/image";
import { media } from "@/content/media";
import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

export function HomeContext({ dict }: { dict: Dictionary }) {
  const image = media.home.context;
  const copy = dict.home.context;

  return (
    <section className="relative isolate min-h-[min(92svh,52rem)] overflow-hidden bg-ink text-white-warm">
      <Image
        src={image.src}
        alt={copy.imageAlt}
        fill
        quality={85}
        sizes="100vw"
        className="object-cover object-[center_45%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/35"
        aria-hidden
      />

      <Container className="relative flex min-h-[min(92svh,52rem)] items-center py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-accent">
            {copy.number} / {copy.eyebrow}
          </p>
          <h2 className="display-section mt-5 !text-white-warm">{copy.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-white-warm/75">
            {copy.description}
          </p>
          <ul className="mt-10 space-y-4 border-t border-white/15 pt-8">
            {copy.points.map((item) => (
              <li
                key={item}
                className="flex gap-4 text-[1.0625rem] text-white-warm/85"
              >
                <span
                  className="mt-2.5 h-px w-6 shrink-0 bg-accent"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-12 text-white-warm/40">{copy.caption}</p>
        </Reveal>
      </Container>
    </section>
  );
}
