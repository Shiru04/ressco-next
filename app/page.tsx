import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";

export const metadata = buildMetadata({
  title: "RESSCO Metals | Sheet Metal Fabrication & HVAC Supply — Anaheim, CA",
  description:
    "Family-owned sheet metal fabrication and HVAC supply company based in Anaheim, CA. Custom ductwork, galvanized steel, laser cutting, and precision parts for contractors across California. Est. 1996.",
  path: "/",
});

const ASSETS = {
  hero: "/hero/home-hero.webp",
  badge: "/brand/ressco-badge.webp",
  about1: "/about/about-1.webp",
  about2: "/about/about-2.webp",
  about3: "/about/about-3.webp",
};

const STATS = [
  { value: "25+", label: "Years in Business" },
  { value: "500+", label: "Products in Catalog" },
  { value: "13", label: "Product Categories" },
  { value: "CA", label: "Statewide Delivery" },
];

const WHY_RESSCO = [
  {
    title: "We're Honest — Always",
    body: "We don't overpromise, cut corners, or hide behind fine print. If something changes, you hear it from us first — straight and transparent.",
    icon: "✦",
  },
  {
    title: "We Respect Your Lead Times",
    body: "Your project schedule depends on us showing up. We communicate realistic timelines, work hard to meet them, and never leave you guessing.",
    icon: "⊙",
  },
  {
    title: "Real People. Real Service.",
    body: "When you call RESSCO, you talk to someone who knows the product and cares about getting it right — before, during, and after your order.",
    icon: "◈",
  },
  {
    title: "Built for Long-Term Partnerships",
    body: "We don't aim for one-time sales. Contractors come back to RESSCO because they know they can count on us — every project, every time.",
    icon: "⬡",
  },
];

// Show a curated subset of categories on the home page
const HOME_CATEGORIES = [
  "Round Duct",
  "Elbows & Fittings",
  "Flex Duct",
  "Boot Boxes & Transitions",
  "Airflow Control & Dampers",
  "Reducers & Collars",
];

const CA_REGIONS = [
  { region: "Southern California", cities: "Los Angeles · Anaheim · San Diego · Long Beach · Riverside" },
  { region: "Inland Empire", cities: "San Bernardino · Ontario · Fontana · Moreno Valley" },
  { region: "Central Valley", cities: "Bakersfield · Fresno · Stockton · Sacramento" },
  { region: "Bay Area", cities: "San Francisco · San Jose · Oakland · San Jose" },
];

export default function HomePage() {
  const featuredCategories = CATEGORIES.filter((c) =>
    HOME_CATEGORIES.includes(c.title)
  );

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/50 uppercase">
              Anaheim, CA · Est. 1996
            </div>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Sheet Metal Fabrication &amp; HVAC Supply for California Contractors
            </h1>

            <p className="mt-5 text-lg text-black/70 max-w-prose">
              RESSCO Metals is a family-owned manufacturer and supplier of
              precision sheet metal products, custom HVAC ductwork, galvanized
              steel components, and laser-cut parts. Serving contractors,
              fabricators, and builders across California since 1996.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Request a Quote
              </Button>
              <Button href="/product-list" variant="secondary" size="lg">
                Browse Product List
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-black/60">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-black/10 flex-shrink-0">
                <ResponsiveImage
                  srcBase={ASSETS.badge.replace(".webp", "")}
                  alt="RESSCO Metals badge"
                  fill
                  widths={[256, 384, 512]}
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-black/80">
                  Industrial sheet metal supply · California
                </div>
                <div>Family-owned · Established 1996 · Anaheim, CA</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-sm min-h-[520px] lg:min-h-[560px]">
            <ResponsiveImage
              srcBase={ASSETS.hero.replace(".webp", "")}
              alt="RESSCO Metals sheet metal shop and HVAC supply warehouse in Anaheim, CA"
              fill
              priority
              widths={[420, 640, 768, 960, 1200]}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
          </div>
        </div>
      </Section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <Section className="py-10 bg-black">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">{s.value}</div>
              <div className="mt-1 text-sm font-semibold text-white/50 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SERVICES SNAPSHOT ─────────────────────────────────── */}
      <Section className="py-12 sm:py-16 bg-brand-gray">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-extrabold tracking-wide text-black/50 uppercase">What We Do</div>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Fabrication &amp; Supply Under One Roof
          </h2>
          <p className="mt-3 text-black/70">
            From raw galvanized steel to finished custom ductwork — we manufacture,
            stock, and ship everything your HVAC project needs.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Custom Sheet Metal Fabrication", desc: "If you can draw it, we can make it in metal — on time and on budget.", href: "/services" },
            { title: "HVAC Ductwork & Components", desc: "Full line of round duct, flex duct, fittings, boot boxes, dampers and more.", href: "/product-list" },
            { title: "Laser Cutting & Design", desc: "Precision laser cutting on galvanized, stainless, aluminum and more.", href: "/services" },
            { title: "Galvanized Steel Supply", desc: "16–26 gauge pre-galvanized steel ready to fabricate — no extra treatment needed.", href: "/services" },
            { title: "Stainless & Aluminum", desc: "For high-temp, marine, or corrosion-resistant applications.", href: "/services" },
            { title: "Welding — TIG & MIG", desc: "Professional welding on heavy steel up to 1\" thick.", href: "/services" },
          ].map((item) => (
            <Card key={item.title} className="p-6 flex flex-col gap-3 hover:shadow-md transition">
              <div className="font-extrabold text-base">{item.title}</div>
              <p className="text-sm text-black/60 flex-1">{item.desc}</p>
              <Link href={item.href} className="text-sm font-semibold text-brand-red hover:underline underline-offset-4 mt-auto">
                Learn more →
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href="/services" variant="secondary" size="md">
            View All Services
          </Button>
        </div>
      </Section>

      {/* ── PRODUCT CATEGORIES ────────────────────────────────── */}
      <Section className="py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/50 uppercase">Product Catalog</div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              500+ HVAC &amp; Sheet Metal Products
            </h2>
            <p className="mt-2 text-black/70">
              Stocked and ready for California contractors. Browse by category.
            </p>
          </div>
          <Button href="/product-list" variant="secondary" size="md">
            Full Product List
          </Button>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.path}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-black/10 p-4 hover:border-black/30 hover:shadow-sm transition"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-brand-gray">
                <img
                  src={cat.imagePlaceholder}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <div className="text-xs font-semibold text-center text-black/80 leading-tight">
                {cat.title}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── ABOUT / WHY RESSCO ────────────────────────────────── */}
      <Section className="py-12 sm:py-16 bg-brand-gray">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/50 uppercase">
              About RESSCO Metals
            </div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Built for Contractors Who Can't Afford Delays
            </h2>
            <p className="mt-4 text-black/70">
              Founded in 1996 with a few tools in a small warehouse, RESSCO Metals
              has grown into one of California's most trusted sheet metal fabrication
              and HVAC supply partners. We're family-owned, Anaheim-based, and built
              on a simple principle: do what you say, every single time.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {WHY_RESSCO.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-brand-red text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-extrabold text-sm">{item.title}</div>
                    <p className="mt-1 text-sm text-black/60">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href="/about" variant="secondary" size="md">
                Our Story
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 min-h-[220px]">
              <ResponsiveImage
                srcBase={ASSETS.about1.replace(".webp", "")}
                alt="RESSCO Metals fabrication shop"
                fill
                widths={[420, 640, 820]}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 min-h-[220px]">
              <ResponsiveImage
                srcBase={ASSETS.about2.replace(".webp", "")}
                alt="Sheet metal components"
                fill
                widths={[420, 640, 820]}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 min-h-[220px] sm:col-span-2">
              <ResponsiveImage
                srcBase={ASSETS.about3.replace(".webp", "")}
                alt="RESSCO Metals warehouse and HVAC supply"
                fill
                widths={[420, 640, 820]}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── CALIFORNIA COVERAGE ───────────────────────────────── */}
      <Section className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/50 uppercase">Coverage</div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Serving HVAC Contractors Across All of California
            </h2>
            <p className="mt-4 text-black/70">
              Based in Anaheim, CA, RESSCO Metals supplies sheet metal
              fabrication and HVAC products to contractors statewide — from
              Los Angeles and San Diego to San Francisco, Sacramento, and the
              Central Valley. Nationwide expansion coming soon.
            </p>
            <div className="mt-6">
              <Button href="/service-areas" variant="secondary" size="md">
                See All Service Areas
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CA_REGIONS.map((r) => (
              <Card key={r.region} className="p-5">
                <div className="font-extrabold text-sm">{r.region}</div>
                <p className="mt-2 text-xs text-black/60 leading-relaxed">{r.cities}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <Section className="py-12 sm:py-16 bg-black">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-extrabold tracking-wide text-white/40 uppercase">
            Ready to Work Together?
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Get Your Order Started Today
          </h2>
          <p className="mt-4 text-white/60">
            Download the order form, call us directly, or send us an email.
            Our team is available Monday–Friday, 6:00 am – 4:00 pm.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button
              href="/forms/order-form.pdf"
              variant="secondary"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Download Order Form
            </Button>
          </div>
          <p className="mt-6 text-white/40 text-sm">
            1254 N Knollwood Cir, Anaheim, CA 92801 · (562) 633-7047 · sales@resscometals.com
          </p>
        </div>
      </Section>
    </>
  );
}
