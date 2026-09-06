import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "primaryOnDark";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white-warm hover:bg-charcoal border border-ink",
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-concrete",
  tertiary:
    "bg-transparent text-ink border-0 px-0 h-auto min-h-0 hover:text-accent",
  primaryOnDark:
    "bg-white-warm text-ink border border-white-warm hover:bg-concrete",
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
    "group inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-5 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-200",
    variant === "tertiary" ? "py-1" : "h-12 min-h-12",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden
          className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
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
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
