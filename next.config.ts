import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Old short property URLs -> current SEO slugs (permanent redirects).
  async redirects() {
    return [
      { source: "/properties/ravet", destination: "/properties/hotel-ravet-pune", permanent: true },
      {
        source: "/properties/hinjewadi-phase-3",
        destination: "/properties/hotel-hinjewadi-phase-3-pune",
        permanent: true,
      },
      { source: "/properties/lonavala", destination: "/properties/resort-lonavala", permanent: true },
    ];
  },
};

export default nextConfig;
