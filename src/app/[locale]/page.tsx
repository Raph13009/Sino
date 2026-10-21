import type { Metadata } from "next";
import { HomeClientLogos } from "@/components/home/HomeClientLogos";
import { HomeContext } from "@/components/home/HomeContext";
import { HomeCredibility } from "@/components/home/HomeCredibility";
import { HomeSelectedWork } from "@/components/home/HomeSelectedWork";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeIndustries } from "@/components/home/HomeIndustries";
import { HomeIndustriesFit } from "@/components/home/HomeIndustriesFit";
import { HomeInsight } from "@/components/home/HomeInsight";
import { HomeMethod } from "@/components/home/HomeMethod";
import { HomeUseCase } from "@/components/home/HomeUseCase";
import { HomeWhyOpopa } from "@/components/home/HomeWhyOpopa";
import { FinalCta } from "@/components/layout/FinalCta";
import { getDictionary } from "@/content/locales";
import { getLocaleFromParams } from "@/i18n/config";
import { createMetadata, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 180;

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
      <JsonLd data={websiteJsonLd(locale)} />
      <HomeHero locale={locale} dict={dict} />
      <HomeServices locale={locale} dict={dict} />
      <HomeClientLogos dict={dict} />
      <HomeCredibility dict={dict} />
      <HomeSelectedWork locale={locale} dict={dict} />
      <HomeUseCase dict={dict} />
      <HomeIndustriesFit dict={dict} />
      <HomeContext dict={dict} />
      <HomeWhyOpopa dict={dict} />
      <HomeIndustries locale={locale} dict={dict} />
      <HomeMethod dict={dict} />
      <HomeInsight locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
