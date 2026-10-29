import { apiFetch, buildQueryString } from "@/lib/apiFetch";

/**
 * 1. 포토카드 생성 (POST /api/cards)
 * @param {object} payload - { name, grade, genre, minPrice, totalCreated, description, image }
 * - FormData를 직접 넘겨도 되고, 일반 객체를 넘겨도 됨(이 함수가 알아서 FormData로 변환)
 */
export async function createPhotoCard(payload) {
  let formData = payload;

  if (!(payload instanceof FormData)) {
    formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
  }

  const json = await apiFetch("/cards", { method: "POST", body: formData });
  return json.data;
}

/**
 * 2. 이번 달 포토카드 생성 잔여 횟수 조회 (GET /api/cards/quota)
 * @returns {Promise<{ maxQuota: number, usedQuota: number, remainingQuota: number }>}
 */
export async function getCardQuota(options = {}) {
  const json = await apiFetch("/cards/quota", options);
  return json.data;
}

/**
 * 3. 마이갤러리 포토카드 목록 조회 (GET /api/cards/me)
 * @param {object} params - { page, limit, keyword, grade, genre, sort }
 * @returns {Promise<{ data: Array, pagination: object, gradeCounts: object }>}
 */
export function getMyGalleryCards(params = {}, options = {}) {
  const query = buildQueryString(params);
  return apiFetch(`/cards/me${query}`, options);
}

/**
 * 4. 나의 판매 포토카드 목록 조회 (GET /api/cards/me/sales)
 * @param {object} params - { page, limit, keyword, grade, genre, saleType, isSoldOut }
 * @returns {Promise<{ data: Array, pagination: object, gradeCounts: object }>}
 */
export function getMySalesCards(params = {}, options = {}) {
  const query = buildQueryString(params);
  return apiFetch(`/cards/me/sales${query}`, options);
}
