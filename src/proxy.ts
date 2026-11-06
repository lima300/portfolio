import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE, locales, negotiateLocale } from "@/i18n/config";

/**
 * Every route lives under `/[locale]`. This redirects locale-less URLs to the
 * best match: an explicit earlier choice (cookie) first, then `Accept-Language`,
 * then English.
 *
 * Note it only ever *redirects* — it never rewrites — so the canonical URL is
 * always visible, shareable and cacheable per locale.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = locales.includes(cookieLocale as (typeof locales)[number])
    ? (cookieLocale as (typeof locales)[number])
    : negotiateLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  // 307: the redirect target depends on the request, so it must not be
  // cached as permanent by browsers or CDNs.
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    /*
     * Skip Next internals, the API surface and anything with a file extension
     * (favicons, PDFs, OG images, robots.txt, sitemap.xml...).
     */
    "/((?!_next|api|.*\\..*).*)",
  ],
};
