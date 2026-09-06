import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  poweredByHeader: false,
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
