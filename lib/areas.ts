export type ServiceArea = {
  slug: string;
  name: string;
  region: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
};

export const SERVICE_AREAS: ServiceArea[] = [
  // Southern California
  { slug: "los-angeles-ca", name: "Los Angeles, CA", region: "Southern California", seoTitle: "Sheet Metal Supplier in Los Angeles, CA | RESSCO Metals", seoDescription: "RESSCO Metals supplies HVAC sheet metal fabrication, galvanized steel, ductwork and precision parts to contractors in Los Angeles, CA.", intro: "Supplying HVAC contractors and fabricators in Los Angeles with precision sheet metal products, custom ductwork, and galvanized steel components." },
  { slug: "long-beach-ca", name: "Long Beach, CA", region: "Southern California", seoTitle: "Sheet Metal Supply Long Beach CA | RESSCO Metals", seoDescription: "Sheet metal fabrication and HVAC supply for contractors in Long Beach, CA. Galvanized, stainless, aluminum and laser cutting.", intro: "Serving Long Beach contractors with reliable sheet metal supply and custom fabrication." },
  { slug: "anaheim-ca", name: "Anaheim, CA", region: "Southern California", seoTitle: "Sheet Metal Fabrication Anaheim CA | RESSCO Metals", seoDescription: "RESSCO Metals is based in Anaheim, CA. We supply HVAC sheet metal, galvanized ductwork, and custom fabrication to contractors statewide.", intro: "RESSCO Metals is headquartered in Anaheim — supplying contractors across Southern California with precision sheet metal products." },
  { slug: "san-diego-ca", name: "San Diego, CA", region: "Southern California", seoTitle: "HVAC Sheet Metal Supplier San Diego CA | RESSCO Metals", seoDescription: "Sheet metal fabrication and HVAC supply for contractors in San Diego, CA. Galvanized steel, stainless, aluminum and laser cutting.", intro: "Supplying San Diego HVAC contractors with galvanized ductwork, stainless steel components, and custom fabrication." },
  { slug: "riverside-ca", name: "Riverside, CA", region: "Inland Empire", seoTitle: "Sheet Metal Supply Riverside CA | RESSCO Metals", seoDescription: "RESSCO Metals serves HVAC contractors in Riverside with galvanized sheet metal, custom ductwork, and precision fabrication.", intro: "Serving Riverside and the Inland Empire with quality sheet metal supply and custom HVAC fabrication." },
  { slug: "san-bernardino-ca", name: "San Bernardino, CA", region: "Inland Empire", seoTitle: "Sheet Metal Fabrication San Bernardino CA | RESSCO Metals", seoDescription: "Sheet metal supply and HVAC fabrication for contractors in San Bernardino, CA. Galvanized, stainless steel and aluminum.", intro: "Supplying San Bernardino contractors with reliable sheet metal products and custom ductwork." },
  { slug: "ontario-ca", name: "Ontario, CA", region: "Inland Empire", seoTitle: "HVAC Sheet Metal Ontario CA | RESSCO Metals", seoDescription: "RESSCO Metals supplies HVAC sheet metal fabrication and ductwork to contractors in Ontario, CA.", intro: "Ontario area contractors rely on RESSCO for precision sheet metal supply and HVAC fabrication." },
  { slug: "bakersfield-ca", name: "Bakersfield, CA", region: "Central Valley", seoTitle: "Sheet Metal Supplier Bakersfield CA | RESSCO Metals", seoDescription: "HVAC sheet metal fabrication and supply for contractors in Bakersfield, CA. Galvanized steel, custom ductwork and laser cutting.", intro: "Serving Bakersfield HVAC contractors with galvanized sheet metal, custom parts, and reliable delivery." },
  // Northern California
  { slug: "san-francisco-ca", name: "San Francisco, CA", region: "Bay Area", seoTitle: "Sheet Metal Fabrication San Francisco CA | RESSCO Metals", seoDescription: "RESSCO Metals supplies HVAC contractors in San Francisco with precision sheet metal, galvanized ductwork, and custom fabrication.", intro: "Bay Area HVAC contractors trust RESSCO for quality sheet metal supply and custom fabrication." },
  { slug: "san-jose-ca", name: "San Jose, CA", region: "Bay Area", seoTitle: "HVAC Sheet Metal Supplier San Jose CA | RESSCO Metals", seoDescription: "Sheet metal fabrication and HVAC supply for contractors in San Jose, CA. Galvanized, stainless steel, aluminum and laser cutting.", intro: "Supplying San Jose and Silicon Valley contractors with precision sheet metal and custom HVAC components." },
  { slug: "oakland-ca", name: "Oakland, CA", region: "Bay Area", seoTitle: "Sheet Metal Supply Oakland CA | RESSCO Metals", seoDescription: "RESSCO Metals serves HVAC contractors in Oakland with galvanized sheet metal, custom ductwork, and precision fabrication.", intro: "Serving Oakland contractors with reliable sheet metal products and HVAC fabrication." },
  { slug: "sacramento-ca", name: "Sacramento, CA", region: "Central Valley", seoTitle: "Sheet Metal Fabrication Sacramento CA | RESSCO Metals", seoDescription: "HVAC sheet metal fabrication and supply for contractors in Sacramento, CA. Galvanized steel, custom ductwork and laser cutting.", intro: "Sacramento HVAC contractors count on RESSCO for quality sheet metal supply and custom parts." },
  { slug: "fresno-ca", name: "Fresno, CA", region: "Central Valley", seoTitle: "Sheet Metal Supplier Fresno CA | RESSCO Metals", seoDescription: "Sheet metal supply and HVAC fabrication for contractors in Fresno, CA. Galvanized, stainless steel and aluminum.", intro: "Supplying Fresno contractors with galvanized sheet metal, custom ductwork, and precision components." },
  { slug: "stockton-ca", name: "Stockton, CA", region: "Central Valley", seoTitle: "HVAC Sheet Metal Stockton CA | RESSCO Metals", seoDescription: "RESSCO Metals supplies HVAC sheet metal fabrication and ductwork to contractors in Stockton, CA.", intro: "Serving Stockton HVAC contractors with reliable sheet metal supply and custom fabrication." },
];

export function getAreaBySlug(slug: string) {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}
