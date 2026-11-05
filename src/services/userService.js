import { apiFetch } from "@/lib/apiFetch";

/**
 * 유저정보조회 (GET /api/users/me), 쿠키의 토큰으로만 검사합니다.
 * @returns {Promise<{ id, email, nickname, point }>}
 */
export async function getMe() {
  const json = await apiFetch("/users/me");
  return json.data.user;
}
