import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact RESSCO Metals",
  description:
    "Contact RESSCO Metals for sheet metal fabrication and HVAC supply orders. Call, email, or visit us in Anaheim, CA.",
  path: "/contact",
});

const ASSETS = {
  hero: "/hero/contact-banner.webp",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Looking for high-quality sheet metal fabrication services? Look no further than us! Our team of experts is dedicated to providing top-notch solutions for all your fabrication needs. Contact us today to learn more."
        media={{ src: ASSETS.hero, alt: "RESSCO Metals", priority: true }}
        overlay="dark"
      />

      <Section className="py-12 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="text-xl font-extrabold">Get in touch</div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm font-extrabold tracking-wide text-black/60">
                  Address
                </div>
                <div className="mt-2 text-black/80">{BUSINESS.addressText}</div>
              </div>

              <div>
                <div className="text-sm font-extrabold tracking-wide text-black/60">
                  Phone
                </div>
                <div className="mt-2">
                  <a
                    href={`tel:${BUSINESS.phoneE164}`}
                    className="font-semibold text-black/80 hover:underline"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>

              <div>
                <div className="text-sm font-extrabold tracking-wide text-black/60">
                  Email
                </div>
                <div className="mt-2">
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="font-semibold text-black/80 hover:underline"
                  >
                    {BUSINESS.email}
                  </a>
                </div>
              </div>

              <div>
                <div className="text-sm font-extrabold tracking-wide text-black/60">
                  Hours
                </div>
                <div className="mt-2 space-y-1 text-black/70">
                  {BUSINESS.hoursLong.map((h) => (
                    <div key={h}>{h}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="md"
              >
                Call {BUSINESS.phoneDisplay}
              </Button>
              <Button
                href={`mailto:${BUSINESS.email}`}
                variant="primary"
                size="md"
              >
                Email us
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-xl font-extrabold">Order form</div>
            <p className="mt-3 text-black/70">
              You can print the file below and fill it out with your order and
              send it to Edwin or Alex!
            </p>

            <div className="mt-5">
              <Button
                href="/forms/order-form.pdf"
                variant="secondary"
                size="md"
                ariaLabel="Download order form"
              >
                DOWNLOAD
              </Button>
            </div>

            <div className="mt-6 text-sm text-black/60">
              (Placeholder PDF exists until you replace it.)
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
