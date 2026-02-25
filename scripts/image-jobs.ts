import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export type Job = {
  inputFromPublic: string; // relative to /public
  widths: number[];
  webpQuality?: number;
  avifQuality?: number;
};

export const PUBLIC_DIR = path.join(process.cwd(), "public");

async function importByPath(absPath: string) {
  const url = pathToFileURL(absPath).href;
  return import(url);
}

export async function getCatalogPlaceholders(): Promise<{
  categoryImages: string[];
  productImages: string[];
}> {
  const genPath = path.resolve(process.cwd(), "lib", "catalog.generated.ts");
  if (!fs.existsSync(genPath)) {
    return { categoryImages: [], productImages: [] };
  }

  const mod = await importByPath(genPath);
  const CATEGORIES = (mod.CATEGORIES ?? []) as Array<{
    imagePlaceholder?: string;
  }>;
  const PRODUCTS = (mod.PRODUCTS ?? []) as Array<{ imagePlaceholder?: string }>;

  return {
    categoryImages: CATEGORIES.map((c) => c.imagePlaceholder).filter(
      Boolean,
    ) as string[],
    productImages: PRODUCTS.map((p) => p.imagePlaceholder).filter(
      Boolean,
    ) as string[],
  };
}

export async function getJobs(): Promise<Job[]> {
  // Core marketing placeholders
  const base: Job[] = [
    {
      inputFromPublic: "hero/home-hero.webp",
      widths: [420, 640, 768, 960, 1200],
      webpQuality: 72,
      avifQuality: 48,
    },
    {
      inputFromPublic: "hero/about-hero.webp",
      widths: [640, 960, 1200, 1600],
      webpQuality: 70,
      avifQuality: 46,
    },
    {
      inputFromPublic: "hero/contact-banner.webp",
      widths: [640, 960, 1200, 1600],
      webpQuality: 70,
      avifQuality: 46,
    },

    {
      inputFromPublic: "about/about-1.webp",
      widths: [420, 640, 820],
      webpQuality: 72,
      avifQuality: 48,
    },
    {
      inputFromPublic: "about/about-2.webp",
      widths: [420, 640, 820],
      webpQuality: 72,
      avifQuality: 48,
    },
    {
      inputFromPublic: "about/about-3.webp",
      widths: [420, 640, 820],
      webpQuality: 72,
      avifQuality: 48,
    },
    {
      inputFromPublic: "about/mission-hero.webp",
      widths: [640, 960, 1200, 1600],
      webpQuality: 70,
      avifQuality: 46,
    },

    {
      inputFromPublic: "brand/footer-metal.webp",
      widths: [640, 960, 1200, 1600],
      webpQuality: 70,
      avifQuality: 46,
    },
    {
      inputFromPublic: "brand/ressco-badge.webp",
      widths: [256, 384, 512, 768],
      webpQuality: 74,
      avifQuality: 50,
    },
  ];

  // Catalog placeholders derived from CSV (safe slugs for filenames)
  const { categoryImages, productImages } = await getCatalogPlaceholders();

  const catalogJobs: Job[] = [
    ...categoryImages.map((p) => ({
      inputFromPublic: p.replace(/^\//, ""), // remove leading /
      widths: [320, 480, 640, 960],
      webpQuality: 72,
      avifQuality: 48,
    })),
    ...productImages.map((p) => ({
      inputFromPublic: p.replace(/^\//, ""),
      widths: [320, 480, 640, 960],
      webpQuality: 72,
      avifQuality: 48,
    })),
  ];

  return [...base, ...catalogJobs];
}
