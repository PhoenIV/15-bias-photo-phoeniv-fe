import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPhotoCard, getCardQuota } from "@/services/cardService";
import { cardKeys } from "@/services/queryKeys";

// 이번 달 포토카드 생성 한도 조회
export function useCardQuota() {
  return useQuery({
    queryKey: cardKeys.quota(),
    queryFn: () => getCardQuota(),
  });
}

// 포토카드 생성
export function useCreatePhotoCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPhotoCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardKeys.all });
    },
    onError: (error) => {
      // 서버에서 쿼터 초과 에러 반환 시 최신 쿼터 상태 동기화
      if (error.code === "CARD_QUOTA_EXCEEDED") {
        queryClient.invalidateQueries({ queryKey: cardKeys.quota() });
      }
    },
  });
}
