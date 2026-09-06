import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Inter_Tight, Noto_Sans_SC } from "next/font/google";
import { headers } from "next/headers";
import { localeHtmlLang, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: [
      { url: "/brand/favicon.ico" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const locale = (headerList.get("x-locale") as Locale | null) ?? "en";
  const lang = localeHtmlLang[locale] ?? "en";

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${interTight.variable} ${notoSansSc.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col bg-ivory text-ink ${
          locale === "zh" ? "font-cjk" : "font-sans"
        }`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
