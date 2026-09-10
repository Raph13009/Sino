import type { Metadata } from "next";
import { HomeContext } from "@/components/home/HomeContext";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeIndustries } from "@/components/home/HomeIndustries";
import { HomeInsight } from "@/components/home/HomeInsight";
import { HomeMethod } from "@/components/home/HomeMethod";
import { HomeWhyOpopa } from "@/components/home/HomeWhyOpopa";
import { FinalCta } from "@/components/layout/FinalCta";
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
    title: dict.home.meta.title,
    description: dict.home.meta.description,
    path: "/",
    locale,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = getLocaleFromParams(localeParam);
  const dict = getDictionary(locale);

  return (
    <>
      <HomeHero locale={locale} dict={dict} />
      <HomeContext dict={dict} />
      <HomeServices locale={locale} dict={dict} />
      <HomeWhyOpopa dict={dict} />
      <HomeIndustries locale={locale} dict={dict} />
      <HomeMethod dict={dict} />
      <HomeInsight locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
