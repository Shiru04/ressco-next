import Link from "next/link";
import { BUSINESS, NAV } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";

export function Header(props: { variant?: "default" | "landing" }) {
  const variant = props.variant ?? "default";

  return (
    <header className="top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-10 lg:px-16 flex h-40 items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${BUSINESS.name} Home`}
        >
          <Image
              src="/brand/logo-ressco.svg"
              alt="RESSCO Metals logo"
              width={420}
              height={100}
              priority
              className="h-20 w-auto sm:h-24"
            />
        </Link>

        {/* Desktop nav */}
        {variant === "default" ? (
          <nav className="hidden lg:flex items-center gap-8 text-base font-semibold">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/privacy-policy"
              className="text-white/50 hover:text-white/80"
            >
              Privacy
            </Link>
          </nav>
        ) : (
          <div className="hidden lg:block text-sm font-semibold text-white/70">
            Industrial Sheet Metal & HVAC Supply
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col xl:flex-row items-stretch xl:items-center gap-2">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 whitespace-nowrap"
              ariaLabel={`Call ${BUSINESS.phoneDisplay}`}
            >
              {BUSINESS.phoneDisplay}
            </Button>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              ariaLabel="Contact us"
            >
              Contact us
            </Button>
          </div>

          <MobileMenu variant={variant} />
        </div>
      </div>
    </header>
  );
}
