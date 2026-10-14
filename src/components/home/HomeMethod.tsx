import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";

export function HomeMethod({ dict }: { dict: Dictionary }) {
  const copy = dict.home.method;

  return (
    <Section tone="ink" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow text-accent mb-5">
            {copy.number} / {copy.eyebrow}
          </p>
          <h2 className="display-section max-w-3xl !text-white-warm">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white-warm/65">
            {copy.description}
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-px bg-white/10 md:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li key={step.label} className="bg-ink">
              <Reveal delayMs={index * 70}>
                <div className="flex h-full flex-col border border-white/10 p-7 md:min-h-[22rem] md:p-8">
                  <p className="font-display text-[3.25rem] leading-none tracking-[-0.04em] text-accent md:text-[3.75rem]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-8 text-[1.45rem] tracking-[-0.02em] !text-white-warm md:text-[1.6rem]">
                    {step.label}
                  </h3>
                  <p className="mt-4 text-[1.0125rem] leading-relaxed text-white-warm/65 md:text-[1.0625rem]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
