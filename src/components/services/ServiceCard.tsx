import Link from "next/link";
import {
  CardArrowIcon,
  OpopaBrandField,
  ServiceIcon,
} from "@/components/home/serviceMarks";
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
        "group relative flex h-full min-h-[20rem] cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-white-warm p-7 no-underline transition-colors duration-300 hover:border-accent hover:bg-accent focus-visible:outline-offset-2 active:border-accent active:bg-accent",
        className,
      )}
      style={{ containerType: "inline-size" }}
    >
      <OpopaBrandField />

      <h3 className="relative z-10 text-[1.3125rem] leading-snug tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-white-warm group-active:text-white-warm">
        {service.name}
      </h3>
      <p className="relative z-10 mt-3 text-[0.9375rem] leading-relaxed text-charcoal transition-colors duration-300 group-hover:text-white-warm group-active:text-white-warm">
        {service.description}
      </p>

      <div className="relative z-20 mt-auto pt-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white-warm transition-colors duration-300 group-hover:bg-white-warm group-hover:text-accent group-active:bg-white-warm group-active:text-accent">
          <CardArrowIcon />
        </span>
      </div>

      <ServiceIcon
        slug={service.slug}
        className="absolute right-7 bottom-7 z-10 text-white-warm"
      />
    </Link>
  );
}
