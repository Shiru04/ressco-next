import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Services | RESSCO Metals — Sheet Metal Fabrication & HVAC Supply California",
  description:
    "RESSCO Metals offers custom sheet metal fabrication, HVAC ductwork, laser cutting, galvanized and stainless steel supply to contractors across California. Based in Anaheim, CA since 1996.",
  path: "/services",
});

const SERVICES = [
  {
    slug: "custom-sheet-metal-fabrication",
    title: "Custom Sheet Metal Fabrication",
    description:
      "If you can draw it, we can make it in metal. We fabricate custom HVAC components, ductwork, transitions, and specialty parts to your exact specs — on time and on budget.",
    tags: ["Galvanized", "Stainless Steel", "Aluminum", "Black Iron", "Copper"],
  },
  {
    slug: "hvac-ductwork-supply",
    title: "HVAC Ductwork & Components",
    description:
      "We stock and supply a full line of HVAC ductwork including round duct, rectangular duct, elbows, fittings, collars, boot boxes, reducers, flex duct, and more — ready for your next job.",
    tags: ["Round Duct", "Flex Duct", "Fittings", "Boot Boxes", "Dampers"],
  },
  {
    slug: "laser-cutting-design",
    title: "Laser Cutting & Design",
    description:
      "Precision laser cutting on aluminum, galvanized steel, stainless, and more. We work with your design files or help you develop them — delivering tight tolerances every time.",
    tags: ["Precision Cutting", "Custom Design", "Aluminum", "Stainless", "Galvanized"],
  },
  {
    slug: "galvanized-steel-supply",
    title: "Galvanized Steel Supply",
    description:
      "We work in 26, 24, 22, 20, 18 & 16 gauge pre-galvanized steel — ready to fabricate without additional surface treatment. Cost-effective and durable for any HVAC application.",
    tags: ["16–26 Gauge", "Pre-Galvanized", "No Surface Treatment", "Cost-Effective"],
  },
  {
    slug: "stainless-steel-supply",
    title: "Stainless Steel Fabrication",
    description:
      "For demanding environments — high heat, marine exposure, or where corrosion protection is critical — our stainless steel fabrication delivers lasting performance without a protective coating.",
    tags: ["High-Temp Environments", "Marine Grade", "No Coating Required", "Long Lifespan"],
  },
  {
    slug: "welding-services",
    title: "Welding Services",
    description:
      "Professional TIG and MIG wire welding on heavy gauge steel up to 1\" thick. Structural and finish welding for custom metal assemblies and HVAC fabrication projects.",
    tags: ["TIG Welding", "MIG Welding", "Up to 1\" Thick", "Heavy Steel"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            WHAT WE DO
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Sheet Metal Fabrication & HVAC Supply
          </h1>
          <p className="mt-4 text-lg text-black/70">
            For nearly 30 years, RESSCO Metals has been the fabrication and
            supply partner that California HVAC contractors and builders trust.
            Based in Anaheim, CA — serving the entire state.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button href="/product-list" variant="secondary" size="lg">
              Browse Product List
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray py-12 sm:py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.slug} className="p-6 flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-extrabold">{s.title}</h2>
                <p className="mt-2 text-sm text-black/70">{s.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-2 py-1 rounded-lg bg-black/5 text-black/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              MATERIALS
            </div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              We Work in Any Metal You Need
            </h2>
            <p className="mt-4 text-black/70">
              From standard galvanized and aluminum to stainless steel, black
              iron, copper, and heavy steel up to 1" thick — RESSCO Metals has
              the capability and experience to fabricate exactly what your
              project requires.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "Galvanized Steel (16–26 ga.)",
                "Stainless Steel",
                "Aluminum",
                "Black Iron",
                "Copper",
                "Heavy Steel (up to 1\")",
              ].map((m) => (
                <li key={m} className="flex items-center gap-2 text-sm text-black/80">
                  <span className="h-2 w-2 rounded-full bg-brand-red flex-shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-brand-gray rounded-3xl p-8">
            <div className="text-lg font-extrabold">Ready to get started?</div>
            <p className="mt-3 text-black/70">
              Download our order form or contact us directly. Our team is
              available Monday–Friday, 6:00 am – 4:00 pm.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button href="/contact" variant="primary" size="md">
                Contact Us
              </Button>
              <Button
                href="/forms/order-form.pdf"
                variant="secondary"
                size="md"
              >
                Download Order Form
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
