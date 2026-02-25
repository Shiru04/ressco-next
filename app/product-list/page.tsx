import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { PRODUCTS } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Product List | RESSCO Metals",
  description: "Browse RESSCO Metals product list.",
  path: "/product-list",
});

export default function ProductListPage() {
  return (
    <Section className="pt-10 sm:pt-14 pb-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            CATALOG
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Product List
          </h1>
          <p className="mt-3 text-black/70">
            Browse products. Select an item to view sizes/SKUs.
          </p>
        </div>

        <Link
          href="/"
          className="hidden sm:inline text-sm font-semibold text-black/70 hover:text-black"
        >
          Back to Home →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <Link key={p.id} href={p.path} className="group">
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <ResponsiveImage
                  srcBase={p.imagePlaceholder.replace(".webp", "")}
                  alt={p.title}
                  fill
                  widths={[320, 480, 640, 960]}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>

              <div className="p-5">
                <div className="text-lg font-extrabold">{p.title}</div>
                <div className="mt-2 text-sm text-black/60">
                  Check all sizes →
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
