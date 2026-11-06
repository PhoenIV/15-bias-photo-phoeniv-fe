"use client";

import { useEffect, useState } from "react";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getNotifications,
  NOTIFICATION_STREAM_URL,
  readAllNotifications,
} from "@/services/notificationService";
import { notificationKeys, userKeys } from "@/services/queryKeys";

/**
 * 알림 목록 무한 스크롤 조회
 *
 * @param {Object} [options={}]
 * @param {boolean} [options.enabled=true] - 쿼리 활성화 여부 (로그인 상태일 때만 활성화)
 * @param {number} [options.limit=12] - 페이지당 조회 개수
 */
export function useNotifications({ enabled = true, limit = 12 } = {}) {
  const queryResult = useInfiniteQuery({
    queryKey: notificationKeys.lists({ limit }),
    queryFn: ({ pageParam = 1 }) => getNotifications({ limit, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNext ? lastPage.pagination.page + 1 : null,
    enabled,
  });

  const { data } = queryResult;
  const notifications = data?.pages.flatMap((page) => page.data) ?? [];
  const unreadCount = data?.pages[0]?.unreadCount ?? 0;
  // 가장 최근에 받아온 페이지의 serverTime (dataUpdatedAt과 수신 시점이 거의 일치)
  const serverTime = data?.pages.at(-1)?.serverTime;

  return {
    ...queryResult,
    notifications,
    serverTime,
    unreadCount,
  };
}

/**
 * 서버 시각 기준의 "현재 시각(ms)"을 주기적으로 갱신해 반환
 *
 * @param {string | undefined} serverTime - 서버가 응답에 담아준 기준 시각
 * @param {number} dataUpdatedAt - 해당 응답을 클라이언트가 수신한 시각 (react-query의 dataUpdatedAt)
 * @param {number} [intervalMs=30000] - 갱신 주기
 * @returns {number} 서버 시각 기준 현재 시각(ms)
 */
export function useServerNow(serverTime, dataUpdatedAt, intervalMs = 30_000) {
  const parsedServerMs = serverTime ? new Date(serverTime).getTime() : NaN;
  const offset =
    Number.isNaN(parsedServerMs) || !dataUpdatedAt ? 0 : parsedServerMs - dataUpdatedAt;

  const [now, setNow] = useState(() => Date.now() + offset);

  useEffect(() => {
    const update = () => setNow(Date.now() + offset);
    const timeoutId = setTimeout(update, 0);
    const intervalId = setInterval(update, intervalMs);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [offset, intervalMs]);

  return now;
}

/**
 * 안 읽은 알림 전체 읽음 처리 뮤테이션
 */
export function useReadAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

/**
 * 실시간 알림 SSE 스트림 연결 훅
 * - changed 이벤트 수신 시 알림 목록 및 내 정보(포인트 등) 쿼리 무효화
 * - session-expired 이벤트 수신 시 연결 종료 및 인증 캐시 초기화
 *
 * @param {boolean} [isLoggedIn=false] - 로그인 여부
 */
export function useNotificationStream(isLoggedIn = false) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoggedIn) return;

    const eventSource = new EventSource(NOTIFICATION_STREAM_URL, {
      withCredentials: true,
    });

    const handleChanged = () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    };

    const handleSessionExpired = () => {
      eventSource.close();
      queryClient.setQueryData(userKeys.me(), null);
      queryClient.removeQueries({ queryKey: notificationKeys.all });
    };

    eventSource.addEventListener("changed", handleChanged);
    eventSource.addEventListener("session-expired", handleSessionExpired);

    return () => {
      eventSource.removeEventListener("changed", handleChanged);
      eventSource.removeEventListener("session-expired", handleSessionExpired);
      eventSource.close();
    };
  }, [isLoggedIn, queryClient]);
}
