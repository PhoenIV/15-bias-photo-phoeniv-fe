import { notFound } from "next/navigation";

import { SaleDetailPage } from "@/features/marketplace/SaleDetailPage";

export default async function Page({ params }) {
  const { saleId } = await params;
  const parsedSaleId = Number(saleId);
  if (!Number.isSafeInteger(parsedSaleId) || parsedSaleId <= 0) {
    notFound();
  }

  return <SaleDetailPage saleId={parsedSaleId} />;
}
