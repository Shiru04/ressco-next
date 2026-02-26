import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { PRODUCTS } from "@/lib/catalog";
import { buildMetadata } from "@/lib/seo";
import {
  getProductByRouteSlug,
  getSkusForProductSafeSlug,
} from "@/lib/catalog-helpers";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slugRaw }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductByRouteSlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.title} | RESSCO Metals`,
    description: `Sizes and SKUs for ${product.title}.`,
    path: product.path,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductByRouteSlug(slug);
  if (!product) return notFound();

  const skus = getSkusForProductSafeSlug(product.slugSafe);

  return (
    <Section className="pt-10 sm:pt-14 pb-14">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="relative aspect-[4/3]">
            <ResponsiveImage
              srcBase={product.imagePlaceholder.replace(".webp", "")}
              alt={product.title}
              fill
              priority
              widths={[320, 480, 640, 960]}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Card>

        <div>
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            PRODUCT
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {product.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/product-categories" variant="secondary" size="md">
              Back to Products
            </Button>
            <Button href="/contact" variant="primary" size="md">
              Request / Order
            </Button>
          </div>

          <div className="mt-8">
            <Card className="p-6">
              <div className="text-xl font-extrabold">Available SKUs</div>
              <div className="mt-2 text-sm text-black/60">
                {skus.length} SKU entries found.
              </div>

              <div className="mt-5 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-black/60">
                    <tr>
                      <th className="py-2 pr-4">SKU</th>
                      <th className="py-2 pr-4">Item name</th>
                      <th className="py-2 pr-0">Product description</th>
                    </tr>
                  </thead>
                  <tbody className="text-black/80">
                    {skus.map((s) => (
                      <tr key={s.id} className="border-t border-black/10">
                        <td className="py-2 pr-4 font-semibold">{s.sku}</td>
                        <td className="py-2 pr-4">{s.itemName || "-"}</td>
                        <td className="py-2 pr-0">
                          {s.productDescription || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {skus.length === 0 ? (
                <div className="mt-4 text-sm text-black/60">
                  [[PENDING: confirm if some products intentionally have no SKUs
                  or if CSV export is incomplete.]]
                </div>
              ) : null}
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
