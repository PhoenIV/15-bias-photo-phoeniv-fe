import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getDrawStatus } from "@/services/pointDrawService";
import { pointDrawKeys, userKeys } from "@/services/queryKeys";

import { useMe } from "./useMe";

export function usePointDrawStatus() {
  //뽑기 조회를 하려면 유저 정보를 가져와야됨
  const { user } = useMe();
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: pointDrawKeys.status(),
    queryFn: async () => {
      try {
        return await getDrawStatus();
      } catch (error) {
        if (error?.status === 401) {
          await queryClient.cancelQueries({ queryKey: userKeys.me() }); //-> 늦게 도착하는 유저정보가 덮어쓰지 않게 막음
          queryClient.setQueryData(userKeys.me(), null); //-> 세션 만료: 비로그인 상태로 전환 (enabled가 false가 되어 조회도 멈춤)
        }
        throw error;
      }
    },
    enabled: Boolean(user),
    refetchInterval: 60 * 1000, //-> 서버 타임 조회 요청 (1분)
    retry: false,
  });

  //비로그인이 되면 이전에 받아 둔 canDraw가 남아 있어도 뽑기 모달이 열리지 않게 함
  return { canDraw: Boolean(user) && (data?.canDraw ?? false), data, isPending, error };
}
