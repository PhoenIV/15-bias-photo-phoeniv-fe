import { apiFetch, BASE_URL, buildQueryString } from "@/lib/apiFetch";

/**
 * 실시간 알림 SSE 스트림 엔드포인트 URL
 */
export const NOTIFICATION_STREAM_URL = `${BASE_URL}/notifications/stream`;

/**
 * 알림 목록 조회 (GET /api/notifications)
 *
 * @param {Object} [params={}] - { page, limit, unreadOnly }
 * @param {RequestInit} [options={}] - fetch 추가 옵션
 * @returns {Promise<{ data: Array, pagination: Object, unreadCount: number, serverTime: string }>}
 */
export function getNotifications(params = {}, options = {}) {
  const query = buildQueryString(params);
  return apiFetch(`/notifications${query}`, { ...options, method: "GET" });
}

/**
 * 알림 전체 읽음 처리 (POST /api/notifications/readAll)
 * 응답 본문 없음 (204 No Content)
 *
 * @param {RequestInit} [options={}] - fetch 추가 옵션
 * @returns {Promise<null>}
 */
export function readAllNotifications(options = {}) {
  return apiFetch("/notifications/readAll", { ...options, method: "POST" });
}
