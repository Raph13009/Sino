import type { Dictionary } from "@/content/locales/types";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Section";

export function HomeMethod({ dict }: { dict: Dictionary }) {
  const copy = dict.home.method;

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          number={copy.number}
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <ol className="mt-14 grid gap-0 border-t border-border md:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li
              key={step.label}
              className="border-b border-border py-8 md:border-b-0 md:border-r md:px-6 md:py-10 md:last:border-r-0"
            >
              <p className="eyebrow">
                0{index + 1} — {step.label}
              </p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-charcoal">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
