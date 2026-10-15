import Image from "next/image";
import Link from "next/link";
import type { MediaAsset } from "@/content/media";
import { cn } from "@/lib/utils";

export type ServiceHubCardData = {
  id: string;
  href: string;
  name: string;
  tag: string;
  description: string;
  image: MediaAsset;
  learnMoreLabel: string;
};

export function ServiceHubCard({
  service,
  supporting = false,
  className,
}: {
  service: ServiceHubCardData;
  /** De-emphasized supporting capability (e.g. Sales AI). */
  supporting?: boolean;
  className?: string;
}) {
  return (
    <Link
      id={service.id}
      href={service.href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card bg-ink text-white-warm no-underline",
        "outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent",
        supporting
          ? "min-h-[20rem] md:min-h-[22rem] opacity-95"
          : "min-h-[26rem] md:min-h-[28rem]",
        className,
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/20"
          aria-hidden
        />
      </div>

      <div className="relative flex h-full flex-1 flex-col justify-end p-6 md:p-7">
        <span className="text-[0.6875rem] font-medium tracking-[0.08em] text-white-warm/55 uppercase">
          {service.tag}
        </span>

        <h3 className="mt-3 text-[1.45rem] leading-snug tracking-[-0.02em] !text-white-warm md:text-[1.65rem]">
          {service.name}
        </h3>
        <p className="mt-3 text-[0.975rem] leading-relaxed text-white-warm/70">
          {service.description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium tracking-[0.04em] text-white-warm uppercase">
          <span className="border-b border-white-warm/35 pb-0.5 transition-colors group-hover:border-accent group-hover:text-accent">
            {service.learnMoreLabel}
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
