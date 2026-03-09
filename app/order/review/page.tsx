"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  useOrder,
  type CatalogItem,
  type FabricationItem,
} from "../context/OrderContext";
import { FIELD_LABELS, inputClass } from "../lib/constants";

/* ── Item display helpers ───────────────────────────────── */

function CatalogRow({
  item,
  onRemove,
}: {
  item: CatalogItem;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-extrabold">{item.productName}</div>
        <div className="mt-0.5 text-xs text-black/50">
          SKU: {item.skuCode} &middot; Qty: {item.qty}
        </div>
        {item.notes && (
          <div className="mt-1 text-xs text-black/40 italic">
            {item.notes}
          </div>
        )}
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 text-xs font-semibold text-red-500 hover:text-red-700 transition"
      >
        Remove
      </button>
    </div>
  );
}

function FabricationRow({
  item,
  onRemove,
}: {
  item: FabricationItem;
  onRemove: () => void;
}) {
  const dims = Object.entries(item.measurements)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `${FIELD_LABELS[k] ?? k}: ${v}`)
    .join(", ");

  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-extrabold">{item.typeCode}</div>
        <div className="mt-0.5 text-xs text-black/50">
          {item.shape === "rectangular" ? "Rect" : "Round"} &middot;{" "}
          {item.ga} ga {item.material} &middot; Qty: {item.qty}
        </div>
        {dims && (
          <div className="mt-1 text-xs text-black/40">{dims}</div>
        )}
        {item.remarks && (
          <div className="mt-1 text-xs text-black/40 italic">
            {item.remarks}
          </div>
        )}
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 text-xs font-semibold text-red-500 hover:text-red-700 transition"
      >
        Remove
      </button>
    </div>
  );
}

/* ── Review page ────────────────────────────────────────── */

export default function ReviewPage() {
  const router = useRouter();
  const {
    order,
    removeItem,
    updateContact,
    setJobName,
    setNotes,
    clearOrder,
    itemCount,
  } = useOrder();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* ── Cloudflare Turnstile CAPTCHA ─────────────────────── */
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const [captchaToken, setCaptchaToken] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Load the Turnstile script once
  useEffect(() => {
    if (!turnstileSiteKey) return;

    // If already loaded (e.g. hot-reload), skip
    if ((window as any).turnstile) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [turnstileSiteKey]);

  // Render the widget once script is loaded and the container is mounted
  const onCaptchaSuccess = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !scriptLoaded || !turnstileRef.current) return;
    const turnstile = (window as any).turnstile;
    if (!turnstile) return;

    // Avoid double-render
    if (widgetIdRef.current) return;

    const id = turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      callback: onCaptchaSuccess,
      "expired-callback": () => setCaptchaToken(""),
    });
    widgetIdRef.current = id;

    return () => {
      if (widgetIdRef.current) {
        turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileSiteKey, scriptLoaded, onCaptchaSuccess]);

  const catalogItems = order.items.filter(
    (i): i is CatalogItem => i.type === "catalog",
  );
  const fabricationItems = order.items.filter(
    (i): i is FabricationItem => i.type === "fabrication",
  );

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    order.contact.email.trim(),
  );
  const captchaReady = !turnstileSiteKey || captchaToken.length > 0;
  const canSubmit =
    itemCount > 0 &&
    order.contact.name.trim().length >= 2 &&
    isValidEmail &&
    captchaReady &&
    !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const url = process.env.NEXT_PUBLIC_HUB_API_URL;
      if (!url) throw new Error("Hub API URL is not configured.");

      const res = await fetch(`${url}/api/weborders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: order.items.map((item) => {
            if (item.type !== "fabrication") return item;
            // Strip zero-valued measurements before submit
            const cleaned = Object.fromEntries(
              Object.entries(item.measurements).filter(([, v]) => v > 0),
            );
            return { ...item, measurements: cleaned };
          }),
          contact: order.contact,
          jobName: order.jobName,
          notes: order.notes,
          ...(captchaToken ? { captchaToken } : {}),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg = body?.error?.message || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      const body = await res.json();
      const orderNumber =
        body?.data?.orderNumber ?? body?.orderNumber ?? "";

      clearOrder();
      router.push(`/order/confirmation?orderNumber=${encodeURIComponent(orderNumber)}`);
    } catch (err: any) {
      console.error("Submit order error:", err);
      setSubmitError(
        err?.message ?? "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Review Your Order
      </h1>

      {itemCount === 0 ? (
        <div className="mt-8">
          <Card className="p-8 text-center">
            <p className="text-sm text-black/60">Your order is empty.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/order/catalog" variant="primary" size="sm">
                Browse Catalog
              </Button>
              <Button href="/order/fabrication" variant="secondary" size="sm">
                Custom Fabrication
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* ── Order items (2/3 width) ─────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Catalog items */}
            {catalogItems.length > 0 && (
              <Card className="p-5">
                <h2 className="text-sm font-extrabold tracking-wide text-black/60 uppercase">
                  Catalog Items ({catalogItems.length})
                </h2>
                <div className="mt-2 divide-y divide-black/5">
                  {order.items.map((item, idx) =>
                    item.type === "catalog" ? (
                      <CatalogRow
                        key={idx}
                        item={item}
                        onRemove={() => removeItem(idx)}
                      />
                    ) : null,
                  )}
                </div>
              </Card>
            )}

            {/* Fabrication items */}
            {fabricationItems.length > 0 && (
              <Card className="p-5">
                <h2 className="text-sm font-extrabold tracking-wide text-black/60 uppercase">
                  Fabrication Items ({fabricationItems.length})
                </h2>
                <div className="mt-2 divide-y divide-black/5">
                  {order.items.map((item, idx) =>
                    item.type === "fabrication" ? (
                      <FabricationRow
                        key={idx}
                        item={item}
                        onRemove={() => removeItem(idx)}
                      />
                    ) : null,
                  )}
                </div>
              </Card>
            )}

            {/* Add more */}
            <div className="flex flex-wrap gap-3">
              <Button href="/order/catalog" variant="secondary" size="sm">
                + Add Catalog Items
              </Button>
              <Button href="/order/fabrication" variant="secondary" size="sm">
                + Add Fabrication
              </Button>
            </div>
          </div>

          {/* ── Contact + submit (1/3 width) ────────────────── */}
          <div className="space-y-6">
            <Card className="p-5">
              <h2 className="text-sm font-extrabold tracking-wide text-black/60 uppercase">
                Contact Information
              </h2>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-extrabold tracking-wide text-black/60">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={order.contact.name}
                    onChange={(e) => updateContact({ name: e.target.value })}
                    className={`mt-2 ${inputClass}`}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold tracking-wide text-black/60">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={order.contact.email}
                    onChange={(e) => updateContact({ email: e.target.value })}
                    className={`mt-2 ${inputClass}`}
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold tracking-wide text-black/60">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={order.contact.phone}
                    onChange={(e) => updateContact({ phone: e.target.value })}
                    className={`mt-2 ${inputClass}`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold tracking-wide text-black/60">
                    Company
                  </label>
                  <input
                    value={order.contact.company}
                    onChange={(e) => updateContact({ company: e.target.value })}
                    className={`mt-2 ${inputClass}`}
                    placeholder="Company name"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-sm font-extrabold tracking-wide text-black/60 uppercase">
                Order Details
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-extrabold tracking-wide text-black/60">
                    Job Name
                  </label>
                  <input
                    value={order.jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    className={`mt-2 ${inputClass}`}
                    placeholder="Project / job name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold tracking-wide text-black/60">
                    Notes
                  </label>
                  <textarea
                    value={order.notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className={`mt-2 ${inputClass} resize-none`}
                    placeholder="Delivery instructions, special requests..."
                  />
                </div>
              </div>
            </Card>

            {/* Turnstile CAPTCHA */}
            {turnstileSiteKey && (
              <div ref={turnstileRef} className="flex justify-center" />
            )}

            {/* Error */}
            {submitError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {submitError}
              </div>
            )}

            {/* Submit */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {submitting ? "Submitting..." : "Submit Order"}
            </Button>

            {!canSubmit && itemCount > 0 && !submitting && (
              <p className="text-xs text-black/40 text-center">
                {order.contact.name.trim().length < 2
                  ? "Name must be at least 2 characters."
                  : !isValidEmail
                    ? "Please enter a valid email address."
                    : !captchaReady
                      ? "Please complete the CAPTCHA verification."
                      : ""}
              </p>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
