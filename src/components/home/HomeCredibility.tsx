import Image from "next/image";
import { media } from "@/content/media";
import type { Dictionary } from "@/content/locales/types";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const essecLogo = media.home.essec;
/** Ink bounds inside the source JPEG, so the white margin does not read as a badge. */
const essecCrop = { x: 428, y: 424, width: 1844, height: 818 } as const;

function EssecLogo({ alt }: { alt: string }) {
  const { width, height } = essecLogo;

  return (
    <span
      className="relative block h-11 overflow-hidden md:h-14"
      style={{ aspectRatio: `${essecCrop.width} / ${essecCrop.height}` }}
    >
      <Image
        src={essecLogo.src}
        alt={alt}
        width={width}
        height={height}
        sizes="240px"
        quality={82}
        className="absolute max-w-none invert mix-blend-screen"
        style={{
          width: `${(width / essecCrop.width) * 100}%`,
          height: `${(height / essecCrop.height) * 100}%`,
          left: `${(-essecCrop.x / essecCrop.width) * 100}%`,
          top: `${(-essecCrop.y / essecCrop.height) * 100}%`,
        }}
      />
    </span>
  );
}

export function HomeCredibility({ dict }: { dict: Dictionary }) {
  const copy = dict.home.credibility;

  const items = [
    {
      key: "clients",
      figure: copy.clientsFigure,
      text: copy.clients,
    },
    {
      key: "specialists",
      figure: copy.specialistsFigure,
      text: copy.specialists,
    },
    {
      key: "essec",
      text: copy.essec,
      alt: copy.essecAlt,
    },
  ] as const;

  return (
    <Section tone="ink" className="py-16 md:py-24">
      <Container>
        <ul role="list" className="grid list-none md:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.key}
              className={cn(
                index > 0 &&
                  "mt-12 border-t border-white/15 pt-12 md:mt-0 md:border-t-0 md:border-l md:pt-0",
                index === 0 && "md:pr-12",
                index === 1 && "md:px-12",
                index === 2 && "md:pl-12",
              )}
            >
              <div className="flex h-12 items-center md:h-16">
                {"figure" in item ? (
                  <p className="font-display text-[3rem] leading-none tracking-[-0.04em] text-white-warm md:text-[3.75rem]">
                    {item.figure}
                  </p>
                ) : (
                  <EssecLogo alt={item.alt} />
                )}
              </div>
              <p className="mt-4 max-w-xs text-[1.0625rem] leading-relaxed text-pretty text-white-warm/75">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
