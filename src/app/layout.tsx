import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Inter_Tight, Noto_Sans_SC } from "next/font/google";
import { headers } from "next/headers";
import { localeHtmlLang, type Locale } from "@/i18n/config";
import { isVercelAnalyticsEnabled } from "@/lib/analytics";
import { shouldNoIndexDeployment, siteConfig } from "@/lib/site";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0c233c" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.legalName,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  title: {
    default: `${siteConfig.legalName} — ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: shouldNoIndexDeployment()
    ? { index: false, follow: false }
    : { index: true, follow: true },
  verification: {
    google: "rHUUJuvSKCCa1p4kSs-iUNEvARFWVFWBPalDjZgo-4M",
  },
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "any" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/brand/favicon.ico"],
  },
  other: {
    "msapplication-TileColor": "#0c233c",
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
        {isVercelAnalyticsEnabled() ? <Analytics /> : null}
      </body>
    </html>
  );
}
