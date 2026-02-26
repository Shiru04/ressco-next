import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { SERVICE_AREAS, getAreaBySlug } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICE_AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    path: `/service-areas/${area.slug}`,
  });
}

export default async function AreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return notFound();

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">SERVICE AREA</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Sheet Metal Supply in {area.name}
          </h1>
          <p className="mt-4 text-lg text-black/70">{area.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button href={`tel:${BUSINESS.phoneE164}`} variant="secondary" size="lg">
              Call {BUSINESS.phoneDisplay}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="text-xl font-extrabold">What we supply in {area.name}</div>
            <ul className="mt-4 space-y-2 text-black/80">
              {[
                "Custom HVAC ductwork fabrication",
                "Galvanized steel — 16 to 26 gauge",
                "Round duct, flex duct, fittings & boot boxes",
                "Stainless steel & aluminum components",
                "Laser cutting & precision design",
                "TIG & MIG welding services",
              ].map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 text-brand-red">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/services" variant="secondary" size="md">
                View All Services
              </Button>
              <Button href="/product-categories" variant="secondary" size="md">
                Browse Products
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-xl font-extrabold">Get started</div>
            <p className="mt-2 text-black/70">
              RESSCO Metals is based in Anaheim, CA and serves contractors
              across California. Contact us to discuss your project or download
              the order form to get started.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/contact" variant="primary" size="md">
                Contact Us
              </Button>
              <Button href="/forms/order-form.pdf" variant="secondary" size="md">
                Download Order Form
              </Button>
            </div>
            <p className="mt-4 text-xs text-black/50">
              Mon–Fri 6:00 am – 4:00 pm · Anaheim, CA 92801
            </p>
          </Card>
        </div>
      </Section>

      <Section className="py-10">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <p className="text-black/60 text-sm">
            RESSCO Metals serves HVAC contractors and fabricators statewide.
          </p>
          <Button href="/service-areas" variant="secondary" size="md">
            ← All Service Areas
          </Button>
        </div>
      </Section>
    </>
  );
}
