import { apiFetch } from "@/lib/apiFetch";

/**
 * 뽑기 가능 여부 조회 (GET /api/point-draws/status)
 * @returns {Promise<{ canDraw: boolean, nextAvailableAt: string | null, serverTime: string }>}
 */
export async function getDrawStatus() {
  const json = await apiFetch("/point-draws/status", { method: "GET" });
  return json.data;
}

/**
 * 뽑기 (POST /api/point-draws)
 * @param {1 | 2 | 3} selectedBox - 선택한 상자 번호
 * @returns {Promise<{ amount: number, nextAvailableAt: string }>}
 */
export async function drawPoint(selectedBox) {
  const json = await apiFetch("/point-draws", {
    method: "POST",
    body: {
      selectedBox,
    },
  });
  return json.data;
}
