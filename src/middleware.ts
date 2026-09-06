import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/video") ||
    pathname === "/llms.txt" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  // Already prefixed with a supported locale (zh)
  if (maybeLocale && locales.includes(maybeLocale as (typeof locales)[number])) {
    if (maybeLocale === defaultLocale) {
      // /en/... → redirect to unprefixed English URL
      const url = request.nextUrl.clone();
      url.pathname = "/" + segments.slice(1).join("/");
      return NextResponse.redirect(url);
    }
    const response = NextResponse.next();
    response.headers.set("x-locale", maybeLocale);
    return response;
  }

  // English default: rewrite to /en/... internally
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set("x-locale", defaultLocale);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
