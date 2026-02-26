import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { PRODUCTS, CATEGORIES } from "@/lib/catalog";
import ProductListClientGrid from "./ProductListClientGrid";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Product List | RESSCO Metals — HVAC Sheet Metal Supply California",
  description:
    "Browse the full RESSCO Metals product catalog — HVAC ductwork, galvanized steel, fittings, flex duct, dampers, and specialty sheet metal components. Serving contractors across California.",
  path: "/product-list",
});

export default function ProductListPage() {
  return (
    <Section className="pt-10 sm:pt-14 pb-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-black/50">
            <Link href="/product-categories" className="hover:text-black font-semibold">
              ← Products
            </Link>
            <span>/</span>
            <span>All Items</span>
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Product List
          </h1>
          <p className="mt-3 text-black/70">
            Browse all products. Filter by name or category.
          </p>
        </div>
      </div>

      <ProductListClientGrid
        products={PRODUCTS.map((p) => ({
          id: p.id,
          title: p.title,
          path: p.path,
          imagePlaceholder: p.imagePlaceholder,
          categorySlugs: p.categorySlugs,
        }))}
        categories={CATEGORIES.map((c) => ({
          slug: c.slug,
          title: c.title,
          path: c.path,
        }))}
      />
    </Section>
  );
}
