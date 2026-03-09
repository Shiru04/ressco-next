"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useOrder, type CatalogItem, type FabricationItem } from "@/app/order/context/OrderContext";
import { FIELD_LABELS } from "@/app/order/lib/constants";
import { Button } from "@/components/ui/Button";

/* ── Cart Button ──────────────────────────────────────── */

function CartButton({ onClick, itemCount }: { onClick: () => void; itemCount: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open cart"
      className="relative text-white/80 hover:text-white transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993
             1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125
             0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513
             7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625
             10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75
             0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>

      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold leading-none text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}

/* ── Catalog item row ─────────────────────────────────── */

function CatalogRow({ item, onRemove }: { item: CatalogItem; onRemove: () => void }) {
  return (
    <div className="flex flex-col gap-1 py-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-extrabold text-black truncate">{item.productName}</p>
          <p className="text-xs text-black/60">{item.skuCode}</p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-black/60">Qty {item.qty}</span>
      </div>
      {item.notes && <p className="text-xs text-black/50 italic">{item.notes}</p>}
      <button type="button" onClick={onRemove} className="self-start text-xs font-semibold text-red-500 hover:text-red-700 transition">
        Remove
      </button>
    </div>
  );
}

/* ── Fabrication item row ─────────────────────────────── */

function FabricationRow({ item, onRemove }: { item: FabricationItem; onRemove: () => void }) {
  const nonZero = Object.entries(item.measurements).filter(([, v]) => v !== 0);

  return (
    <div className="flex flex-col gap-1 py-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-extrabold text-black truncate">{item.typeCode}</p>
          <p className="text-xs text-black/60">
            {item.shape} / {item.ga} / {item.material}
          </p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-black/60">Qty {item.qty}</span>
      </div>

      {nonZero.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {nonZero.map(([key, val]) => (
            <span key={key} className="text-xs text-black/60">
              {FIELD_LABELS[key] ?? key}: <span className="font-semibold text-black">{val}</span>
            </span>
          ))}
        </div>
      )}

      {item.remarks && <p className="text-xs text-black/50 italic">{item.remarks}</p>}
      <button type="button" onClick={onRemove} className="self-start text-xs font-semibold text-red-500 hover:text-red-700 transition">
        Remove
      </button>
    </div>
  );
}

/* ── Cart Drawer (full component) ─────────────────────── */

export default function CartDrawer() {
  const { order, removeItem, itemCount } = useOrder();
  const [open, setOpen] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <CartButton onClick={() => setOpen(true)} itemCount={itemCount} />

      {/* Drawer overlay + panel — portaled to body to escape header stacking context */}
      {open && createPortal(
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* Panel */}
          <div
            className="absolute right-0 top-0 h-full w-[90vw] max-w-md bg-white shadow-2xl border-l border-black/10 flex flex-col animate-slide-in-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-extrabold text-black">Your Order</h2>
                <span className="text-xs text-black/60">({itemCount} items)</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-black/40 hover:text-black transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            {itemCount === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
                <p className="text-sm text-black/60">Your order is empty</p>
                <Button href="/product-list" onClick={() => setOpen(false)}>
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 divide-y divide-black/5">
                {order.items.map((item, idx) =>
                  item.type === "catalog" ? (
                    <CatalogRow key={idx} item={item} onRemove={() => removeItem(idx)} />
                  ) : (
                    <FabricationRow key={idx} item={item} onRemove={() => removeItem(idx)} />
                  ),
                )}
              </div>
            )}

            {/* Footer */}
            {itemCount > 0 && (
              <div className="border-t border-black/5 px-5 py-4 flex flex-col gap-2">
                <Button href="/order/review" onClick={() => setOpen(false)} className="w-full">
                  Checkout
                </Button>
                <Button
                  href="/order/fabrication"
                  onClick={() => setOpen(false)}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  + Add Custom Fabrication
                </Button>
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
