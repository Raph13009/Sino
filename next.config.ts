import type { NextConfig } from "next";
import { shouldNoIndexDeployment } from "./src/lib/site";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  async headers() {
    if (!shouldNoIndexDeployment()) return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    const legacyServiceMap: Record<string, string> = {
      "market-entry-advisory": "/services",
      "european-partner-network": "/services/expert-partner-sourcing",
      "sales-enablement": "/services/sales-enablement",
      "outsourced-sales": "/services/outsourced-sales",
    };

    const redirects = [
      { source: "/expertise", destination: "/services", permanent: true },
      { source: "/zh/expertise", destination: "/zh/services", permanent: true },
    ];

    for (const [from, to] of Object.entries(legacyServiceMap)) {
      redirects.push(
        { source: `/expertise/${from}`, destination: to, permanent: true },
        {
          source: `/zh/expertise/${from}`,
          destination: `/zh${to}`,
          permanent: true,
        },
      );
    }

    return redirects;
  },
};

export default nextConfig;
