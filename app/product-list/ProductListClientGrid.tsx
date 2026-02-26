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
      {/* ── Filters ─────────────────────────────────────────── */}
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

      {/* ── Count + active filter pill ───────────────────────── */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-black/60">
        <div className="flex items-center gap-3">
          <span>
            Showing{" "}
            <span className="font-semibold text-black/80">{filtered.length}</span>
            {" "}of{" "}
            <span className="font-semibold text-black/80">{props.products.length}</span>{" "}
            products
          </span>
          {category !== "all" && (
            <button
              onClick={() => setCategory("all")}
              className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/70 hover:bg-black/10 transition"
            >
              {titleBySlug(category)} ✕
            </button>
          )}
        </div>
        <Link
          href="/product-categories"
          className="font-semibold text-black/70 hover:text-black hover:underline"
        >
          Browse by category →
        </Link>
      </div>

      {/* ── Category filter chips ─────────────────────────────── */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
            category === "all"
              ? "bg-black text-white border-black"
              : "bg-white text-black/60 border-black/10 hover:border-black/30"
          }`}
        >
          All
        </button>
        {props.categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              category === c.slug
                ? "bg-black text-white border-black"
                : "bg-white text-black/60 border-black/10 hover:border-black/30"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* ── Product grid ─────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70">
          No products found. Try a different search or category.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.id} href={p.path} className="group">
              <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
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
                  <div className="text-base font-extrabold">{p.title}</div>
                  {p.categorySlugs.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.categorySlugs.slice(0, 2).map((slug) => (
                        <span
                          key={slug}
                          className="text-xs px-2 py-0.5 rounded-full bg-black/5 text-black/50 font-semibold"
                        >
                          {titleBySlug(slug)}
                        </span>
                      ))}
                      {p.categorySlugs.length > 2 && (
                        <span className="text-xs text-black/40">
                          +{p.categorySlugs.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-3 text-sm text-black/50 group-hover:text-brand-red transition">
                    View sizes & SKUs →
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
