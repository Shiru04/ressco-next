"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { BUSINESS, NAV } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MobileMenu(props: { variant?: "default" | "landing" }) {
  const variant = props.variant ?? "default";
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/80 text-black shadow-soft"
        aria-label="Open menu"
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60]">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            className={cn(
              "absolute right-0 top-0 h-full w-[86vw] max-w-sm bg-white p-5 shadow-2xl",
              "border-l border-black/10",
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold tracking-wide text-black/60">
                MENU
              </div>
              <button
                className="rounded-lg px-3 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {variant === "default"
                ? NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-3 text-sm font-semibold text-black/80 hover:bg-black/5"
                    >
                      {item.label}
                    </Link>
                  ))
                : null}

              <Link
                href="/privacy-policy"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-black/70 hover:bg-black/5"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="mt-6 grid gap-3">
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="lg"
                ariaLabel={`Call ${BUSINESS.phoneDisplay}`}
              >
                Call {BUSINESS.phoneDisplay}
              </Button>
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                ariaLabel="Contact us"
              >
                Contact us
              </Button>
            </div>

            <div className="mt-6 text-xs text-black/60">
              {BUSINESS.addressText}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
