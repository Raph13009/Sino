import Link from "next/link";
import type { ServiceSlug } from "@/content/catalog";
import { cn } from "@/lib/utils";

export type ServiceCardData = {
  slug: ServiceSlug;
  href: string;
  name: string;
  description: string;
};

export function ServiceCard({
  service,
  className,
}: {
  service: ServiceCardData;
  className?: string;
}) {
  return (
    <Link
      href={service.href}
      className={cn(
        "group flex h-full min-h-[16rem] flex-col border border-border bg-white-warm p-7 no-underline transition-colors duration-300",
        "hover:border-ink hover:bg-ink hover:text-white-warm",
        "outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent",
        className,
      )}
    >
      <h3 className="text-[1.35rem] leading-snug tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-white-warm">
        {service.name}
      </h3>
      <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-charcoal transition-colors duration-300 group-hover:text-white-warm/70">
        {service.description}
      </p>
      <span
        aria-hidden
        className="mt-8 inline-flex text-ink transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent"
      >
        →
      </span>
    </Link>
  );
}
