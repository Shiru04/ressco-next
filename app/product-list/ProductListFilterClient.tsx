"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  title: string;
  path: string;
  categorySlugs: string[];
};

type Category = {
  slug: string;
  title: string;
  path: string;
};

export default function ProductListFilterClient(props: {
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categoryTitle = useMemo(() => {
    const map = new Map(props.categories.map((c) => [c.slug, c.title]));
    return (slug: string) => map.get(slug) ?? slug;
  }, [props.categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return props.products.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q);
      const matchesCat =
        category === "all" || p.categorySlugs?.includes(category);
      return matchesQuery && matchesCat;
    });
  }, [props.products, query, category]);

  return (
    <div className="mt-6">
      <div className="grid gap-3 sm:grid-cols-3 sm:items-end">
        <div className="sm:col-span-2">
          <label className="block text-xs font-extrabold tracking-wide text-black/60">
            Search products
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a product name…"
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-soft
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold tracking-wide text-black/60">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-soft
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          >
            <option value="all">All categories</option>
            {props.categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-black/60">
        <div>
          Showing{" "}
          <span className="font-semibold text-black/80">{filtered.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-black/80">
            {props.products.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/product-categories"
            className="font-semibold text-black/70 hover:text-black hover:underline"
          >
            Browse categories →
          </Link>
          {category !== "all" ? (
            <span className="text-black/50">
              Filter:{" "}
              <span className="font-semibold text-black/70">
                {categoryTitle(category)}
              </span>
            </span>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70">
          No products found. Try a different search or category.
        </div>
      ) : null}

      {/* This component only filters; the grid stays in the server page */}
    </div>
  );
}
