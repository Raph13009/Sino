import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function HomeCredibility({ dict }: { dict: Dictionary }) {
  const copy = dict.home.credibility;

  const items = [
    {
      key: "retention",
      figure: copy.retentionFigure,
      text: copy.retention,
    },
    {
      key: "specialists",
      figure: copy.specialistsFigure,
      text: copy.specialists,
    },
    {
      key: "asAService",
      label: copy.asAServiceLabel,
      text: copy.asAService,
    },
  ] as const;

  return (
    <Section tone="ink" className="py-24 md:py-32">
      <Container>
        <ul role="list" className="grid list-none gap-0 md:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.key}
              className={cn(
                index > 0 &&
                  "mt-14 border-t border-white/15 pt-14 md:mt-0 md:border-t-0 md:border-l md:pt-0",
                index === 0 && "md:pr-12 lg:pr-16",
                index === 1 && "md:px-12 lg:px-16",
                index === 2 && "md:pl-12 lg:pl-16",
              )}
            >
              <Reveal delayMs={index * 100}>
                <div className="flex min-h-16 items-end">
                  {"figure" in item ? (
                    <p className="font-display text-[4.5rem] leading-none tracking-[-0.05em] text-white-warm md:text-[5.5rem]">
                      {item.figure}
                    </p>
                  ) : (
                    <p className="eyebrow text-accent">{item.label}</p>
                  )}
                </div>
                <p className="mt-6 max-w-xs text-[1.0625rem] leading-relaxed text-pretty text-white-warm/65">
                  {item.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
