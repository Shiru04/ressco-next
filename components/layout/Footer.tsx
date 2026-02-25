import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BUSINESS, NAV } from "@/lib/constants";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-black/10">
      <div className="absolute inset-0">
        <ResponsiveImage
          srcBase={"/brand/footer-metal".replace(".webp", "")}
          alt="Metal texture background"
          fill
          widths={[640, 960, 1200, 1600]}
          sizes="100vw"
          className="object-cover opacity-25"
        />
      </div>

      <Container className="relative py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold">{BUSINESS.name}</div>
            <div className="mt-2 text-sm text-black/70">
              {BUSINESS.addressText}
            </div>
            <div className="mt-3 text-sm text-black/70">
              <Link
                href={`tel:${BUSINESS.phoneE164}`}
                className="hover:underline"
              >
                {BUSINESS.phoneDisplay}
              </Link>
              <span className="mx-2">•</span>
              <Link
                href={`mailto:${BUSINESS.email}`}
                className="hover:underline"
              >
                {BUSINESS.email}
              </Link>
            </div>
            <div className="mt-3 text-sm text-black/60">
              {BUSINESS.hoursLong.join(" • ")}
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              Pages
            </div>
            <div className="mt-3 grid gap-2 text-sm font-semibold">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-black/80 hover:text-black"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/privacy-policy"
                className="text-black/70 hover:text-black"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              Quick actions
            </div>
            <div className="mt-3 grid gap-2 text-sm text-black/70">
              <div>Industrial sheet metal products & HVAC supply.</div>
              <div>
                For orders and questions, use{" "}
                <Link href="/contact" className="font-semibold hover:underline">
                  Contact
                </Link>
                .
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-black/10 pt-6 text-xs text-black/60">
          © {new Date().getFullYear()} RESSCO METALS, INC. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
