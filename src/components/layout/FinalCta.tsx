import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import type { Dictionary } from "@/content/locales/types";
import { localePath, type Locale } from "@/i18n/config";

export function FinalCta({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.cta;

  return (
    <Section tone="ink" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="text-sand">{copy.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[2.25rem] leading-[1.05] text-white-warm md:text-[3.25rem]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand">
              {copy.description}
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Button
              href={localePath(locale, "/contact")}
              variant="primaryOnDark"
            >
              {copy.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
