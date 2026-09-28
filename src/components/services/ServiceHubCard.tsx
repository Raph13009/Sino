import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import type { MediaAsset } from "@/content/media";
import { cn } from "@/lib/utils";

export type ServiceHubCardData = {
  id: string;
  href: string;
  number: string;
  name: string;
  tag: string;
  description: string;
  image: MediaAsset;
  learnMoreLabel: string;
};

export function ServiceHubCard({
  service,
  className,
}: {
  service: ServiceHubCardData;
  className?: string;
}) {
  return (
    <Link
      id={service.id}
      href={service.href}
      className={cn(
        "group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-xl border border-border bg-white-warm no-underline transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_18px_40px_-28px_rgba(26,31,46,0.45)] focus-visible:outline-offset-2",
        className,
      )}
    >
      <div className="relative overflow-hidden border-b border-border">
        <MediaImage
          src={service.image.src}
          alt={service.image.alt}
          width={service.image.width}
          height={service.image.height}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          frameClassName="aspect-[2/1]"
          imageClassName="transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow text-charcoal">{service.number}</p>
          <span className="rounded-md border border-border px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.04em] text-charcoal uppercase transition-colors duration-300 group-hover:border-accent/30 group-hover:text-ink">
            {service.tag}
          </span>
        </div>

        <h3 className="mt-3 text-[1.25rem] leading-snug tracking-[-0.02em] text-ink md:text-[1.35rem]">
          {service.name}
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal">
          {service.description}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.9375rem] font-medium tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent">
          <span>{service.learnMoreLabel}</span>
          <span
            aria-hidden
            className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
