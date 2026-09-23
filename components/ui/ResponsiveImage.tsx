import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  srcBase: string; // path without extension, e.g. "/hero/home-hero"
  alt: string;
  widths?: number[]; // ignored — Vercel handles sizes automatically
  sizes: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  decoding?: "async" | "sync" | "auto";
};

export function ResponsiveImage({
  srcBase,
  alt,
  sizes,
  fill,
  priority,
  className,
}: Props) {
  return (
    <Image
      src={`${srcBase}.webp`}
      alt={alt}
      sizes={sizes}
      fill={fill}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={cn(
        fill ? "absolute inset-0 h-full w-full" : "",
        "object-cover",
        className,
      )}
    />
  );
}
