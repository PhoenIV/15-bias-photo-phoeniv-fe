import { useQuery } from "@tanstack/react-query";

import { getDrawStatus } from "@/services/pointDrawService";
import { pointDrawKeys } from "@/services/queryKeys";

import { useMe } from "./useMe";

export function usePointDrawStatus() {
  //뽑기 조회를 하려면 유저 정보를 가져와야됨
  const { user } = useMe();
  const { data, isPending, error } = useQuery({
    queryKey: pointDrawKeys.status(),
    queryFn: getDrawStatus,
    enabled: Boolean(user),
    refetchInterval: 60 * 1000, //-> 서버 타임 조회 요청 (1분)
    retry: false,
  });

  return { canDraw: data?.canDraw ?? false, data, isPending, error };
}
