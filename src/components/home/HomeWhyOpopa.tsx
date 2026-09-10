import type { Dictionary } from "@/content/locales/types";
import {
  Container,
  Rule,
  Section,
  SectionHeading,
} from "@/components/ui/Section";

export function HomeWhyOpopa({ dict }: { dict: Dictionary }) {
  const copy = dict.home.why;

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          number={copy.number}
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-14 grid gap-0 border-t border-border md:grid-cols-2">
          {copy.reasons.map((reason, index) => (
            <article
              key={reason.number}
              className={`border-b border-border py-8 md:px-8 md:py-10 ${
                index % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <p className="eyebrow">{reason.number}</p>
              <h3 className="mt-4 text-2xl">{reason.title}</h3>
              <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-charcoal">
                {reason.body}
              </p>
            </article>
          ))}
        </div>

        <Rule tone="accent" className="mt-12" />
        <p className="mt-6 max-w-2xl text-lg text-charcoal">{copy.closing}</p>
      </Container>
    </Section>
  );
}
