import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Financing | RESSCO Metals — Sheet Metal Supply California",
  description:
    "RESSCO Metals offers flexible payment options for large orders and long-term supply contracts. Contact us to discuss your project.",
  path: "/financing",
});

export default function FinancingPage() {
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            FINANCING
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Flexible Payment Options
          </h1>
          <p className="mt-4 text-lg text-black/70">
            For large orders and ongoing supply contracts, RESSCO Metals works
            with customers to find payment arrangements that keep your projects
            moving. Contact us to discuss what works for your business.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button href={`tel:${BUSINESS.phoneE164}`} variant="secondary" size="lg">
              Call {BUSINESS.phoneDisplay}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Large order support",
              desc: "We work with contractors on bulk orders and can discuss payment terms that fit your project timeline.",
            },
            {
              title: "Long-term contracts",
              desc: "Ongoing supply agreements with predictable pricing and priority scheduling.",
            },
            {
              title: "Talk to us directly",
              desc: "No automated forms — call or email and speak directly with our team about your needs.",
            },
          ].map((x) => (
            <Card key={x.title} className="p-6">
              <div className="text-xl font-extrabold">{x.title}</div>
              <p className="mt-2 text-black/70">{x.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
