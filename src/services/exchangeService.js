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

/**
 * 2. 교환 제시하기
 * @param {object} data - { saleId, offeredUserCardId, description }
 * @param {object} options
 * @returns {Promise<{ data: object }>}
 */
export function createExchangeOffer(data, options = {}) {
  const { saleId, ...body } = data;
  options = { ...options, method: "POST", body };
  return apiFetch(`/sales/${saleId}/exchanges`, options);
}

/**
 * 3. 교환 승인 / 거절 / 취소
 * @param {object} data - { exchangeId, status: "APPROVED" | "REJECTED" | "CANCELLED" }
 * @param {object} options
 * @returns {Promise<{ data: object }>}
 */
export function updateExchangeStatus(data, options = {}) {
  const { exchangeId, status } = data;
  options = { ...options, method: "PATCH", body: { status } };
  return apiFetch(`/exchanges/${exchangeId}`, options);
}
