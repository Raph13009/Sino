"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  getAlternatePath,
  getLocaleFromPathname,
  localeLabels,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  onNavigate?: () => void;
  inverted?: boolean;
};

export function LanguageSwitcher({
  className,
  onNavigate,
  inverted = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const activeLocale = getLocaleFromPathname(pathname);
  const { insightAlternates } = useLocale();
  const mappedAlternate = insightAlternates[pathname];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.08em]",
        className,
      )}
      role="navigation"
      aria-label="Language"
    >
      <LocaleControl
        locale="en"
        label={localeLabels.en}
        href={
          activeLocale === "zh" && mappedAlternate
            ? mappedAlternate
            : getAlternatePath(pathname, "en")
        }
        active={activeLocale === "en"}
        onNavigate={onNavigate}
        inverted={inverted}
      />
      <span
        className={cn(
          "select-none",
          inverted ? "text-white-warm/35" : "text-border-dark",
        )}
        aria-hidden
      >
        /
      </span>
      <LocaleControl
        locale="zh"
        label={localeLabels.zh}
        href={
          activeLocale === "en" && mappedAlternate
            ? mappedAlternate
            : getAlternatePath(pathname, "zh")
        }
        active={activeLocale === "zh"}
        onNavigate={onNavigate}
        inverted={inverted}
      />
    </div>
  );
}

function LocaleControl({
  locale,
  label,
  href,
  active,
  onNavigate,
  inverted = false,
}: {
  locale: Locale;
  label: string;
  href: string;
  active: boolean;
  onNavigate?: () => void;
  inverted?: boolean;
}) {
  const classes = cn(
    "transition-colors duration-200",
    inverted
      ? active
        ? "text-white-warm"
        : "text-white-warm/55 hover:text-white-warm"
      : active
        ? "text-ink"
        : "text-charcoal hover:text-accent",
  );

  if (active) {
    return (
      <span className={classes} aria-current="true">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      hrefLang={locale === "zh" ? "zh-Hans" : "en"}
      lang={locale === "zh" ? "zh-Hans" : "en"}
      aria-label={
        locale === "zh" ? "切换到简体中文" : "Switch to English"
      }
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}
