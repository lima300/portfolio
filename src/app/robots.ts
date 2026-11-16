import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { site } from "@/lib/site";

/** Everything is public except the development surfaces under `/dev`. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: locales.map((locale) => `/${locale}/dev/`),
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
