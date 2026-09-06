import type { Locale } from "@/i18n/config";
import { en, type Dictionary } from "./en";
import { zh } from "./zh";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  zh,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
