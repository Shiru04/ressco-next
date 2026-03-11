"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

function round(val: number): number {
  let r = Math.ceil(val);
  if (r > 10 && r % 2 !== 0) r += 1;
  return r;
}

const ASPECT_RATIOS = [
  { label: "1:1", value: 1 },
  { label: "1.5:1", value: 1.5 },
  { label: "2:1", value: 2 },
  { label: "3:1", value: 3 },
  { label: "4:1", value: 4 },
  { label: "5:1", value: 5 },
  { label: "6:1", value: 6 },
  { label: "8:1", value: 8 },
];

const inputClass =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black/90 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition";

const labelClass = "block text-xs font-extrabold tracking-wide text-black/60 mb-1.5";

const resultClass =
  "rounded-xl bg-brand-gray border border-black/5 px-4 py-3 text-center";

export function DuctCalculator() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <RectToRound />
      <RoundToRect />
    </div>
  );
}

function RectToRound() {
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  const a = parseFloat(height);
  const b = parseFloat(width);
  const valid = a > 0 && b > 0;
  const result = valid
    ? round(1.3 * Math.pow(a * b, 0.625) / Math.pow(a + b, 0.25))
    : null;

  return (
    <Card className="p-6 flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-extrabold">Rectangular to Round</h3>
        <p className="mt-1 text-sm text-black/60">
          Find the round equivalent of a rectangular duct.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>HEIGHT (in)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 12"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>WIDTH (in)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g. 24"
            className={inputClass}
          />
        </div>
      </div>

      <div className={resultClass}>
        <div className="text-xs font-extrabold tracking-wide text-black/50 mb-1">
          ROUND EQUIVALENT
        </div>
        <div className="text-3xl font-extrabold text-brand-red">
          {result !== null ? `${result}"` : "--"}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setHeight("");
          setWidth("");
        }}
        className="self-start rounded-xl px-4 py-2 text-sm font-semibold text-black/60 hover:bg-black/5 transition"
      >
        Reset
      </button>
    </Card>
  );
}

function RoundToRect() {
  const [diameter, setDiameter] = useState("");
  const [ratio, setRatio] = useState(2);

  const d = parseFloat(diameter);
  const valid = d > 0;

  let resultA: number | null = null;
  let resultB: number | null = null;

  if (valid) {
    const bRaw = (d * Math.pow(ratio + 1, 0.25)) / (1.3 * Math.pow(ratio, 0.625));
    resultB = round(bRaw);
    resultA = round(ratio * bRaw);
  }

  return (
    <Card className="p-6 flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-extrabold">Round to Rectangular</h3>
        <p className="mt-1 text-sm text-black/60">
          Find rectangular dimensions from a round duct.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>DIAMETER (in)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            placeholder="e.g. 18"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>ASPECT RATIO</label>
          <select
            value={ratio}
            onChange={(e) => setRatio(parseFloat(e.target.value))}
            className={inputClass}
          >
            {ASPECT_RATIOS.map((ar) => (
              <option key={ar.value} value={ar.value}>
                {ar.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={resultClass}>
          <div className="text-xs font-extrabold tracking-wide text-black/50 mb-1">
            WIDTH (a)
          </div>
          <div className="text-3xl font-extrabold text-brand-red">
            {resultA !== null ? `${resultA}"` : "--"}
          </div>
        </div>
        <div className={resultClass}>
          <div className="text-xs font-extrabold tracking-wide text-black/50 mb-1">
            HEIGHT (b)
          </div>
          <div className="text-3xl font-extrabold text-brand-red">
            {resultB !== null ? `${resultB}"` : "--"}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setDiameter("");
          setRatio(2);
        }}
        className="self-start rounded-xl px-4 py-2 text-sm font-semibold text-black/60 hover:bg-black/5 transition"
      >
        Reset
      </button>
    </Card>
  );
}
