"use client";

import { useMe } from "@/hooks/useMe";

export default function SaleDetailPage({ sale }) {
  const { card } = sale;
  const { user } = useMe();
  console.log(sale.seller.id);

  return <h2>{card.name}</h2>;
}
