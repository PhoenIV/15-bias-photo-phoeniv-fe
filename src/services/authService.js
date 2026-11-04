import { apiFetch } from "@/lib/apiFetch";

/**
 * 로그인 (POST /api/auth/login)
 * @param {object} loginData - { email, password }
 * @returns {Promise<{ user: object }>}
 */
export async function login(loginData) {
  const json = await apiFetch("/auth/login", {
    method: "POST",
    body: loginData,
  });
  return json.data;
}

/**
 * 회원가입 (POST /api/auth/signup)
 * @param {Object} signupData - {email, nickname, password, passwordConfirm}
 * @returns {Promise<{user: object}>}
 */
export async function signup(signupData) {
  const json = await apiFetch("/auth/signup", {
    method: "POST",
    body: signupData,
  });
  return json.data;
}

/**
 * 로그아웃 (POST /api/auth/logout)
 * 응답 본문 없음 (204)
 */
export function logout() {
  return apiFetch("/auth/logout", { method: "POST" });
}
