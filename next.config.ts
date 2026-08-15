import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              // cdn.sanity.io serves uploaded images; api.sanity.io is the
              // embedded /studio app's own API traffic (browser-side, since
              // Studio is a client-rendered admin tool).
              "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://images.unsplash.com https://cdn.sanity.io",
              "frame-src 'self' https://www.google.com https://maps.google.com",
              "connect-src 'self' https://*.googleapis.com https://*.anthropic.com https://*.api.sanity.io https://*.apicdn.sanity.io",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
