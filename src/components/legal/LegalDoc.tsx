import type { ReactNode } from "react";

export type LegalField = {
  label: string;
  value: string;
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  fields?: readonly LegalField[];
  bullets?: readonly string[];
};

export function LegalDoc({
  eyebrow,
  title,
  lastUpdated,
  sections,
  email,
}: {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  sections: readonly LegalSection[];
  email: string;
}) {
  return (
    <article>
      <EyebrowBlock>{eyebrow}</EyebrowBlock>
      <h1 className="mt-4 max-w-3xl text-[2.5rem] leading-[1.05] tracking-[-0.03em] md:text-[3.5rem]">
        {title}
      </h1>
      {lastUpdated ? (
        <p className="mt-4 text-[0.9375rem] text-charcoal">{lastUpdated}</p>
      ) : null}

      <div className="mt-14 space-y-14 md:mt-16 md:space-y-16">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="max-w-3xl border-t border-border pt-8"
          >
            <h2 className="text-[1.5rem] leading-tight tracking-[-0.02em] md:text-[1.75rem]">
              {section.title}
            </h2>

            {section.paragraphs?.length ? (
              <div className="prose-editorial mt-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{linkifyEmail(paragraph, email)}</p>
                ))}
              </div>
            ) : null}

            {section.fields?.length ? (
              <dl className="mt-6 space-y-4">
                {section.fields.map((field) => (
                  <div
                    key={`${section.id}-${field.label}`}
                    className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-charcoal">
                      {field.label}
                    </dt>
                    <dd className="text-[1.0625rem] leading-relaxed text-ink">
                      {linkifyEmail(field.value, email)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {section.bullets?.length ? (
              <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-relaxed text-charcoal">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-px w-3 shrink-0 bg-border" aria-hidden />
                    <span>{linkifyEmail(item, email)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

function EyebrowBlock({ children }: { children: ReactNode }) {
  return <p className="eyebrow eyebrow-accent">{children}</p>;
}

function linkifyEmail(text: string, email: string): ReactNode {
  if (!text.includes(email)) return text;
  const parts = text.split(email);
  return parts.reduce<ReactNode[]>((acc, part, index) => {
    acc.push(part);
    if (index < parts.length - 1) {
      acc.push(
        <a
          key={`${email}-${index}`}
          href={`mailto:${email}`}
          className="text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent"
        >
          {email}
        </a>,
      );
    }
    return acc;
  }, []);
}
