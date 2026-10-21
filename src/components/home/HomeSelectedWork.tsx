import Link from "next/link";
import type { Dictionary } from "@/content/locales/types";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { localePath, type Locale } from "@/i18n/config";

export function HomeSelectedWork({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.home.selectedWork;
  const href = localePath(locale, "/our-work");
  const anchors = [
    "industrial-market-development",
    "digital-consulting",
  ] as const;

  return (
    <Section className="border-b border-border py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow-accent">{copy.eyebrow}</p>
            <h2 className="display-section mt-5">{copy.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal">
              {copy.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-0 border-t border-border md:grid-cols-2">
          {copy.items.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 80}>
              <Link
                href={`${href}#${anchors[index]}`}
                className="group block border-b border-border px-0 py-8 transition-colors md:border-b-0 md:px-8 md:py-10 md:first:border-r md:first:pl-0 md:last:pr-0"
              >
                <p className="eyebrow text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl tracking-[-0.02em] transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-charcoal">
                  {item.body}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="mt-10">
            <Link
              href={href}
              className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent"
            >
              {copy.explore}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
