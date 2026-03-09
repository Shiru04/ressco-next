"use client";

import { useState, useMemo } from "react";
import { useOrder } from "@/app/order/context/OrderContext";
import type { CatalogItem } from "@/app/order/context/OrderContext";
import { PUBLIC_SKUS } from "@/lib/catalog-helpers";
import { Button } from "@/components/ui/Button";

type Props = {
  productTitle: string;
  productSlugSafe: string;
};

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2";

const labelClass = "text-xs font-extrabold tracking-wide text-black/60";

export default function AddToOrderButton({
  productTitle,
  productSlugSafe,
}: Props) {
  const { addItem } = useOrder();

  const skus = useMemo(
    () =>
      PUBLIC_SKUS.filter((s) =>
        s.productSlugSafes.includes(productSlugSafe),
      ),
    [productSlugSafe],
  );

  const [selectedSkuId, setSelectedSkuId] = useState(() =>
    skus.length > 0 ? skus[0].id : "",
  );
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [showAdded, setShowAdded] = useState(false);

  if (skus.length === 0) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-soft">
        <p className="text-sm text-black/40">No SKUs available</p>
      </div>
    );
  }

  const selectedSku = skus.find((s) => s.id === selectedSkuId) ?? skus[0];

  function handleAdd() {
    const item: CatalogItem = {
      type: "catalog",
      skuId: selectedSku.id,
      skuCode: selectedSku.sku,
      productName: productTitle,
      qty,
      notes,
    };

    addItem(item);

    setQty(1);
    setNotes("");
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-4">
        {/* SKU selector */}
        {skus.length > 1 && (
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>SKU</span>
            <select
              className={inputClass}
              value={selectedSkuId}
              onChange={(e) => setSelectedSkuId(e.target.value)}
            >
              {skus.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.sku} &mdash; {s.productDescription}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* Single SKU display */}
        {skus.length === 1 && (
          <p className="text-sm text-black/60">
            <span className={labelClass}>SKU</span>{" "}
            <span className="ml-1 font-medium text-black">
              {selectedSku.sku}
            </span>
          </p>
        )}

        {/* Quantity */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>QTY</span>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className={inputClass}
          />
        </label>

        {/* Notes */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>NOTES</span>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special instructions..."
            className={inputClass}
          />
        </label>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleAdd}>
            Add to Order
          </Button>

          {showAdded && (
            <span className="text-sm font-semibold text-green-600 animate-pulse">
              Added!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
