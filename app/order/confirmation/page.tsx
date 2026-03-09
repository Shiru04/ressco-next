"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderNumber = params.get("orderNumber") ?? "";

  return (
    <Section>
      <div className="mx-auto max-w-lg text-center">
        {/* Success icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Thank You!
        </h1>
        <p className="mt-4 text-base text-black/60">
          Your order has been submitted successfully.
        </p>

        {orderNumber && (
          <Card className="mt-6 inline-block px-6 py-4">
            <span className="text-xs font-extrabold tracking-wide text-black/50 uppercase">
              Order Number
            </span>
            <div className="mt-1 text-xl font-extrabold text-brand-primary">
              {orderNumber}
            </div>
          </Card>
        )}

        <p className="mt-6 text-sm text-black/50">
          We&apos;ll review your order and contact you within 24 hours to
          confirm details and pricing.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/order/catalog" variant="primary" size="md">
            Browse Catalog
          </Button>
          <Button href="/" variant="secondary" size="md">
            Back to Home
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <Section>
          <div className="text-center text-sm text-black/50">Loading...</div>
        </Section>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
