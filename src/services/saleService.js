import { apiFetch, buildQueryString } from "@/lib/apiFetch";

/**
 * 1. 판매글 목록 조회
 * @param {object} params - { sort, cursor, limit, keyword, grade, genre, excludeSoldOut }
 * @returns {Promise<{data: Array, pagination: object}>}
 */
export function getSales(params = {}, options = {}) {
  const query = buildQueryString(params);
  options = { ...options, method: "GET" };
  return apiFetch(`/sales${query}`, options);
}

/**
 * 2. 판매글 상세 조회
 * @param {number} saleId
 * @param {object} options
 * @returns {Promise<{data: object}>}
 */
export function getSaleDetail(saleId, options = {}) {
  options = { ...options, method: "GET" };
  return apiFetch(`/sales/${saleId}`, options);
}

/**
 * 3. 판매글 게시
 * @param {object} data - { userCardId, price, totalQuantity, exchangeGrade, exchangeGenre, exchangeDescription }
 * @param {object} options
 * @returns {Promise<{data: object}>}
 */
export function postSale(data, options = {}) {
  options = { ...options, method: "POST", body: data };
  return apiFetch(`/sales`, options);
}

/**
 * 4. 판매글 수정하기
 * @param {object} data - { saleId, price, totalQuantity, exchangeGrade, exchangeGenre, exchangeDescription }
 * @param {object} options
 * @returns {Promise<{data: object}>}
 */
export function updateSale(data, options = {}) {
  const { saleId, ...body } = data;
  options = { ...options, method: "PATCH", body };
  return apiFetch(`/sales/${saleId}`, options);
}

/**
 * 5. 판매글 내리기
 * @param {number} saleId
 * @param {object} options
 * @returns {Promise<{data: {id: number, cancelledAt: string}}>}
 */
export function deleteSale(saleId, options = {}) {
  options = { ...options, method: "DELETE" };
  return apiFetch(`/sales/${saleId}`, options);
}

/**
 * 6. 구매하기
 * @param {object} data - { saleId, quantity, expectedPrice }
 * @param {object} options
 * @returns {Promise<{data: object}>}
 */
export async function makePurchase(data, options = {}) {
  const { saleId, ...body } = data;
  options = { ...options, method: "POST", body };
  return apiFetch(`/sales/${saleId}/purchases`, options);
}
