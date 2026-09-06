import { cn } from "@/lib/utils";

type LinkedInLinkProps = {
  href: string;
  label?: string;
  ariaLabel?: string;
  className?: string;
};

export function LinkedInLink({
  href,
  label = "LinkedIn",
  ariaLabel,
  className,
}: LinkedInLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? label}
      className={cn(
        "group inline-flex items-center gap-2.5 border border-border bg-transparent px-3.5 py-2",
        "text-[0.8125rem] font-medium tracking-[-0.01em] text-ink",
        "transition-colors duration-200 hover:border-ink hover:text-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
        className,
      )}
    >
      <span
        className="inline-flex h-4 w-4 items-center justify-center text-ink transition-colors duration-200 group-hover:text-accent"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" role="img">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
        </svg>
      </span>
      <span>{label}</span>
      <span
        aria-hidden
        className="translate-x-0 text-charcoal transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
      >
        ↗
      </span>
    </a>
  );
}
