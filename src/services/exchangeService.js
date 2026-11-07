import { apiFetch, buildQueryString } from "@/lib/apiFetch";

/**
 * 1. 교환 제시하기
 * @param {object} data - { saleId, offeredUserCardId, description }
 * @returns {Promise<{data: object}>}
 */
export function createExchangeOffer(data, options = {}) {
  const { saleId, ...body } = data;
  options = { ...options, method: "POST", body };
  return apiFetch(`/sales/${saleId}/exchanges`, options);
}

/**
 * 2. 판매글의 교환 제시 목록 (판매자: 전체 / 그 외: 내가 보낸 제시만)
 * @param {number} saleId
 * @param {object} params - { status, page, limit }
 * @returns {Promise<{data: Array, pagination: object}>}
 */
export function getExchangeOffersBySale(saleId, params = {}, options = {}) {
  const query = buildQueryString(params);
  options = { ...options, method: "GET" };
  return apiFetch(`/sales/${saleId}/exchanges${query}`, options);
}

/**
 * 3. 나에게 들어온 교환 제시 전체
 * @param {object} params - { status, page, limit }
 * @returns {Promise<{data: Array, pagination: object}>}
 */
export function getMyReceivedExchangeOffers(params = {}, options = {}) {
  const query = buildQueryString(params);
  options = { ...options, method: "GET" };
  return apiFetch(`/exchanges/me${query}`, options);
}

/**
 * 4. 교환 승인 / 거절 / 취소
 * @param {object} data - { exchangeId, status: "APPROVED" | "REJECTED" | "CANCELLED" }
 * @returns {Promise<{data: object}>}
 */
export function updateExchangeStatus(data, options = {}) {
  const { exchangeId, status } = data;
  options = { ...options, method: "PATCH", body: { status } };
  return apiFetch(`/exchanges/${exchangeId}`, options);
}
