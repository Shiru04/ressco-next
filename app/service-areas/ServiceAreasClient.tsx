"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { SERVICE_AREAS } from "@/lib/areas";
import Link from "next/link";

const REGIONS = ["All", "Southern California", "Inland Empire", "Bay Area", "Central Valley"];

export default function ServiceAreasClient() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICE_AREAS.filter((a) => {
      const matchesQuery = !q || a.name.toLowerCase().includes(q);
      const matchesRegion = region === "All" || a.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [query, region]);

  return (
    <>
      <Section className="pt-14 pb-10 bg-brand-gray">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            COVERAGE
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            We Serve All of California
          </h1>
          <p className="mt-4 text-lg text-black/70 max-w-prose">
            RESSCO Metals supplies HVAC contractors, sheet metal fabricators, and
            general contractors across the entire state of California — from
            Los Angeles and San Diego to San Francisco, Sacramento, and beyond.
            Expanding nationwide soon.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/contact" variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button href={`tel:${BUSINESS.phoneE164}`} variant="secondary" size="lg">
              Call {BUSINESS.phoneDisplay}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Find your city</h2>
            <p className="text-black/70">
              Sheet metal supply and HVAC fabrication available statewide.
            </p>
          </div>
          <div className="w-full md:w-[320px]">
            <label className="sr-only" htmlFor="city-search">Search city</label>
            <input
              id="city-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city…"
              className="w-full h-11 rounded-xl border border-black/10 px-4 outline-none focus:ring-2 focus:ring-brand-red/60"
            />
          </div>
        </div>

        {/* Region filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                region === r
                  ? "bg-black text-white border-black"
                  : "bg-white text-black/70 border-black/10 hover:border-black/30"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((area) => (
            <Card key={area.slug} className="p-5 flex flex-col gap-3">
              <div className="space-y-1">
                <p className="font-bold text-lg">{area.name}</p>
                <p className="text-xs font-semibold text-black/40 uppercase tracking-wide">{area.region}</p>
                <p className="text-sm text-black/70">{area.intro}</p>
              </div>
              <div className="flex gap-3 mt-auto">
                <Link
                  href="/contact"
                  className="text-sm font-semibold underline underline-offset-4 hover:text-brand-red"
                >
                  Request quote
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
