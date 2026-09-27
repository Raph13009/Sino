import type { Dictionary } from "@/content/locales/types";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function HomeCredibility({ dict }: { dict: Dictionary }) {
  const copy = dict.home.credibility;

  const items = [
    {
      key: "clients",
      figure: copy.clientsFigure,
      text: copy.clients,
    },
    {
      key: "specialists",
      figure: copy.specialistsFigure,
      text: copy.specialists,
    },
    {
      key: "localSupport",
      label: copy.localSupportLabel,
      text: copy.localSupport,
    },
  ] as const;

  return (
    <Section tone="ink" className="py-16 md:py-24">
      <Container>
        <ul role="list" className="grid list-none md:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.key}
              className={cn(
                index > 0 &&
                  "mt-12 border-t border-white/15 pt-12 md:mt-0 md:border-t-0 md:border-l md:pt-0",
                index === 0 && "md:pr-12",
                index === 1 && "md:px-12",
                index === 2 && "md:pl-12",
              )}
            >
              <div className="flex min-h-12 items-center md:min-h-16">
                {"figure" in item ? (
                  <p className="font-display text-[3rem] leading-none tracking-[-0.04em] text-white-warm md:text-[3.75rem]">
                    {item.figure}
                  </p>
                ) : (
                  <p className="font-display text-[1.0625rem] font-medium leading-snug tracking-[0.14em] text-white-warm uppercase md:text-[1.125rem]">
                    {item.label}
                  </p>
                )}
              </div>
              <p className="mt-4 max-w-xs text-[1.0625rem] leading-relaxed text-pretty text-white-warm/75">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
