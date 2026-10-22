import type { NextConfig } from "next";
import { shouldNoIndexDeployment } from "./src/lib/site";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 960, 1080, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400,
    qualities: [75, 80, 82, 90],
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
      "market-entry-advisory": "/services/european-sales-representation",
      "european-partner-network": "/services/european-experts-and-partners",
      "sales-enablement": "/services/european-sales-representation",
      "outsourced-sales": "/services/european-sales-representation",
    };

    const retiredServiceMap: Record<string, string> = {
      "european-market-entry": "/services/european-sales-representation",
      "legal-and-regulatory-support": "/services/european-experts-and-partners",
      "sales-enablement": "/services/european-sales-representation",
      "expert-partner-sourcing": "/services/european-experts-and-partners",
      "outsourced-sales": "/services/european-sales-representation",
    };

    // Renamed CMS insight slugs (old URLs still indexed / linked in GSC).
    const legacyInsightMap: Record<string, string> = {
      "selling-to-european-industrial-buyers":
        "/insights/building-european-sales-presence",
      "european-market-entry-for-chinese-industrial-companies":
        "/insights/chinese-industrial-companies-enter-europe",
      "finding-european-distributors-and-specialists":
        "/insights/distributor-vs-agent-vs-local-sales-europe",
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
      // Common crawl traps → canonical homes (avoid hard 404 noise in GSC).
      { source: "/home", destination: "/", permanent: true },
      { source: "/zh/home", destination: "/zh", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/case-studies", destination: "/our-work", permanent: true },
      { source: "/zh/case-studies", destination: "/zh/our-work", permanent: true },
      { source: "/work", destination: "/our-work", permanent: true },
      { source: "/zh/work", destination: "/zh/our-work", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/zh/team", destination: "/zh/about", permanent: true },
      {
        source: "/images/hero/hero-industrial-port.jpg",
        destination: "/images/hero/hero-factory-visit.webp",
        permanent: true,
      },
      {
        source: "/images/hero/hero-industrial-port.webp",
        destination: "/images/hero/hero-factory-visit.webp",
        permanent: true,
      },
      {
        source: "/images/raph_industrial_visite/raph_industrial_visite_:n.png",
        destination: "/images/raph_industrial_visite/raph_industrial_visite_:n.webp",
        permanent: true,
      },
      {
        source: "/images/raph_industrial_visite/home-context-factory.webp",
        destination: "/images/raph_industrial_visite/home-context.webp",
        permanent: true,
      },
      {
        source: "/images/services/service-market-entry.webp",
        destination:
          "/images/raph_industrial_visite/service-market-entry.webp",
        permanent: true,
      },
      {
        source: "/video/founder-introduction.jpg",
        destination: "/video/founder-introduction.webp",
        permanent: true,
      },
      {
        source: "/brand/plaquette.png",
        destination: "/brand/plaquette.webp",
        permanent: true,
      },
      // Legacy brand asset paths (pre-OPOPA filenames) that may still be cached externally.
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

    for (const [from, to] of Object.entries(legacyInsightMap)) {
      redirects.push(
        { source: `/insights/${from}`, destination: to, permanent: true },
        {
          source: `/zh/insights/${from}`,
          destination: `/zh${to}`,
          permanent: true,
        },
      );
    }

    return redirects;
  },
};

export default nextConfig;
