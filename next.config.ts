import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  async headers() {
    // Long-term caching only in production. In dev it can make the browser
    // keep a stale or missing video for a year.
    if (!isProd) return [];
    return [
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;