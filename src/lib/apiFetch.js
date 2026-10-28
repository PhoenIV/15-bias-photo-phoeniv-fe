export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api";

/**
 * 객체를 쿼리스트링(?page=1&limit=12)으로 변환하는 헬퍼 함수
 */
export function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * fetch 래퍼 함수 (클라이언트 컴포넌트)
 * @param {string} endpoint - API 경로 (예: '/cards/me')
 * @param {RequestInit & { next?: { revalidate?: number | false, tags?: string[] } }} options - fetch 옵션
 */
export async function apiFetch(endpoint, options = {}) {
  const { body, headers: customHeaders, ...restOptions } = options;
  const url = `${BASE_URL}${endpoint}`;

  // 1. FormData 여부 확인 (포토카드 이미지 업로드 대응)
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...customHeaders,
  };

  // 2. 일반 객체면 자동으로 JSON 문자열로 변환
  const serializedBody = isFormData
    ? body
    : body && typeof body === "object"
      ? JSON.stringify(body)
      : body;

  // 3. fetch 호출
  const res = await fetch(url, {
    ...restOptions,
    headers,
    body: serializedBody,
    credentials: "include",
  });

  // 4. 204 No Content (알림 전체 읽음 등) 즉시 종료
  if (res.status === 204) {
    return null;
  }

  // 5. 안전한 JSON 파싱
  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  // 6. 공통 에러 응답 처리: { error: { code, message, fieldErrors } }
  if (!res.ok || json?.error) {
    const errorInfo = json?.error || {};
    const error = new Error(errorInfo.message || `API 요청 실패 (${res.status})`);

    error.status = res.status; // 401, 400 등 HTTP 상태 코드
    error.code = errorInfo.code || "UNKNOWN_ERROR"; // UNAUTHENTICATED, INVALID_INPUT_VALUE 등
    error.fieldErrors = errorInfo.fieldErrors || {}; // 폼 유효성 에러 객체

    throw error;
  }

  // 7. 리턴
  return json;
}
