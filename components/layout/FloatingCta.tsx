"use client";

import { BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FloatingCta() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <a
        href={`tel:${BUSINESS.phoneE164}`}
        className={cn(
          "rounded-2xl bg-white shadow-soft border border-black/10 px-4 py-3",
          "text-sm font-extrabold text-brand-black hover:bg-brand-gray",
        )}
        aria-label={`Call ${BUSINESS.phoneDisplay}`}
      >
        Call {BUSINESS.phoneDisplay}
      </a>
    </div>
  );
}
