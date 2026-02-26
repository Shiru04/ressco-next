import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

// Services defined inline — no dependency on legacy lib/services
const SERVICES = [
  {
    slug: "custom-sheet-metal-fabrication",
    title: "Custom Sheet Metal Fabrication",
    seoTitle: "Custom Sheet Metal Fabrication | RESSCO Metals — Anaheim, CA",
    seoDescription: "RESSCO Metals fabricates custom HVAC sheet metal components, ductwork, and specialty parts to your exact specs. Serving contractors across California since 1996.",
    intro: "If you can draw it, we can make it in metal — on time and on budget. We fabricate custom HVAC components, ductwork, transitions, and specialty parts to your exact specifications.",
    bullets: ["Custom ductwork to spec", "Galvanized, stainless, aluminum, black iron, copper", "Heavy steel up to 1\" thick", "On-time delivery with clear lead times", "TIG and MIG welding available"],
  },
  {
    slug: "hvac-ductwork-supply",
    title: "HVAC Ductwork & Components",
    seoTitle: "HVAC Ductwork & Components | RESSCO Metals California",
    seoDescription: "Full line of HVAC ductwork including round duct, flex duct, elbows, fittings, boot boxes, and dampers. In stock for California contractors.",
    intro: "We stock and supply a full line of HVAC ductwork and components ready for your next job — round duct, flex duct, fittings, collars, boot boxes, reducers, and more.",
    bullets: ["Round duct in multiple gauges", "Flexible duct in standard lengths", "Elbows, fittings, reducers & collars", "Boot boxes & transitions", "Airflow control & dampers"],
  },
  {
    slug: "laser-cutting-design",
    title: "Laser Cutting & Design",
    seoTitle: "Laser Cutting & Design Services | RESSCO Metals California",
    seoDescription: "Precision laser cutting on galvanized steel, stainless, aluminum and more. RESSCO Metals works from your files or helps develop designs. Serving California contractors.",
    intro: "Precision laser cutting on aluminum, galvanized steel, stainless, and more. We work with your design files or help you develop them — delivering tight tolerances every time.",
    bullets: ["Precision cuts to tight tolerances", "Works with customer-supplied design files", "Design assistance available", "Galvanized, stainless, aluminum, copper", "Fast turnaround for production orders"],
  },
  {
    slug: "galvanized-steel-supply",
    title: "Galvanized Steel Supply",
    seoTitle: "Galvanized Steel Supply | RESSCO Metals — Anaheim, CA",
    seoDescription: "Pre-galvanized steel in 16–26 gauge for HVAC fabrication. No surface treatment required. Cost-effective and durable. Serving California contractors from Anaheim, CA.",
    intro: "We work in 26, 24, 22, 20, 18 & 16 gauge pre-galvanized steel — ready to fabricate without additional surface treatment. Cost-effective and durable for any HVAC application.",
    bullets: ["16, 18, 20, 22, 24, 26 gauge available", "Pre-galvanized — no surface treatment needed", "Corrosion-resistant zinc coating", "Cost-effective for high-volume jobs", "Cut to spec or standard sizes"],
  },
  {
    slug: "stainless-steel-fabrication",
    title: "Stainless Steel Fabrication",
    seoTitle: "Stainless Steel Fabrication | RESSCO Metals California",
    seoDescription: "Stainless steel sheet metal fabrication for high-temp, marine, and demanding environments. No protective coating required. RESSCO Metals, Anaheim, CA.",
    intro: "For demanding environments — high heat, marine exposure, or where corrosion protection is critical — our stainless steel fabrication delivers lasting performance without a protective coating.",
    bullets: ["Ideal for high-temperature applications", "Excellent for marine environments", "No protective coating required", "Long lifespan with minimal maintenance", "Custom fabrication to spec"],
  },
  {
    slug: "welding-services",
    title: "Welding Services",
    seoTitle: "TIG & MIG Welding Services | RESSCO Metals California",
    seoDescription: "Professional TIG and MIG wire welding on heavy gauge steel up to 1\" thick. Structural and finish welding for custom metal assemblies. RESSCO Metals, Anaheim, CA.",
    intro: "Professional TIG and MIG wire welding on heavy gauge steel up to 1\" thick. Structural and finish welding for custom metal assemblies and HVAC fabrication projects.",
    bullets: ["TIG welding for precision joints", "MIG wire welding for structural work", "Heavy steel up to 1\" thick", "Custom metal assemblies", "Clean finish welding available"],
  },
];

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return notFound();

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">SERVICE</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-black/70">{service.intro}</p>
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
            <div className="text-xl font-extrabold">What&apos;s included</div>
            <ul className="mt-4 space-y-2 text-black/80">
              {service.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 text-brand-red">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="text-xl font-extrabold">Ready to order?</div>
            <p className="mt-2 text-black/70">
              Download our order form or contact us directly. Our team is
              available Monday–Friday, 6:00 am – 4:00 pm.
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
              Based in Anaheim, CA · Serving all of California
            </p>
          </Card>
        </div>
      </Section>

      <Section className="py-10">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <p className="text-black/60 text-sm">
            Looking for more? Browse all our fabrication and supply services.
          </p>
          <Button href="/services" variant="secondary" size="md">
            ← All Services
          </Button>
        </div>
      </Section>
    </>
  );
}
