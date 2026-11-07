import { useQuery } from "@tanstack/react-query";

import { saleKeys } from "@/services/queryKeys";
import { getSaleDetail } from "@/services/saleService";

export function useSaleDetail(saleId) {
  return useQuery({
    queryKey: saleKeys.detail(saleId),
    queryFn: async () => (await getSaleDetail(saleId)).data,
    enabled: Number.isFinite(saleId),
  });
}
