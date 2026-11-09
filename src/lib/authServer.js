import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";

/**
 * 서버 환경에서 브라우저의 인증 쿠키(accessToken) 존재 여부 확인
 *
 * 토큰의 만료 여부는 실제 API 요청 시 서버에서 검증됨
 * 이 함수는 쿠키의 존재 여부를 빠르게 판별하여 화면 깜빡임 없는 1차 리다이렉트 가드로 사용
 *
 * @returns {Promise<boolean>} accessToken 쿠키가 존재하면 true, 없으면 false
 */
export async function hasAuthCookie() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  return Boolean(accessToken);
}
