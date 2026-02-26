import { buildMetadata } from "@/lib/seo";
import ServiceAreasClient from "./ServiceAreasClient";

export const metadata = buildMetadata({
  title: "Sheet Metal Supply Areas | RESSCO Metals Serves All California",
  description:
    "RESSCO Metals supplies HVAC sheet metal fabrication, galvanized ductwork, and custom parts to contractors across California — from Los Angeles to San Francisco.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return <ServiceAreasClient />;
}
