import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams, localePath } from "@/i18n/config";

type Props = {
  params?: Promise<{ locale?: string }>;
};

export default async function NotFound({ params }: Props) {
  const resolved = params ? await params : undefined;
  const headerStore = await headers();
  const locale = getLocaleFromParams(
    resolved?.locale ?? headerStore.get("x-locale") ?? undefined,
  );
  const dict = getDictionary(locale);
  const copy = dict.notFound;

  return (
    <Section className="py-24 md:py-32">
      <Container>
        <p className="eyebrow text-accent">{copy.code}</p>
        <h1 className="mt-4 text-[2.5rem] md:text-[3.5rem]">{copy.title}</h1>
        <p className="mt-5 max-w-lg text-lg text-charcoal">{copy.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={localePath(locale, "/")}>{copy.returnHome}</Button>
          <Button href={localePath(locale, "/contact")} variant="tertiary">
            {copy.contactOpopa}
          </Button>
        </div>
        <p className="mt-10 text-sm text-charcoal">
          {copy.orBrowse}{" "}
          <Link
            href={localePath(locale, "/services")}
            className="underline hover:text-accent"
          >
            {copy.expertise}
          </Link>
          ,{" "}
          <Link
            href={localePath(locale, "/industries")}
            className="underline hover:text-accent"
          >
            {copy.industries}
          </Link>{" "}
          or{" "}
          <Link
            href={localePath(locale, "/insights")}
            className="underline hover:text-accent"
          >
            {copy.insights}
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
