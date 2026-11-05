import { useQuery } from "@tanstack/react-query";

import { userKeys } from "@/services/queryKeys";
import { getMe } from "@/services/userService";

export function useMe(options = {}) {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: userKeys.me(),
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, //-> 5분
    ...options, //-> useMe()를 사용하는 곳에서 옵션을 추가 할 수 있게 설정 변경
  });

  //사용자가 로그아웃, 토큰 만료, 쿠키 삭제 등의 이유로 로그인 되지 않았을떄
  //페이지 이동 또는 새로고침 했을 때 헤더에 사용자 정보를 띄우지 않는 방법
  const isUnauthenticated = error?.status === 401;

  return { user: isUnauthenticated ? undefined : data, isPending, error, refetch };
}
