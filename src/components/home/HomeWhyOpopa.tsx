import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function HomeWhyOpopa({ dict }: { dict: Dictionary }) {
  const copy = dict.home.why;

  return (
    <Section tone="concrete" className="border-b border-border py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow-accent mb-5">
              {copy.number} / {copy.eyebrow}
            </p>
            <h2 className="display-section">{copy.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal">
              {copy.description}
            </p>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-ink md:text-xl">
              {copy.closing}
            </p>
          </Reveal>

          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
            {copy.reasons.map((reason, index) => (
              <li key={reason.number}>
                <Reveal delayMs={index * 70}>
                  <article
                    className={cn(
                      "flex h-full flex-col rounded-card border border-border/80 bg-white-warm p-7 md:p-8",
                      index === 0 && "sm:col-span-1",
                    )}
                  >
                    <p className="eyebrow text-accent">{reason.number}</p>
                    <h3 className="mt-5 text-[1.45rem] tracking-[-0.02em] md:text-[1.6rem]">
                      {reason.title}
                    </h3>
                    <p className="mt-4 flex-1 text-[1.0125rem] leading-relaxed text-charcoal">
                      {reason.body}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
