"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useOrder } from "./context/OrderContext";

export default function OrderPage() {
  const { itemCount } = useOrder();

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Place an Order
        </h1>
        <p className="mt-4 text-base text-black/60">
          Choose from our catalog of standard HVAC products or request custom
          fabrication to your exact specifications.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
        {/* Catalog CTA */}
        <Card className="flex flex-col items-center p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
            <svg
              className="h-7 w-7 text-brand-primary"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
              />
            </svg>
          </div>
          <h2 className="mt-5 text-lg font-extrabold">Browse Catalog</h2>
          <p className="mt-2 text-sm text-black/60">
            Standard ductwork, fittings, accessories and more — ready to ship.
          </p>
          <Button href="/product-list" className="mt-6 w-full" size="lg">
            Browse Catalog
          </Button>
        </Card>

        {/* Fabrication CTA */}
        <Card className="flex flex-col items-center p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
            <svg
              className="h-7 w-7 text-brand-primary"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.048.58.024 1.194-.14 1.743"
              />
            </svg>
          </div>
          <h2 className="mt-5 text-lg font-extrabold">Custom Fabrication</h2>
          <p className="mt-2 text-sm text-black/60">
            Specify exact dimensions for rectangular or round ductwork pieces.
          </p>
          <Button href="/order/fabrication" className="mt-6 w-full" size="lg">
            Custom Fabrication
          </Button>
        </Card>
      </div>

      {/* Cart indicator */}
      {itemCount > 0 && (
        <div className="mx-auto mt-10 max-w-3xl">
          <Card className="flex items-center justify-between p-5">
            <span className="text-sm font-semibold text-black/70">
              You have{" "}
              <span className="text-brand-primary">{itemCount}</span>{" "}
              {itemCount === 1 ? "item" : "items"} in your order.
            </span>
            <Button href="/order/review" variant="primary" size="sm">
              Review Order
            </Button>
          </Card>
        </div>
      )}
    </Section>
  );
}
