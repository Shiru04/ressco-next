import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { PRODUCTS, CATEGORIES } from "@/lib/catalog";
import ProductListClientGrid from "./ProductListFilterClient";

export const metadata = buildMetadata({
  title: "Product List | RESSCO Metals",
  description: "Browse RESSCO Metals product list.",
  path: "/product-list",
});

export default function ProductListPage() {
  return (
    <Section className="pt-10 sm:pt-14 pb-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            CATALOG
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Product List
          </h1>
          <p className="mt-3 text-black/70">
            Browse products. Filter by name or category.
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
