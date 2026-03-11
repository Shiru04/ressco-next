import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { DuctCalculator } from "./DuctCalculator";

export const metadata = buildMetadata({
  title: "Duct Calculator | RESSCO Metals — Rectangular & Round Duct Sizing",
  description:
    "Free HVAC duct calculator. Convert rectangular duct to round equivalent and round duct to rectangular dimensions using ASHRAE formulas.",
  path: "/resources/duct-calculator",
});

export default function DuctCalculatorPage() {
  return (
    <Section className="pt-10 sm:pt-14">
      <div className="max-w-3xl mb-10">
        <div className="text-sm font-extrabold tracking-wide text-black/60">
          RESOURCES
        </div>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Duct Calculator
        </h1>
        <p className="mt-4 text-lg text-black/70">
          Convert between rectangular and round duct sizes using ASHRAE equivalent diameter formulas.
        </p>
      </div>

      <DuctCalculator />
    </Section>
  );
}
