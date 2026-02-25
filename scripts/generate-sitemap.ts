import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://resscometals.com"
)
  .trim()
  .replace(/\/+$/, "");

const TRAILING_SLASH = true;

function withSlash(p: string) {
  if (!p.startsWith("/")) p = `/${p}`;
  if (TRAILING_SLASH && !p.endsWith("/")) p = `${p}/`;
  return p;
}

function abs(p: string) {
  return `${SITE_URL}${withSlash(p)}`;
}

function xmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function importByPath(absPath: string) {
  const url = pathToFileURL(absPath).href;
  return import(url);
}

async function main() {
  const catalogPath = path.resolve(
    process.cwd(),
    "lib",
    "catalog.generated.ts",
  );
  if (!fs.existsSync(catalogPath)) {
    console.warn(
      "⚠️ catalog.generated.ts missing; run `npm run sync-catalog` first.",
    );
  }

  const catalogMod = fs.existsSync(catalogPath)
    ? await importByPath(catalogPath)
    : null;

  const CATEGORIES = (catalogMod?.CATEGORIES ?? []) as Array<{ path: string }>;
  const PRODUCTS = (catalogMod?.PRODUCTS ?? []) as Array<{ path: string }>;

  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/privacy-policy",
    "/product-list",
  ];

  const urls = new Set<string>();
  staticRoutes.forEach((r) => urls.add(abs(r)));

  // Category pages are already full Wix paths like /product-categories/...
  CATEGORIES.forEach((c) => c?.path && urls.add(abs(c.path)));
  // Product pages are already full Wix paths like /product-list/<slug>
  PRODUCTS.forEach((p) => p?.path && urls.add(abs(p.path)));

  const body = Array.from(urls)
    .sort()
    .map((u) => `  <url><loc>${xmlEscape(u)}</loc></url>`)
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`;

  const outPath = path.resolve(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");

  console.log(`✅ sitemap.xml generated: ${outPath}`);
  console.log(`✅ URLs: ${urls.size}`);
}

main().catch((err) => {
  console.error("❌ Failed to generate sitemap.xml");
  console.error(err);
  process.exit(1);
});
