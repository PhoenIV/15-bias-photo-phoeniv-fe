/**
 * 숫자를 1,000 단위 콤마가 포함된 문자열로 포맷팅합니다.
 *
 * @param {number | string | null | undefined} value - 포맷팅할 숫자 또는 숫자형 문자열
 * @param {string} [fallback="-"] - 유효한 숫자가 아닐 경우 반환할 기본값 (기본: "-")
 * @returns {string} 콤마가 적용된 문자열
 */
export function formatNumber(value, fallback = "-") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const num = Number(value);
  if (Number.isNaN(num)) {
    return fallback;
  }

  return num.toLocaleString();
}
