import { apiFetch, buildQueryString } from "@/lib/apiFetch";

/**
 * 1. 판매글 아이디로 교환 제안 목록 조회
 * @param {number} saleId
 * @param {object} params - { status, page, limit }
 * @param {object} options
 * @returns {Promise<{ data: Array, pagination: object }>}
 */
export function getOffersBySale(saleId, params = {}, options = {}) {
  const query = buildQueryString(params);
  options = { ...options, method: "GET" };
  return apiFetch(`/sales/${saleId}/exchanges${query}`, options);
}
