"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Dictionary } from "@/content/locales/types";
import { localePath, type Locale } from "@/i18n/config";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  path: (href: string) => string;
  insightAlternates: Record<string, string>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dict,
  insightAlternates = {},
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  insightAlternates?: Record<string, string>;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dict,
      insightAlternates,
      path: (href: string) => localePath(locale, href),
    }),
    [locale, dict, insightAlternates],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
