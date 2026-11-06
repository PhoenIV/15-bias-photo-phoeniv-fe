import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPhotoCard, getCardQuota, getMyGalleryCards } from "@/services/cardService";
import { cardKeys } from "@/services/queryKeys";

// 이번 달 포토카드 생성 한도 조회 (계정 전환 및 진입 시 최신 데이터)
export function useCardQuota(options = {}) {
  return useQuery({
    queryKey: cardKeys.quota(),
    queryFn: () => getCardQuota(),
    refetchOnMount: "always",
    ...options,
  });
}

// 마이갤러리 포토카드 목록 무한 스크롤 조회
export function useMyGalleryCards(params = {}) {
  return useInfiniteQuery({
    queryKey: cardKeys.lists(params),
    queryFn: ({ pageParam }) => getMyGalleryCards({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNext ? lastPage.pagination.page + 1 : null,
  });
}

// 마이갤러리 보유 카드 요약 통계 조회
export function useMyGallerySummary(options = {}) {
  return useQuery({
    queryKey: cardKeys.summary(),
    queryFn: async () => {
      const res = await getMyGalleryCards({ limit: 1 });
      return {
        gradeCounts: res.gradeCounts ?? {
          COMMON: 0,
          LEGENDARY: 0,
          RARE: 0,
          SUPER_RARE: 0,
        },
        totalCount: res.pagination?.totalCount ?? 0,
      };
    },
    ...options,
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
