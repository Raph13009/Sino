import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import type { Dictionary } from "@/content/locales/types";
import { localePath, type Locale } from "@/i18n/config";

type FinalCtaCopy = {
  eyebrow: string;
  title: string;
  description: string;
  label: string;
};

export function FinalCta({
  locale,
  dict,
  copy: copyOverride,
}: {
  locale: Locale;
  dict: Dictionary;
  copy?: FinalCtaCopy;
}) {
  const copy = copyOverride ?? dict.cta;

  return (
    <Section tone="ink" className="py-28 md:py-36">
      <Container>
        <Reveal>
          <div className="max-w-4xl">
            <p className="eyebrow text-accent">{copy.eyebrow}</p>
            <h2 className="display-hero mt-6 !text-white-warm">{copy.title}</h2>
            <div className="rule-accent mt-8" />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white-warm/65 md:text-xl">
              {copy.description}
            </p>
            <div className="mt-12">
              <Button
                href={localePath(locale, "/contact")}
                variant="primaryOnDark"
                data-cta="final_cta"
              >
                {copy.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
