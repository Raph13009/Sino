import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";

export function HomeCredibility({ dict }: { dict: Dictionary }) {
  const copy = dict.home.credibility;

  return (
    <Section tone="ink" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-accent">{copy.eyebrow}</p>
              <h2 className="mt-5 max-w-xl text-[1.75rem] leading-tight tracking-[-0.03em] text-white-warm md:text-[2.15rem]">
                {copy.title}
              </h2>
              <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-pretty text-white-warm/70">
                {copy.body}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delayMs={100}>
              <p className="eyebrow text-accent">{copy.whyLabel}</p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white-warm/65">
                {copy.whyIntro}
              </p>
              <ul className="mt-6 space-y-3.5">
                {copy.whyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[1.0625rem] leading-snug text-white-warm/90"
                  >
                    <span
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
