import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { CATEGORIES } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";
import {
  getCategoryByRouteSlug,
  getProductsForCategorySlug,
} from "@/lib/catalog-helpers";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoryByRouteSlug(slug);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.title} | RESSCO Metals`,
    description: `Browse ${cat.title} products.`,
    path: cat.path,
  });
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoryByRouteSlug(slug);
  if (!cat) return notFound();

  const products = getProductsForCategorySlug(cat.slug);

  return (
    <Section className="pt-10 sm:pt-14 pb-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            CATEGORY
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {cat.title}
          </h1>
          <p className="mt-3 text-black/70">{products.length} products</p>
        </div>

        <Link
          href="/product-list"
          className="text-sm font-semibold text-black/70 hover:text-black"
        >
          ← Back to Product List
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
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

      {/* Category thumbnail (optional) */}
      <div className="mt-12">
        <Card className="overflow-hidden">
          <div className="relative aspect-[16/6]">
            <ResponsiveImage
              srcBase={cat.imagePlaceholder.replace(".webp", "")}
              alt={`${cat.title} category image`}
              fill
              widths={[320, 480, 640, 960]}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Card>
      </div>
    </Section>
  );
}
