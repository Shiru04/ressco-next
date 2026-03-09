"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useOrder, type FabricationItem } from "../context/OrderContext";
import { FIELD_LABELS, inputClass } from "../lib/constants";

/* ── Types for API catalog ──────────────────────────────── */

type PieceField = {
  key: string;
  label?: string;
};

type PieceType = {
  typeCode: string;
  name: string;
  shape: "rectangular" | "round";
  fields: PieceField[];
};

/* ── Piece form ─────────────────────────────────────────── */

function PieceForm({
  piece,
  onDone,
}: {
  piece: PieceType;
  onDone: () => void;
}) {
  const { addItem } = useOrder();
  const [measurements, setMeasurements] = useState<Record<string, number>>({});
  const [qty, setQty] = useState(1);
  const [ga, setGa] = useState("26");
  const [material, setMaterial] = useState("Galvanized");
  const [remarks, setRemarks] = useState("");

  function updateMeasurement(key: string, val: string) {
    setMeasurements((prev) => ({
      ...prev,
      [key]: val === "" ? 0 : Number(val),
    }));
  }

  function handleAdd() {
    if (qty < 1) return;
    const item: FabricationItem = {
      type: "fabrication",
      typeCode: piece.typeCode,
      shape: piece.shape,
      qty,
      ga,
      material,
      measurements: { ...measurements },
      remarks,
    };
    addItem(item);
    onDone();
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-extrabold">{piece.name}</h3>
          <p className="text-xs text-black/50">
            {piece.typeCode} &middot;{" "}
            {piece.shape === "rectangular" ? "Rectangular" : "Round"}
          </p>
        </div>
        <button
          onClick={onDone}
          className="text-black/40 hover:text-black transition"
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

      {/* Measurement fields */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {piece.fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-extrabold tracking-wide text-black/60">
              {FIELD_LABELS[f.key] ?? f.label ?? f.key}
            </label>
            <input
              type="number"
              step="any"
              min={0}
              value={measurements[f.key] ?? ""}
              onChange={(e) => updateMeasurement(f.key, e.target.value)}
              placeholder="0"
              className={`mt-2 ${inputClass}`}
            />
          </div>
        ))}
      </div>

      {/* Qty + gauge + material */}
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-extrabold tracking-wide text-black/60">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label className="block text-xs font-extrabold tracking-wide text-black/60">
            Gauge
          </label>
          <select
            value={ga}
            onChange={(e) => setGa(e.target.value)}
            className={`mt-2 ${inputClass}`}
          >
            {["30", "28", "26", "24", "22", "20", "18", "16"].map((g) => (
              <option key={g} value={g}>
                {g} ga
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-extrabold tracking-wide text-black/60">
            Material
          </label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className={`mt-2 ${inputClass}`}
          >
            {["Galvanized", "Galvannealed", "Stainless Steel", "Aluminum", "Black Iron"].map(
              (m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      {/* Remarks */}
      <div className="mt-4">
        <label className="block text-xs font-extrabold tracking-wide text-black/60">
          Remarks (optional)
        </label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={2}
          className={`mt-2 ${inputClass} resize-none`}
          placeholder="Special instructions..."
        />
      </div>

      {/* Submit */}
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" onClick={onDone} className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAdd} className="flex-1">
          Add to Order
        </Button>
      </div>
    </Card>
  );
}

/* ── Main fabrication page ──────────────────────────────── */

export default function FabricationPage() {
  const { itemCount } = useOrder();
  const [pieces, setPieces] = useState<PieceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"rectangular" | "round">("rectangular");
  const [activePiece, setActivePiece] = useState<PieceType | null>(null);

  // Fetch piece catalog from hub API
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_HUB_API_URL;
    if (!url) {
      setError("Hub API URL is not configured.");
      setLoading(false);
      return;
    }
    fetch(`${url}/api/takeoff/catalog`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // API may return { types: [...] } or an array directly
        const types: PieceType[] = Array.isArray(data)
          ? data
          : data.types ?? data.pieces ?? [];
        setPieces(types);
      })
      .catch((err) => {
        setError("Failed to load fabrication catalog. Please try again later.");
        console.error("Fabrication catalog error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPieces = useMemo(
    () => pieces.filter((p) => p.shape === tab),
    [pieces, tab],
  );

  return (
    <>
      <Section>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Custom Fabrication
        </h1>
        <p className="mt-2 text-sm text-black/60">
          Specify exact dimensions for custom sheet metal pieces.
        </p>

        {/* ── Shape tabs ────────────────────────────────────── */}
        <div className="mt-6 flex gap-2">
          {(["rectangular", "round"] as const).map((shape) => (
            <button
              key={shape}
              onClick={() => {
                setTab(shape);
                setActivePiece(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                tab === shape
                  ? "bg-black text-white border-black"
                  : "bg-white text-black/60 border-black/10 hover:border-black/30"
              }`}
            >
              {shape === "rectangular" ? "Rectangular" : "Round"}
            </button>
          ))}
        </div>

        {/* ── Loading / error ───────────────────────────────── */}
        {loading && (
          <div className="mt-8 text-sm text-black/50">
            Loading fabrication catalog...
          </div>
        )}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ── Active piece form ─────────────────────────────── */}
        {activePiece && (
          <div className="mt-6">
            <PieceForm
              key={activePiece.typeCode}
              piece={activePiece}
              onDone={() => setActivePiece(null)}
            />
          </div>
        )}

        {/* ── Piece type grid ───────────────────────────────── */}
        {!loading && !error && !activePiece && (
          <>
            {filteredPieces.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70">
                No {tab} piece types found.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPieces.map((p) => (
                  <Card
                    key={p.typeCode}
                    className="cursor-pointer p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <button
                      onClick={() => setActivePiece(p)}
                      className="w-full text-left"
                    >
                      <div className="text-base font-extrabold">
                        {p.name}
                      </div>
                      <p className="mt-1 text-xs text-black/50">
                        {p.typeCode} &middot; {p.fields.length} measurement
                        {p.fields.length !== 1 ? "s" : ""}
                      </p>
                      <div className="mt-3 text-sm text-black/50 hover:text-brand-red transition">
                        Configure &amp; add &rarr;
                      </div>
                    </button>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </Section>

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
