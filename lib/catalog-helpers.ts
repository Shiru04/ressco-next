import { CATEGORIES, PRODUCTS, SKUS } from "@/lib/catalog";

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function normalizeSlug(s: string) {
  return safeDecode(s).trim().toLowerCase();
}

export function getCategoryByRouteSlug(routeSlug: string) {
  const r = normalizeSlug(routeSlug);
  return CATEGORIES.find((c) => normalizeSlug(c.slug) === r) ?? null;
}

export function getProductByRouteSlug(routeSlug: string) {
  const r = normalizeSlug(routeSlug);
  return (
    PRODUCTS.find((p) => normalizeSlug(p.slugRaw) === r) ??
    PRODUCTS.find((p) => normalizeSlug(safeDecode(p.slugRaw)) === r) ??
    null
  );
}

export function getProductsForCategorySlug(categorySlug: string) {
  const r = normalizeSlug(categorySlug);
  return PRODUCTS.filter((p) =>
    p.categorySlugs.some((cs) => normalizeSlug(cs) === r),
  );
}

export function getSkusForProductSafeSlug(productSlugSafe: string) {
  const s = productSlugSafe.trim().toLowerCase();
  return SKUS.filter((k) => k.productSlugSafes.some((x) => x === s));
}
