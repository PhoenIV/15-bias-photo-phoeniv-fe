import { SaleDetailPage } from "@/features/marketplace/SaleDetailPage";

export default async function Page({ params }) {
  const { saleId } = await params;
  return <SaleDetailPage saleId={Number(saleId)} />;
}
