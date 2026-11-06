import { cookies } from "next/headers";

import { getSaleDetail } from "@/services/saleService";

import { SaleDetailPage } from "@/features/marketplace/SaleDetailPage";

export default async function Page({ params }) {
  const { saleId } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await getSaleDetail(saleId, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  return <SaleDetailPage sale={response.data} />;
}
