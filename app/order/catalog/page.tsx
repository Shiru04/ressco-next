"use client";

import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  CATEGORIES,
  PRODUCTS,
  type CatalogProduct,
} from "@/lib/catalog.generated";
import { PUBLIC_SKUS, type PublicSku } from "@/lib/catalog-helpers";
import { useOrder, type CatalogItem } from "../context/OrderContext";
import { inputClass } from "../lib/constants";

/* ── Helpers ────────────────────────────────────────────── */

function skusForProduct(product: CatalogProduct): PublicSku[] {
  return PUBLIC_SKUS.filter((s) => s.productIds.includes(product.id));
}

/* ── Add-to-order modal ─────────────────────────────────── */

function AddModal({
  product,
  onClose,
}: {
  product: CatalogProduct;
  onClose: () => void;
}) {
  const { addItem } = useOrder();
  const productSkus = useMemo(() => skusForProduct(product), [product]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const [selectedSkuId, setSelectedSkuId] = useState(
    productSkus[0]?.id ?? "",
  );
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  const selectedSku = productSkus.find((s) => s.id === selectedSkuId);

  function handleAdd() {
    if (!selectedSku || qty < 1) return;
    const item: CatalogItem = {
      type: "catalog",
      skuId: selectedSku.id,
      skuCode: selectedSku.sku,
      productName: product.title,
      qty,
      notes,
    };
    addItem(item);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <Card className="w-full max-w-md p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-extrabold">{product.title}</h3>
          <button
            onClick={onClose}
            className="ml-4 text-black/40 hover:text-black transition"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* SKU selector */}
        <label className="mt-5 block text-xs font-extrabold tracking-wide text-black/60">
          Select SKU
        </label>
        {productSkus.length === 0 ? (
          <p className="mt-2 text-sm text-black/50">
            No SKUs available for this product.
          </p>
        ) : (
          <select
            value={selectedSkuId}
            onChange={(e) => setSelectedSkuId(e.target.value)}
            className={`mt-2 ${inputClass}`}
          >
            {productSkus.map((s) => (
              <option key={s.id} value={s.id}>
                {s.sku} — {s.productDescription}
              </option>
            ))}
          </select>
        )}

        {/* Quantity */}
        <label className="mt-4 block text-xs font-extrabold tracking-wide text-black/60">
          Quantity
        </label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
          className={`mt-2 ${inputClass}`}
        />

        {/* Notes */}
        <label className="mt-4 block text-xs font-extrabold tracking-wide text-black/60">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className={`mt-2 ${inputClass} resize-none`}
          placeholder="Any special instructions..."
        />

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
            className="flex-1"
          >
            Add to Order
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ── Main catalog page ──────────────────────────────────── */

export default function CatalogPage() {
  const { itemCount } = useOrder();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [modalProduct, setModalProduct] = useState<CatalogProduct | null>(
    null,
  );

  const titleBySlug = useMemo(() => {
    const map = new Map(CATEGORIES.map((c) => [c.slug, c.title]));
    return (slug: string) => map.get(slug) ?? slug;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q);
      const matchesCat =
        category === "all" || p.categorySlugs.includes(category);
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

  return (
    <>
      <Section>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Product Catalog
        </h1>
        <p className="mt-2 text-sm text-black/60">
          Browse our full catalog and add items to your order.
        </p>

        {/* ── Filters ───────────────────────────────────────── */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:items-end">
          <div className="sm:col-span-2">
            <label className="block text-xs font-extrabold tracking-wide text-black/60">
              Search products
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a product name..."
              className={`mt-2 ${inputClass}`}
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold tracking-wide text-black/60">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`mt-2 ${inputClass}`}
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Count + active filter ─────────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-black/60">
          <div className="flex items-center gap-3">
            <span>
              Showing{" "}
              <span className="font-semibold text-black/80">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-black/80">
                {PRODUCTS.length}
              </span>{" "}
              products
            </span>
            {category !== "all" && (
              <button
                onClick={() => setCategory("all")}
                className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/70 hover:bg-black/10 transition"
              >
                {titleBySlug(category)} &times;
              </button>
            )}
          </div>
        </div>

        {/* ── Category chips ────────────────────────────────── */}
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
          {CATEGORIES.map((c) => (
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

        {/* ── Product grid ──────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70">
            No products found. Try a different search or category.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Card
                key={p.id}
                className="flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex-1 p-5">
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
                  <p className="mt-2 text-xs text-black/50">
                    {skusForProduct(p).length} SKU
                    {skusForProduct(p).length !== 1 ? "s" : ""} available
                  </p>
                </div>
                <div className="border-t border-black/5 px-5 py-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setModalProduct(p)}
                    className="w-full"
                  >
                    Add to Order
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* ── Modal ───────────────────────────────────────────── */}
      {modalProduct && (
        <AddModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}

      {/* ── Sticky cart bar ─────────────────────────────────── */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur-sm shadow-soft">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <span className="text-sm font-semibold text-black/70">
              <span className="text-brand-primary">{itemCount}</span>{" "}
              {itemCount === 1 ? "item" : "items"} in your order
            </span>
            <Button href="/order/review" variant="primary" size="sm">
              Review Order
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
