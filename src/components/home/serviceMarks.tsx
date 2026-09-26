import type { HomeServiceCardSlug } from "@/content/catalog";
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

function MarketEntryIcon({ className }: { className?: string }) {
  return (
    <IconFrame className={className}>
      <circle cx="5" cy="17" r="1.7" {...stroke} />
      <circle cx="18" cy="7" r="1.7" {...stroke} />
      <path d="M6.6 16.1C9 13.5 11 13.2 12.2 11.4 13.6 9.3 14.4 8.6 16.2 7.6" {...stroke} />
    </IconFrame>
  );
}

function ExpertsIcon({ className }: { className?: string }) {
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

function AfterSalesIcon({ className }: { className?: string }) {
  return (
    <IconFrame className={className}>
      <path
        d="M14.8 6.2a3.1 3.1 0 0 0-4.1 3.6L6.2 14.3a1.5 1.5 0 0 0 2.1 2.1l4.5-4.5a3.1 3.1 0 0 0 3.6-4.1L14.6 9.6 13 8l1.8-1.8Z"
        {...stroke}
      />
      <path d="M7.2 15.4 9.2 17.4" {...stroke} />
    </IconFrame>
  );
}

const serviceIcons: Record<
  HomeServiceCardSlug,
  (props: { className?: string }) => React.ReactNode
> = {
  "european-market-entry": MarketEntryIcon,
  "european-experts-and-partners": ExpertsIcon,
  "european-sales-representation": RepresentationIcon,
  "after-sales-maintenance": AfterSalesIcon,
};

export function ServiceIcon({
  slug,
  className,
}: {
  slug: HomeServiceCardSlug;
  className?: string;
}) {
  const Icon = serviceIcons[slug];
  return <Icon className={className} />;
}

export function OpopaBrandField({
  size = "default",
}: {
  size?: "default" | "compact";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute aspect-square rounded-full bg-accent p-[5px] transition-colors duration-300 group-hover:bg-white-warm group-active:bg-white-warm",
        size === "compact"
          ? "-right-[18%] -bottom-[22%] w-[42%] p-[3px]"
          : "p-[6px]",
      )}
      style={
        size === "compact"
          ? undefined
          : {
              width: "185cqw",
              right: "-100cqw",
              bottom: "calc(-185cqw + 6.25rem)",
            }
      }
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
