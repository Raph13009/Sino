import type { NextConfig } from "next";
import { shouldNoIndexDeployment } from "./src/lib/site";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 960, 1080, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400,
    qualities: [75, 80, 82],
  },
  poweredByHeader: false,
  async headers() {
    const cacheHeaders = [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];

    if (!shouldNoIndexDeployment()) return cacheHeaders;

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      ...cacheHeaders,
    ];
  },
  async redirects() {
    const legacyExpertiseMap: Record<string, string> = {
      "market-entry-advisory": "/services/european-market-entry",
      "european-partner-network": "/services/european-experts-and-partners",
      "sales-enablement": "/services/european-sales-representation",
      "outsourced-sales": "/services/european-sales-representation",
    };

    const retiredServiceMap: Record<string, string> = {
      "sales-enablement": "/services/european-sales-representation",
      "expert-partner-sourcing": "/services/european-experts-and-partners",
      "outsourced-sales": "/services/european-sales-representation",
    };

    const redirects = [
      { source: "/expertise", destination: "/services", permanent: true },
      { source: "/zh/expertise", destination: "/zh/services", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/zh/blog", destination: "/zh/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
      {
        source: "/zh/blog/:slug",
        destination: "/zh/insights/:slug",
        permanent: true,
      },
      {
        source: "/images/hero/hero-industrial-port.jpg",
        destination: "/images/hero/hero-industrial-port.webp",
        permanent: true,
      },
      // Retired CIVEP / first-OPOPA brand files Google may still have cached.
      {
        source: "/brand/civep-favicon.png",
        destination: "/favicon-192.png",
        permanent: true,
      },
      {
        source: "/brand/opopa-favicon.png",
        destination: "/favicon-192.png",
        permanent: true,
      },
      {
        source: "/brand/civep-mark-light.png",
        destination: "/icon.png",
        permanent: true,
      },
      {
        source: "/brand/civep-mark-dark.png",
        destination: "/icon.png",
        permanent: true,
      },
      {
        source: "/brand/opopa-mark-light.png",
        destination: "/icon.png",
        permanent: true,
      },
      {
        source: "/brand/opopa-mark-dark.png",
        destination: "/icon.png",
        permanent: true,
      },
      {
        source: "/brand/civep-logo-light.png",
        destination: "/brand/logo-light.png",
        permanent: true,
      },
      {
        source: "/brand/opopa-logo-light.png",
        destination: "/brand/logo-light.png",
        permanent: true,
      },
      {
        source: "/brand/civep-logo-dark.png",
        destination: "/brand/logo-dark.png",
        permanent: true,
      },
      {
        source: "/brand/opopa-logo-dark.png",
        destination: "/brand/logo-dark.png",
        permanent: true,
      },
    ];

    for (const [from, to] of Object.entries(legacyExpertiseMap)) {
      redirects.push(
        { source: `/expertise/${from}`, destination: to, permanent: true },
        {
          source: `/zh/expertise/${from}`,
          destination: `/zh${to}`,
          permanent: true,
        },
      );
    }

    for (const [from, to] of Object.entries(retiredServiceMap)) {
      redirects.push(
        { source: `/services/${from}`, destination: to, permanent: true },
        {
          source: `/zh/services/${from}`,
          destination: `/zh${to}`,
          permanent: true,
        },
      );
    }

    return redirects;
  },
};

export default nextConfig;
