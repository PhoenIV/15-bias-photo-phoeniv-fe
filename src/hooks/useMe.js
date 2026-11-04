import { useQuery } from "@tanstack/react-query";

import { userKeys } from "@/services/queryKeys";
import { getMe } from "@/services/userService";

export function useMe() {
  const { data, isPending, error } = useQuery({
    queryKey: userKeys.me(),
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, //-> 5분
  });

  return { user: data, isPending, error };
}
