import { media } from "@/content/media";
import type { Dictionary } from "@/content/locales/types";
import { MediaImage } from "@/components/ui/MediaImage";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/Section";

export function HomeContext({ dict }: { dict: Dictionary }) {
  const image = media.home.context;
  const copy = dict.home.context;

  return (
    <Section tone="white" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              number={copy.number}
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
            />
            <ul className="mt-10 space-y-4 text-[1.0625rem] text-charcoal">
              {copy.points.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-px w-4 shrink-0 bg-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <MediaImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1024px) 100vw, 48vw"
              frameClassName="aspect-[4/5] md:aspect-[5/6]"
              caption={copy.caption}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
