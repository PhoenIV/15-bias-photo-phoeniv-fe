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

// 일반 객체({}) 또는 배열([])인지 확인 (FormData, Blob, URLSearchParams 등은 제외)
function isJsonBody(body) {
  if (Array.isArray(body)) return true;
  if (body === null || typeof body !== "object") return false;
  const proto = Object.getPrototypeOf(body);
  return proto === Object.prototype || proto === null;
}

/**
 * fetch 래퍼 함수 (클라이언트 컴포넌트 전용)
 * @param {string} endpoint - API 경로 (예: '/cards/me')
 * @param {RequestInit} options - fetch 옵션
 */
export async function apiFetch(endpoint, options = {}) {
  const { body, headers: customHeaders, ...restOptions } = options;
  const url = `${BASE_URL}${endpoint}`;

  // 1. 헤더 준비 (Headers 인스턴스, 일반 객체 모두 지원)
  const headers = new Headers(customHeaders);

  // 2. body 직렬화: 일반 객체/배열만 JSON으로 변환, 나머지(FormData 등)는 그대로 전달
  let serializedBody = body;
  if (isJsonBody(body)) {
    serializedBody = JSON.stringify(body);
    // JSON 본문을 실제로 보낼 때만 Content-Type 설정
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  // 3. fetch 호출
  const res = await fetch(url, {
    ...restOptions,
    headers,
    body: serializedBody,
    credentials: "include",
  });

  // 4. 204 No Content 즉시 종료
  if (res.status === 204) {
    return null;
  }

  // 5. JSON 파싱
  let json = null;
  let parseFailed = false;
  try {
    json = await res.json();
  } catch {
    parseFailed = true;
  }

  // 6. 공통 에러 응답 처리: { error: { code, message, fieldErrors } }
  if (!res.ok || json?.error) {
    const errorInfo = json?.error || {};
    const error = new Error(errorInfo.message || `API 요청 실패 (${res.status})`);

    error.status = res.status;
    error.code = errorInfo.code || "UNKNOWN_ERROR";
    error.fieldErrors = errorInfo.fieldErrors || {};

    throw error;
  }

  // 7. 성공(2xx)인데 JSON 파싱에 실패한 경우도 명확한 에러로 처리
  if (parseFailed) {
    const error = new Error("에러가 발생하였습니다.");
    error.status = res.status;
    error.code = "INVALID_RESPONSE";
    error.fieldErrors = {};
    throw error;
  }

  return json;
}
