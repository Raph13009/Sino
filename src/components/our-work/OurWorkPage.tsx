import { FinalCta } from "@/components/layout/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import {
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import type { Dictionary } from "@/content/locales/types";
import { localizeMediaAsset } from "@/content/localized";
import { localePath, type Locale } from "@/i18n/config";
import { breadcrumbJsonLd } from "@/lib/seo";

export function OurWorkPage({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.ourWork;
  const industrial = copy.industrial;
  const digital = copy.digital;
  const marketMap = localizeMediaAsset(
    dict,
    media.ourWork.industrialMarketMap,
  );
  const siteAssessment = localizeMediaAsset(
    dict,
    media.ourWork.industrialSiteAssessment,
  );
  const workspace = localizeMediaAsset(dict, media.ourWork.digitalWorkspace);
  const interfaceStill = localizeMediaAsset(
    dict,
    media.ourWork.digitalInterface,
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: dict.common.home, path: "/" },
            { name: copy.eyebrow, path: "/our-work" },
          ],
          locale,
        )}
      />

      <Section className="border-b border-border pt-16 pb-14 md:pt-24 md:pb-20">
        <Container>
          <Breadcrumbs
            label={dict.common.breadcrumb}
            items={[
              { label: dict.common.home, href: localePath(locale, "/") },
              { label: copy.eyebrow },
            ]}
          />
          <Reveal className="mt-10 max-w-3xl">
            <Eyebrow accent>{copy.eyebrow}</Eyebrow>
            <h1 className="display-section mt-4">{copy.title}</h1>
            <p className="mt-5 text-xl text-accent md:text-2xl">
              {copy.headline}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal">
              {copy.subtitle}
            </p>
            <p className="mt-6 max-w-2xl border-l-2 border-accent/40 pl-5 text-[0.9375rem] leading-relaxed text-charcoal/80">
              {copy.disclaimer}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Industrial case — dominant visual treatment */}
      <Section
        id={industrial.id}
        tone="ink"
        className="scroll-mt-[calc(var(--header-h)+1rem)] border-b border-white-warm/10 py-16 md:py-24"
      >
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                <Eyebrow accent>01</Eyebrow>
                <h2 className="mt-4 text-[1.75rem] leading-tight tracking-[-0.03em] text-white-warm md:text-[2.35rem]">
                  {industrial.title}
                </h2>
              </div>
              <dl className="grid gap-5 text-[0.9375rem] sm:grid-cols-3 lg:col-span-5">
                <div>
                  <dt className="eyebrow text-accent">{copy.labels.category}</dt>
                  <dd className="mt-2 leading-snug text-white-warm/75">
                    {industrial.category}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-accent">{copy.labels.geography}</dt>
                  <dd className="mt-2 leading-snug text-white-warm/75">
                    {industrial.geography}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-accent">{copy.labels.client}</dt>
                  <dd className="mt-2 leading-snug text-white-warm/75">
                    {industrial.client}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <h3 className="eyebrow text-accent">{copy.labels.context}</h3>
              <div className="mt-4 space-y-4">
                {industrial.context.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.0625rem] leading-relaxed text-white-warm/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <h3 className="eyebrow mt-10 text-accent">
                {copy.labels.challenge}
              </h3>
              <div className="mt-4 space-y-4">
                {industrial.challenge.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.0625rem] leading-relaxed text-white-warm/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={100} className="lg:col-span-6 lg:col-start-7">
              <h3 className="eyebrow text-accent">{copy.labels.whatWeDid}</h3>
              <ol className="mt-6 border-t border-white-warm/15">
                {industrial.steps.map((step) => (
                  <li
                    key={step.number}
                    className="grid gap-3 border-b border-white-warm/15 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
                  >
                    <span className="font-medium tracking-[0.08em] text-accent">
                      {step.number}
                    </span>
                    <div>
                      <p className="text-[1.0625rem] font-medium text-white-warm">
                        {step.title}
                      </p>
                      <p className="mt-2 text-[1.0125rem] leading-relaxed text-white-warm/70">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 border-t border-white-warm/15 pt-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h3 className="eyebrow text-accent">{copy.labels.deliverables}</h3>
              <ul className="mt-5 space-y-3">
                {industrial.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[1.0125rem] leading-snug text-white-warm/85"
                  >
                    <span
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delayMs={80} className="space-y-8 lg:col-span-6 lg:col-start-7">
              <div>
                <h3 className="eyebrow text-accent">{copy.labels.outcome}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-white-warm/85">
                  {industrial.outcome}
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-accent">{copy.labels.relevance}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-white-warm/75">
                  {industrial.relevance}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={80} className="mt-16 border-t border-white-warm/15 pt-12">
            <h3 className="eyebrow text-accent">{copy.labels.evidence}</h3>
            <div className="mt-8 space-y-12">
              <div>
                <MediaImage
                  src={marketMap.src}
                  alt={marketMap.alt}
                  width={marketMap.width}
                  height={marketMap.height}
                  sizes="100vw"
                  frameClassName="w-full overflow-hidden border border-white-warm/10 bg-white-warm"
                  frameStyle={{
                    aspectRatio: `${marketMap.width} / ${marketMap.height}`,
                  }}
                />
                <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-white-warm/60">
                  {industrial.evidenceMapCaption}
                </p>
              </div>
              <div>
                <MediaImage
                  src={siteAssessment.src}
                  alt={siteAssessment.alt}
                  width={siteAssessment.width}
                  height={siteAssessment.height}
                  sizes="100vw"
                  frameClassName="w-full overflow-hidden border border-white-warm/10"
                  frameStyle={{
                    aspectRatio: `${siteAssessment.width} / ${siteAssessment.height}`,
                  }}
                />
                <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-white-warm/60">
                  {industrial.evidenceSiteCaption}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Digital case — complementary, lighter treatment */}
      <Section
        id={digital.id}
        tone="white"
        className="scroll-mt-[calc(var(--header-h)+1rem)] border-b border-border py-16 md:py-24"
      >
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <Eyebrow accent>02</Eyebrow>
                <h2 className="mt-4 text-[1.65rem] leading-tight tracking-[-0.03em] md:text-[2.05rem]">
                  {digital.title}
                </h2>
                <p className="mt-5 max-w-xl border-l-2 border-border pl-5 text-[0.9375rem] leading-relaxed text-charcoal/80">
                  {digital.framing}
                </p>
              </div>
              <dl className="grid gap-5 self-end text-[0.9375rem] sm:grid-cols-3 lg:col-span-6">
                <div>
                  <dt className="eyebrow text-accent">{copy.labels.category}</dt>
                  <dd className="mt-2 leading-snug text-charcoal/80">
                    {digital.category}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-accent">{copy.labels.geography}</dt>
                  <dd className="mt-2 leading-snug text-charcoal/80">
                    {digital.geography}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-accent">{copy.labels.client}</dt>
                  <dd className="mt-2 leading-snug text-charcoal/80">
                    {digital.client}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <MediaImage
                src={workspace.src}
                alt={workspace.alt}
                width={workspace.width}
                height={workspace.height}
                sizes="(max-width: 768px) 100vw, 45vw"
                frameClassName="w-full overflow-hidden"
                frameStyle={{
                  aspectRatio: `${workspace.width} / ${workspace.height}`,
                }}
              />
            </Reveal>
            <Reveal delayMs={100}>
              <MediaImage
                src={interfaceStill.src}
                alt={interfaceStill.alt}
                width={interfaceStill.width}
                height={interfaceStill.height}
                sizes="(max-width: 768px) 100vw, 45vw"
                frameClassName="w-full overflow-hidden"
                frameStyle={{
                  aspectRatio: `${interfaceStill.width} / ${interfaceStill.height}`,
                }}
              />
            </Reveal>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h3 className="eyebrow text-accent">{copy.labels.context}</h3>
              <div className="mt-4 space-y-4">
                {digital.context.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.0625rem] leading-relaxed text-charcoal"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <h3 className="eyebrow mt-10 text-accent">
                {copy.labels.challenge}
              </h3>
              <div className="mt-4 space-y-4">
                {digital.challenge.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.0625rem] leading-relaxed text-charcoal"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={80} className="lg:col-span-6 lg:col-start-7">
              <h3 className="eyebrow text-accent">{copy.labels.whatWeDid}</h3>
              <ol className="mt-6 border-t border-border">
                {digital.steps.map((step) => (
                  <li
                    key={step.number}
                    className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
                  >
                    <span className="font-medium tracking-[0.08em] text-accent">
                      {step.number}
                    </span>
                    <div>
                      <p className="text-[1.0625rem] font-medium text-ink">
                        {step.title}
                      </p>
                      <p className="mt-2 text-[1.0125rem] leading-relaxed text-charcoal/85">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 border-t border-border pt-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h3 className="eyebrow text-accent">{copy.labels.outcome}</h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-charcoal">
                {digital.outcome}
              </p>
            </Reveal>
            <Reveal delayMs={80} className="lg:col-span-6 lg:col-start-7">
              <h3 className="eyebrow text-accent">{copy.labels.relevance}</h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-charcoal/90">
                {digital.relevance}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FinalCta
        locale={locale}
        dict={dict}
        copy={{
          eyebrow: copy.cta.eyebrow,
          title: copy.cta.title,
          description: copy.cta.description,
          label: copy.cta.label,
        }}
      />
    </>
  );
}
