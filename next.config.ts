import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    // Vercel handles image optimization natively via the Image Optimization API.
    // No pre-generated variants needed.
    formats: ["image/avif", "image/webp"],
  },

  // ISR (revalidation) defaults to 0 (no ISR). Set on dynamic pages.
  // All static routes remain fully static (RSC rendering).
  // Next.js 14+ removed reactStrictMode config in favor of experimental;
  // removed to avoid warnings in Next 16.
  // reactStrictMode: true,

  // Reduce build output noise
  logging: {
    fetches: { fullUrl: false },
  },

  // Turbopack is default in Next.js 16 — empty config silences the webpack warning
  turbopack: {},

  // Compress responses
  compress: true,

  // Generate ETags for caching
  generateEtags: true,
};

export default nextConfig;
