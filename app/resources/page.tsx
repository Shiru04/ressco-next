import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Resources | RESSCO Metals — HVAC Tools & Calculators",
  description:
    "Free HVAC tools and resources for contractors. Duct calculators, sizing guides, and more from RESSCO Metals.",
  path: "/resources",
});

const RESOURCES = [
  {
    href: "/resources/duct-calculator",
    title: "Duct Calculator",
    description:
      "Convert between rectangular and round duct sizes using ASHRAE equivalent diameter formulas. Real-time results as you type.",
    tag: "Calculator",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            RESOURCES
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tools & Resources
          </h1>
          <p className="mt-4 text-lg text-black/70">
            Free tools to help HVAC contractors and builders get the job done faster.
          </p>
        </div>
      </Section>

      <Section className="bg-brand-gray py-12 sm:py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <Link key={r.href} href={r.href} className="group">
              <Card className="p-6 flex flex-col gap-4 h-full transition group-hover:shadow-lg group-hover:border-black/20">
                <div>
                  <span className="inline-block text-xs font-semibold px-2 py-1 rounded-lg bg-brand-red/10 text-brand-red mb-3">
                    {r.tag}
                  </span>
                  <h2 className="text-lg font-extrabold">{r.title}</h2>
                  <p className="mt-2 text-sm text-black/70">{r.description}</p>
                </div>
                <div className="mt-auto text-sm font-semibold text-brand-red group-hover:underline">
                  Open tool →
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
