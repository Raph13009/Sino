import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/locales/types";
import { getHomeServiceGroups } from "@/content/localized";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { localePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type HomeServiceTile = ReturnType<typeof getHomeServiceGroups>[number]["services"][number];

function ServiceTile({
  service,
  learnMoreLabel,
  variant,
}: {
  service: HomeServiceTile;
  learnMoreLabel: string;
  variant: "featured" | "secondary" | "supporting";
}) {
  return (
    <Link
      href={service.href}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-card bg-ink text-white-warm no-underline",
        "outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent",
        variant === "featured" && "h-full min-h-[26rem] md:min-h-[32rem] lg:min-h-[36rem]",
        variant === "secondary" && "h-full min-h-[22rem] md:min-h-[24rem]",
        variant === "supporting" && "min-h-[11rem] md:min-h-[12rem]",
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes={
            variant === "featured"
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 1024px) 100vw, 42vw"
          }
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]",
            variant === "supporting" && "object-[center_40%]",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25 transition-opacity duration-500 group-hover:via-ink/75",
            variant === "supporting" && "via-ink/80 to-ink/45",
          )}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10"
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "relative flex h-full flex-1 flex-col justify-end",
          variant === "supporting" ? "p-6 md:p-7" : "p-7 md:p-8 lg:p-9",
        )}
      >
        <h3
          className={cn(
            "tracking-[-0.03em] !text-white-warm",
            variant === "featured" &&
              "max-w-[16ch] text-[1.85rem] leading-[1.05] md:text-[2.35rem] lg:text-[2.65rem]",
            variant === "secondary" &&
              "max-w-[18ch] text-[1.45rem] leading-snug md:text-[1.75rem]",
            variant === "supporting" &&
              "text-[1.25rem] leading-snug md:text-[1.4rem]",
          )}
        >
          {service.name}
        </h3>
        {variant !== "supporting" ? (
          <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-white-warm/75 md:text-[1.0625rem]">
            {service.description}
          </p>
        ) : (
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-white-warm/70">
            {service.description}
          </p>
        )}
        <span className="mt-6 inline-flex items-center gap-3 text-[0.875rem] font-medium tracking-[0.06em] text-white-warm uppercase">
          <span className="border-b border-white-warm/40 pb-0.5 transition-colors group-hover:border-accent group-hover:text-accent">
            {learnMoreLabel}
          </span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export function HomeServices({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const groups = getHomeServiceGroups(locale, dict);
  const copy = dict.home.services;
  const learnMoreLabel = dict.common.learnMore;

  return (
    <Section className="border-b border-border py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow-accent mb-5">
            {copy.number} / {copy.eyebrow}
          </p>
          <h2 className="display-section max-w-3xl">{copy.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal">
            {copy.description}
          </p>
        </Reveal>

        <div className="mt-14 space-y-16 md:mt-16 md:space-y-20">
          {groups.map((group, groupIndex) => {
            const featured = group.services.find((s) => s.featured);
            const secondary = group.services.filter(
              (s) => !s.featured && !s.supporting,
            );
            const supporting = group.services.filter((s) => s.supporting);

            return (
              <div key={group.id}>
                <Reveal delayMs={groupIndex * 40}>
                  <div className="mb-7 max-w-2xl md:mb-8">
                    <p className="eyebrow-accent">{group.title}</p>
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-charcoal md:text-lg">
                      {group.description}
                    </p>
                  </div>
                </Reveal>

                <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
                  {featured ? (
                    <div className="lg:col-span-7 lg:flex">
                      <Reveal
                        className="w-full"
                        delayMs={groupIndex * 40 + 60}
                      >
                        <ServiceTile
                          service={featured}
                          learnMoreLabel={learnMoreLabel}
                          variant="featured"
                        />
                      </Reveal>
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
                    {secondary.map((service, index) => (
                      <Reveal
                        key={service.slug}
                        className={
                          secondary.length === 1 ? "flex h-full flex-1" : "flex flex-1"
                        }
                        delayMs={groupIndex * 40 + 100 + index * 50}
                      >
                        <ServiceTile
                          service={service}
                          learnMoreLabel={learnMoreLabel}
                          variant="secondary"
                        />
                      </Reveal>
                    ))}
                  </div>

                  {supporting.map((service, index) => (
                    <div key={service.slug} className="lg:col-span-12">
                      <Reveal delayMs={groupIndex * 40 + 180 + index * 40}>
                        <ServiceTile
                          service={service}
                          learnMoreLabel={learnMoreLabel}
                          variant="supporting"
                        />
                      </Reveal>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Reveal>
          <Link
            href={localePath(locale, "/services")}
            className="mt-12 inline-flex items-center gap-2 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink transition-colors hover:text-accent md:mt-14"
          >
            <span>{copy.exploreAll}</span>
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
