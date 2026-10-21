import type { Metadata } from "next";
import { OurWorkPage } from "@/components/our-work/OurWorkPage";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams } from "@/i18n/config";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);
  return createMetadata({
    title: dict.ourWork.meta.title,
    description: dict.ourWork.meta.description,
    path: "/our-work",
    locale,
  });
}

export default async function OurWorkRoute({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);

  return <OurWorkPage locale={locale} dict={dict} />;
}
