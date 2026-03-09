import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    // Static export requires unoptimized: true (no server for on-demand optimization).
    // The prebuild optimize-images.ts script handles responsive variants via sharp.
    unoptimized: true,

    // Declare the formats the prebuild script produces so <Image> generates
    // correct <source> sets when used with a custom loader.
    formats: ["image/avif", "image/webp"],

    // Trim device-size list to match the widths the optimize-images script
    // actually generates — avoids Next producing unnecessary srcset entries.
    deviceSizes: [640, 960, 1200, 1600],
    imageSizes: [320, 420, 480, 768],
  },

  // Reduce build output noise
  logging: {
    fetches: { fullUrl: false },
  },

  // Turbopack is default in Next.js 16 — empty config silences the webpack warning
  turbopack: {},

  // Enable React strict mode for development quality
  reactStrictMode: true,

  // Compress static export output
  compress: true,

  // Generate ETags for caching
  generateEtags: true,
};

export default nextConfig;
