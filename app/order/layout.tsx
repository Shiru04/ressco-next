import { OrderProvider } from "./context/OrderContext";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrderProvider>{children}</OrderProvider>;
}
