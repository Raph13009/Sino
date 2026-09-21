import type { ServiceSlug } from "@/content/catalog";
import { cn } from "@/lib/utils";

function IconFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-12 w-12 md:h-14 md:w-14", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function EnablementIcon({ className }: { className?: string }) {
  return (
    <IconFrame className={className}>
      <circle cx="5" cy="17" r="1.7" {...stroke} />
      <circle cx="10" cy="10.5" r="1.7" {...stroke} />
      <circle cx="19" cy="6.5" r="1.7" {...stroke} />
      <path d="M6.4 15.7 8.6 12.2M11.7 9.6 17.4 7.2" {...stroke} />
    </IconFrame>
  );
}

function SourcingIcon({ className }: { className?: string }) {
  return (
    <IconFrame className={className}>
      <circle cx="12" cy="6.5" r="2.1" {...stroke} />
      <circle cx="6.2" cy="16.8" r="2.1" {...stroke} />
      <circle cx="17.8" cy="16.8" r="2.1" {...stroke} />
      <path d="M10.5 8.1 7.6 14.8M13.5 8.1 16.4 14.8M8.4 16.8h7.2" {...stroke} />
    </IconFrame>
  );
}

function RepresentationIcon({ className }: { className?: string }) {
  return (
    <IconFrame className={className}>
      <circle cx="10" cy="7" r="2.2" {...stroke} />
      <path d="M5.5 18c.9-3.4 2.5-5 4.5-5s3.6 1.6 4.5 5" {...stroke} />
      <path d="M15.5 8.5h4.2M17.6 6.4 19.7 8.5l-2.1 2.1" {...stroke} />
    </IconFrame>
  );
}

function AutomationIcon({ className }: { className?: string }) {
  return (
    <IconFrame className={className}>
      <rect x="3.5" y="4.5" width="6.5" height="6.5" rx="1" {...stroke} />
      <rect x="14" y="13" width="6.5" height="6.5" rx="1" {...stroke} />
      <path d="M10 7.75h4.2A2.3 2.3 0 0 1 16.5 10v3" {...stroke} />
      <path d="M15 12.2 16.5 13.8 18 12.2" {...stroke} />
    </IconFrame>
  );
}

const serviceIcons: Record<
  ServiceSlug,
  (props: { className?: string }) => React.ReactNode
> = {
  "sales-enablement": EnablementIcon,
  "expert-partner-sourcing": SourcingIcon,
  "outsourced-sales": RepresentationIcon,
  "sales-ai-automation": AutomationIcon,
};

export function ServiceIcon({
  slug,
  className,
}: {
  slug: ServiceSlug;
  className?: string;
}) {
  const Icon = serviceIcons[slug];
  return <Icon className={className} />;
}

export function OpopaBrandField() {
  return (
    <div
      aria-hidden
      className="absolute -right-[100%] -bottom-[122%] aspect-square w-[185%] rounded-full bg-accent p-[6px] transition-colors duration-300 group-hover:bg-white-warm group-active:bg-white-warm"
    >
      <div className="h-full w-full rounded-full bg-ink" />
    </div>
  );
}

export function CardArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
      <path
        d="M6 14 14 6M8.5 6H14v5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
