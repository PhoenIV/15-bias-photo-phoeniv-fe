import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createExchangeOffer } from "@/services/exchangeService";
import { cardKeys, exchangeKeys, saleKeys } from "@/services/queryKeys";

// 교환 제시 (성공 시 내 카드·교환 목록·판매글 상세를 다시 불러옴)
export function useCreateExchangeOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExchangeOffer,
    onSuccess: (_, { saleId }) => {
      queryClient.invalidateQueries({ queryKey: cardKeys.all });
      queryClient.invalidateQueries({ queryKey: exchangeKeys.all });
      queryClient.invalidateQueries({ queryKey: saleKeys.detail(saleId) });
    },
  });
}
