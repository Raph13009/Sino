"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
};

export function LanguageSwitcher({
  className,
  onNavigate,
}: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const activeLocale = getLocaleFromPathname(pathname);

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
        href={getAlternatePath(pathname, "en")}
        active={activeLocale === "en"}
        onNavigate={onNavigate}
      />
      <span className="text-border-dark select-none" aria-hidden>
        /
      </span>
      <LocaleControl
        locale="zh"
        label={localeLabels.zh}
        href={getAlternatePath(pathname, "zh")}
        active={activeLocale === "zh"}
        onNavigate={onNavigate}
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
}: {
  locale: Locale;
  label: string;
  href: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  const classes = cn(
    "transition-colors duration-200",
    active ? "text-ink" : "text-charcoal hover:text-accent",
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
