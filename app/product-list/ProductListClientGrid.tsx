"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

type Product = {
  id: string;
  title: string;
  path: string;
  imagePlaceholder: string;
  categorySlugs: string[];
};

type Category = {
  slug: string;
  title: string;
  path: string;
};

function Chip(props: { href: string; label: string }) {
  return (
    <Link
      href={props.href}
      className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/70 hover:bg-black/5
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
    >
      {props.label}
    </Link>
  );
}

export default function ProductListClientGrid(props: {
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const titleBySlug = useMemo(() => {
    const map = new Map(props.categories.map((c) => [c.slug, c.title]));
    return (slug: string) => map.get(slug) ?? slug;
  }, [props.categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return props.products.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q);
      const matchesCat =
        category === "all" || p.categorySlugs.includes(category);
      return matchesQuery && matchesCat;
    });
  }, [props.products, query, category]);

  return (
    <>
      {/* Controls */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:items-end">
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
        <Link
          href="/product-categories"
          className="font-semibold text-black/70 hover:text-black hover:underline"
        >
          Browse categories →
        </Link>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link key={p.id} href={p.path} className="group">
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <ResponsiveImage
                  srcBase={p.imagePlaceholder.replace(".webp", "")}
                  alt={p.title}
                  fill
                  widths={[320, 480, 640, 960]}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>

              <div className="p-5">
                <div className="text-lg font-extrabold">{p.title}</div>

                {p.categorySlugs.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.categorySlugs.slice(0, 3).map((slug) => (
                      <Chip
                        key={slug}
                        href={`/product-categories/${slug}`}
                        label={titleBySlug(slug)}
                      />
                    ))}
                    {p.categorySlugs.length > 3 ? (
                      <span className="text-xs text-black/50">
                        +{p.categorySlugs.length - 3}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-3 text-sm text-black/60">
                  Check all sizes →
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70">
          No products found. Try a different search or category.
        </div>
      ) : null}
    </>
  );
}
