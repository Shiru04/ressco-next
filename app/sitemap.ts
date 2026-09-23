import { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { SERVICE_AREAS } from "@/lib/areas";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://resscometals.com";

const SERVICES = [
  "custom-sheet-metal-fabrication",
  "hvac-ductwork-supply",
  "laser-cutting-design",
  "galvanized-steel-supply",
  "stainless-steel-fabrication",
  "welding-services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/financing",
    "/order",
    "/privacy-policy",
    "/product-categories",
    "/product-list",
    "/promotions",
    "/resources",
    "/reviews",
    "/service-areas",
    "/services",
  ];

  staticRoutes.forEach((route) =>
    entries.push({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
    }),
  );

  // Service areas
  SERVICE_AREAS.forEach((area) =>
    entries.push({
      url: `${SITE_URL}/service-areas/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  // Services
  SERVICES.forEach((slug) =>
    entries.push({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  // Product categories
  CATEGORIES.forEach((cat) =>
    entries.push({
      url: `${SITE_URL}${cat.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  // Products
  PRODUCTS.forEach((product) =>
    entries.push({
      url: `${SITE_URL}${product.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  return entries;
}
