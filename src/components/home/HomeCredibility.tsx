import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function HomeCredibility({ dict }: { dict: Dictionary }) {
  const copy = dict.home.credibility;

  return (
    <Section tone="ink" className="py-24 md:py-32">
      <Container>
        <ul role="list" className="grid list-none gap-0 lg:grid-cols-12">
          <li
            className={cn(
              "border-b border-white/15 pb-14 lg:col-span-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10",
            )}
          >
            <Reveal>
              <p className="font-display text-[4.5rem] leading-none tracking-[-0.05em] text-white-warm md:text-[5.5rem]">
                {copy.retentionFigure}
              </p>
              <p className="mt-6 max-w-xs text-[1.0625rem] leading-relaxed text-pretty text-white-warm/65">
                {copy.retention}
              </p>
            </Reveal>
          </li>

          <li className="border-b border-white/15 py-14 lg:col-span-3 lg:border-b-0 lg:border-r lg:px-10 lg:py-0">
            <Reveal delayMs={80}>
              <p className="font-display text-[4.5rem] leading-none tracking-[-0.05em] text-white-warm md:text-[5.5rem]">
                {copy.specialistsFigure}
              </p>
              <p className="mt-6 max-w-xs text-[1.0625rem] leading-relaxed text-pretty text-white-warm/65">
                {copy.specialists}
              </p>
            </Reveal>
          </li>

          <li className="pt-14 lg:col-span-6 lg:pl-12 lg:pt-0">
            <Reveal delayMs={140}>
              <p className="eyebrow text-accent">{copy.whyLabel}</p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white-warm/65">
                {copy.whyIntro}
              </p>
              <ul className="mt-6 space-y-3">
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
          </li>
        </ul>
      </Container>
    </Section>
  );
}
