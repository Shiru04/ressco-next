import fs from "node:fs";
import path from "node:path";

type Row = Record<string, string>;

const DATA_DIR = path.resolve(process.cwd(), "data");
const OUT_FILE = path.resolve(process.cwd(), "lib", "catalog.generated.ts");

function readFileUtf8(p: string) {
  return fs.readFileSync(p, "utf8");
}

// Minimal CSV parser (handles quotes, commas, newlines in quoted fields)
function parseCsv(csvText: string): Row[] {
  const text = csvText.replace(/^\uFEFF/, ""); // strip BOM
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        const next = text[i + 1];
        if (next === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
      continue;
    }

    if (c === ",") {
      row.push(field);
      field = "";
      continue;
    }

    if (c === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
      continue;
    }

    if (c === "\r") continue;

    field += c;
  }

  // last field
  row.push(field);
  rows.push(row);

  const header = rows.shift() ?? [];
  const cleanHeader = header.map((h) => h.trim());

  const out: Row[] = [];
  for (const r of rows) {
    if (r.length === 1 && r[0]?.trim() === "") continue;
    const obj: Row = {};
    for (let i = 0; i < cleanHeader.length; i++) {
      obj[cleanHeader[i]] = (r[i] ?? "").trim();
    }
    out.push(obj);
  }
  return out;
}

function slugFromPath(p: string): string {
  // expects /product-categories/foo or /product-list/bar
  const parts = p.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

function safeSlug(input: string): string {
  // decode %xx and normalize into file-safe slug
  let s = input;
  try {
    s = decodeURIComponent(s);
  } catch {
    // keep original if malformed
  }
  s = s
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "item";
}

function toNumber(s: string): number | null {
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

async function main() {
  const categoriesCsv = path.join(DATA_DIR, "Product+Categories.csv");
  const productsCsv = path.join(DATA_DIR, "Product+List.csv");
  const skusCsv = path.join(DATA_DIR, "SKU.csv");

  if (
    !fs.existsSync(categoriesCsv) ||
    !fs.existsSync(productsCsv) ||
    !fs.existsSync(skusCsv)
  ) {
    console.error("[sync-catalog] Missing CSV(s) in /data");
    console.error("Expected:");
    console.error(" - data/Product+Categories.csv");
    console.error(" - data/Product+List.csv");
    console.error(" - data/SKU.csv");
    process.exit(1);
  }

  const categoriesRows = parseCsv(readFileUtf8(categoriesCsv));
  const productsRows = parseCsv(readFileUtf8(productsCsv));
  const skusRows = parseCsv(readFileUtf8(skusCsv));

  const categories = categoriesRows
    .filter((r) => (r["Status"] || "").toUpperCase() === "PUBLISHED")
    .map((r) => {
      const pathStr = r["Product Categories (Item)"] || "";
      const slug = slugFromPath(pathStr);
      return {
        id: r["ID"] || "",
        title: r["Title"] || "",
        path: pathStr,
        slug,
        imagePlaceholder: `/products/categories/${safeSlug(slug)}.webp`,
      };
    })
    .filter((c) => c.slug && c.path);

  const products = productsRows
    .filter((r) => (r["Status"] || "").toUpperCase() === "PUBLISHED")
    .map((r) => {
      const productPath = r["Product List (Item)"] || "";
      const slugRaw = slugFromPath(productPath);
      const slugSafe = safeSlug(slugRaw);

      // category IDs are in ProductCategories_multireference as JSON-ish string:
      // ["<id>","<id>"]
      const catIdsRaw = r["ProductCategories_multireference"] || "";
      const catIds = Array.from(
        catIdsRaw.matchAll(
          /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
        ),
      ).map((m) => m[0]);

      return {
        id: r["ID"] || "",
        title: (r["Title"] || "").replace(/\s+/g, " ").trim(),
        path: productPath,
        slugRaw,
        slugSafe,
        categoryIds: catIds,
        imagePlaceholder: `/products/items/${slugSafe}.webp`,
      };
    })
    .filter((p) => p.slugRaw && p.path);

  const skus = skusRows
    .filter((r) => (r["Status"] || "").toUpperCase() === "PUBLISHED")
    .map((r) => {
      const prodIdsRaw = r["ProductList_multireference"] || "";
      const productIds = Array.from(
        prodIdsRaw.matchAll(
          /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
        ),
      ).map((m) => m[0]);
      return {
        sku: r["SKU"] || "",
        productDescription: (r["Product Description"] || "")
          .replace(/\s+/g, " ")
          .trim(),
        cost: toNumber(r["Cost"] || ""),
        itemName: (r["Item name"] || "").replace(/\s+/g, " ").trim(),
        productIds,
        id: r["ID"] || "",
      };
    })
    .filter((s) => s.sku);

  // Map category IDs to slugs for convenient runtime use
  const categoryIdToSlug = new Map(categories.map((c) => [c.id, c.slug]));
  const productIdToSlugSafe = new Map(products.map((p) => [p.id, p.slugSafe]));

  const productsEnriched = products.map((p) => ({
    ...p,
    categorySlugs: p.categoryIds
      .map((id) => categoryIdToSlug.get(id))
      .filter(Boolean) as string[],
  }));

  const skusEnriched = skus.map((s) => ({
    ...s,
    productSlugSafes: s.productIds
      .map((id) => productIdToSlugSafe.get(id))
      .filter(Boolean) as string[],
  }));

  const out = `/* eslint-disable */
// AUTO-GENERATED by scripts/sync-catalog.ts
// Source of Truth: data/Product+Categories.csv, data/Product+List.csv, data/SKU.csv

export type CatalogCategory = {
  id: string;
  title: string;
  path: string; // Wix path (encoded)
  slug: string; // last segment from path (encoded)
  imagePlaceholder: string; // /public path
};

export type CatalogProduct = {
  id: string;
  title: string;
  path: string; // Wix path (encoded)
  slugRaw: string; // last segment from path (encoded)
  slugSafe: string; // safe slug for filenames
  categoryIds: string[];
  categorySlugs: string[];
  imagePlaceholder: string; // /public path
};

export type CatalogSku = {
  id: string;
  sku: string;
  productDescription: string;
  cost: number | null;
  itemName: string;
  productIds: string[];
  productSlugSafes: string[];
};

export const CATEGORIES: CatalogCategory[] = ${JSON.stringify(categories, null, 2)} as any;
export const PRODUCTS: CatalogProduct[] = ${JSON.stringify(productsEnriched, null, 2)} as any;
export const SKUS: CatalogSku[] = ${JSON.stringify(skusEnriched, null, 2)} as any;
`;

  await fs.promises.mkdir(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, out, "utf8");

  console.log(
    `[sync-catalog] OK categories=${categories.length} products=${products.length} skus=${skus.length}`,
  );
  console.log(`[sync-catalog] wrote: ${OUT_FILE}`);
}

main().catch((err) => {
  console.error("[sync-catalog] failed", err);
  process.exit(1);
});
