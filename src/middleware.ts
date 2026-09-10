import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";
import { shouldNoIndexDeployment } from "@/lib/site";

const PUBLIC_FILE = /\.(.*)$/;

function applyIndexHeaders(response: NextResponse) {
  if (shouldNoIndexDeployment()) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

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
    return applyIndexHeaders(NextResponse.next());
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  // Already prefixed with a supported locale (zh)
  if (maybeLocale && locales.includes(maybeLocale as (typeof locales)[number])) {
    if (maybeLocale === defaultLocale) {
      // /en/... → redirect to unprefixed English URL
      const url = request.nextUrl.clone();
      url.pathname = "/" + segments.slice(1).join("/");
      return applyIndexHeaders(NextResponse.redirect(url, 308));
    }
    const response = NextResponse.next();
    response.headers.set("x-locale", maybeLocale);
    return applyIndexHeaders(response);
  }

  // English default: rewrite to /en/... internally
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set("x-locale", defaultLocale);
  return applyIndexHeaders(response);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
