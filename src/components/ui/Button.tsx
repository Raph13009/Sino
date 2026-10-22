import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "primaryOnDark"
  | "ghostOnDark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white-warm hover:bg-charcoal border border-ink",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-white-warm",
  tertiary:
    "bg-transparent text-ink border-0 px-0 h-auto min-h-0 hover:text-accent",
  primaryOnDark:
    "bg-white-warm text-ink border border-white-warm hover:bg-concrete",
  ghostOnDark:
    "bg-transparent text-white-warm border border-white-warm/70 hover:border-white-warm hover:bg-white-warm/10",
};

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  showArrow?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /** Optional analytics location when the link is a contact CTA. */
  "data-cta"?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  className,
  variant = "primary",
  showArrow = true,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-control px-6 text-[0.875rem] font-medium tracking-[0.02em] uppercase transition-colors duration-300",
    variant === "tertiary"
      ? "py-1 normal-case tracking-[-0.01em] text-[0.9375rem]"
      : "h-12 min-h-12",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden
          className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, disabled, ...rest } = props;
    return (
      <Link
        href={href}
        className={cn(classes, disabled && "pointer-events-none opacity-50")}
        aria-disabled={disabled}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      {...buttonProps}
      className={cn(classes, buttonProps.disabled && "cursor-wait opacity-70")}
    >
      {content}
    </button>
  );
}
