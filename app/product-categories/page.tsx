import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { CATEGORIES } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Product Categories | RESSCO Metals",
  description: "Browse RESSCO Metals product categories.",
  path: "/product-categories",
});

export default function ProductCategoriesIndexPage() {
  return (
    <Section className="pt-10 sm:pt-14 pb-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            CATALOG
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Product Categories
          </h1>
          <p className="mt-3 text-black/70">
            Browse categories, then drill into products and available SKUs.
          </p>
        </div>

        <Link
          href="/product-list"
          className="text-sm font-semibold text-black/70 hover:text-black underline underline-offset-4"
        >
          View all products →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={c.path} className="group">
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <ResponsiveImage
                  srcBase={c.imagePlaceholder.replace(".webp", "")}
                  alt={c.title}
                  fill
                  widths={[320, 480, 640, 960]}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>

              <div className="p-5">
                <div className="text-lg font-extrabold">{c.title}</div>
                <div className="mt-2 text-sm text-black/60">
                  Browse products →
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>


    </Section>
  );
}
