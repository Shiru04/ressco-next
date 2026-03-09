"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ── Item types ─────────────────────────────────────────── */

export type CatalogItem = {
  type: "catalog";
  skuId: string;
  skuCode: string;
  productName: string;
  qty: number;
  notes: string;
};

export type FabricationItem = {
  type: "fabrication";
  typeCode: string;
  shape: "rectangular" | "round";
  qty: number;
  ga: string;
  material: string;
  measurements: Record<string, number>;
  remarks: string;
};

export type OrderItem = CatalogItem | FabricationItem;

/* ── Contact / order state ──────────────────────────────── */

export type ContactInfo = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

export type OrderState = {
  items: OrderItem[];
  contact: ContactInfo;
  jobName: string;
  notes: string;
};

const EMPTY_CONTACT: ContactInfo = {
  name: "",
  email: "",
  phone: "",
  company: "",
};

const EMPTY_ORDER: OrderState = {
  items: [],
  contact: { ...EMPTY_CONTACT },
  jobName: "",
  notes: "",
};

/* ── Context type ───────────────────────────────────────── */

type OrderContextType = {
  order: OrderState;
  addItem: (item: OrderItem) => void;
  removeItem: (index: number) => void;
  updateContact: (contact: Partial<ContactInfo>) => void;
  setJobName: (name: string) => void;
  setNotes: (notes: string) => void;
  clearOrder: () => void;
  itemCount: number;
};

const OrderContext = createContext<OrderContextType | null>(null);

/* ── Session-storage persistence ───────────────────────── */

const STORAGE_KEY = "ressco-order-cart";

function loadSavedOrder(): OrderState {
  if (typeof window === "undefined") return { ...EMPTY_ORDER };
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.items) && parsed.contact) {
        return parsed as OrderState;
      }
    }
  } catch {
    // Corrupted data, ignore
  }
  return { ...EMPTY_ORDER, contact: { ...EMPTY_CONTACT } };
}

/* ── Provider ───────────────────────────────────────────── */

export function OrderProvider({ children }: { children: ReactNode }) {
  // Always start with empty state for SSR/hydration consistency,
  // then load from sessionStorage on mount
  const [order, setOrder] = useState<OrderState>(() => ({
    ...EMPTY_ORDER,
    contact: { ...EMPTY_CONTACT },
  }));
  const [hydrated, setHydrated] = useState(false);

  // Load saved order on mount (client only)
  useEffect(() => {
    const saved = loadSavedOrder();
    if (saved.items.length > 0 || saved.contact.name) {
      setOrder(saved);
    }
    setHydrated(true);
  }, []);

  // Persist cart to sessionStorage on every state change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      // Storage full or unavailable, ignore
    }
  }, [order, hydrated]);

  const addItem = useCallback((item: OrderItem) => {
    setOrder((prev) => ({ ...prev, items: [...prev.items, item] }));
  }, []);

  const removeItem = useCallback((index: number) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  const updateContact = useCallback((partial: Partial<ContactInfo>) => {
    setOrder((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...partial },
    }));
  }, []);

  const setJobName = useCallback((jobName: string) => {
    setOrder((prev) => ({ ...prev, jobName }));
  }, []);

  const setNotes = useCallback((notes: string) => {
    setOrder((prev) => ({ ...prev, notes }));
  }, []);

  const clearOrder = useCallback(() => {
    setOrder({ ...EMPTY_ORDER, contact: { ...EMPTY_CONTACT } });
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
  }, []);

  const itemCount = order.items.length;

  const value = useMemo<OrderContextType>(
    () => ({
      order,
      addItem,
      removeItem,
      updateContact,
      setJobName,
      setNotes,
      clearOrder,
      itemCount,
    }),
    [order, addItem, removeItem, updateContact, setJobName, setNotes, clearOrder, itemCount],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

/* ── Hook ───────────────────────────────────────────────── */

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within <OrderProvider>");
  return ctx;
}
