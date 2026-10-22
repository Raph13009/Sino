import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/content/locales";
import {
  getLocaleFromParams,
  locales,
  type Locale,
} from "@/i18n/config";
import { getInsightLanguageAlternates } from "@/lib/insights/service";
import { organizationJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Only `en` / `zh` — prevents soft-200 homepage for junk paths like `/wp-login.php`. */
export const dynamicParams = false;

export const revalidate = 180;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  const insightAlternates = await getInsightLanguageAlternates();

  return (
    <LocaleProvider
      locale={locale}
      dict={dict}
      insightAlternates={insightAlternates}
    >
      <JsonLd data={organizationJsonLd()} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </LocaleProvider>
  );
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
