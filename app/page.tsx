import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "RESSCO Metals | The Best Supplies for your Projects",
  description:
    "High-quality sheet metal solutions for HVAC and fabrication—custom work, precision cutting, and dependable service.",
  path: "/",
});

const ASSETS = {
  hero: "/hero/home-hero.webp",
  badge: "/brand/ressco-badge.webp",
  about1: "/about/about-1.webp",
  about2: "/about/about-2.webp",
  about3: "/about/about-3.webp",
};

export default function HomePage() {
  return (
    <>
      {/* HERO (screenshot) */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              RESSCO METALS
            </div>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              The Best Supplies for your Projects
            </h1>

            <p className="mt-4 text-lg text-black/70">
              RESSCO Metals, where we help you grow your vision. Our team of
              experts is dedicated to providing high-quality sheet metal
              solutions that meet your unique needs. Whether your looking for
              custom fabrication or precision cutting, we have the skills and
              experience to get the job done right. Contact us today to learn
              about how we can help achieve your goals.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Contact us
              </Button>
              <Button href="/product-list" variant="secondary" size="lg">
                View product list
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-black/60">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-black/10">
                <ResponsiveImage
                  srcBase={ASSETS.badge.replace(".webp", "")}
                  alt="RESSCO badge"
                  fill
                  widths={[256, 384, 512]}
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-black/80">
                  Industrial sheet metal supply
                </div>
                <div>Family-owned • Established 1996</div>
              </div>
            </div>
          </div>

          {/* hero image */}
          <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-sm min-h-[520px] lg:min-h-[560px]">
            <ResponsiveImage
              srcBase={ASSETS.hero.replace(".webp", "")}
              alt="RESSCO Metals shop and supplies"
              fill
              priority
              widths={[640, 960, 1200, 1600]}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
          </div>
        </div>
      </Section>

      {/* ABOUT PREVIEW (screenshot had placeholders; we keep structure but no invented copy) */}
      <Section className="py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              About RESSCO Metals
            </div>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Built for contractors who need reliability
            </h2>
            <p className="mt-4 text-black/70">
              [[PENDING: decide si este párrafo usa extracto del DOCX o se
              mantiene corto estilo Home.]]
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Card className="p-4">
                <div className="text-sm font-extrabold">Benefit 1</div>
                <div className="mt-2 text-sm text-black/60">
                  [[PENDING: reemplazar Benefit 1 del Wix por copy final]]
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-sm font-extrabold">Benefit 2</div>
                <div className="mt-2 text-sm text-black/60">
                  [[PENDING: reemplazar Benefit 2 del Wix por copy final]]
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-sm font-extrabold">Benefit 3</div>
                <div className="mt-2 text-sm text-black/60">
                  [[PENDING: reemplazar Benefit 3 del Wix por copy final]]
                </div>
              </Card>
            </div>

            <div className="mt-7">
              <Button href="/about" variant="secondary" size="md">
                Learn more about RESSCO
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 min-h-[220px]">
              <ResponsiveImage
                srcBase={ASSETS.about1.replace(".webp", "")}
                alt="Fabrication work"
                fill
                widths={[420, 640, 820]}
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 min-h-[220px]">
              <ResponsiveImage
                srcBase={ASSETS.about2.replace(".webp", "")}
                alt="Sheet metal parts"
                fill
                widths={[420, 640, 820]}
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-black/10 min-h-[220px] sm:col-span-2">
              <ResponsiveImage
                srcBase={ASSETS.about3.replace(".webp", "")}
                alt="Shop floor"
                fill
                widths={[420, 640, 820]}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
