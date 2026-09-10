import type { MetadataRoute } from "next";
import { shouldNoIndexDeployment, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`;

  if (shouldNoIndexDeployment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: sitemapUrl,
    host: siteConfig.url.replace(/\/$/, ""),
  };
}
