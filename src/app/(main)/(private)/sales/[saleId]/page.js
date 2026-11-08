import { notFound } from "next/navigation";

import { SaleDetailPage } from "@/features/marketplace/SaleDetailPage";

export default async function Page({ params }) {
  const { saleId } = await params;
  if (!/^[0-9]+$/.test(saleId)) {
    // saleId가 십진수 문자열이 맞는지 검증
    notFound();
  }
  const parsedSaleId = Number(saleId);
  if (!Number.isSafeInteger(parsedSaleId) || parsedSaleId <= 0) {
    notFound();
  }

  return <SaleDetailPage saleId={parsedSaleId} />;
}
