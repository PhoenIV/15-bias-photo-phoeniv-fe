const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
const DAY_IN_SECONDS = 24 * HOUR_IN_SECONDS;
const WEEK_IN_SECONDS = 7 * DAY_IN_SECONDS;
const FOUR_WEEKS_IN_SECONDS = 4 * WEEK_IN_SECONDS; // 28일 (4주)
const MONTH_IN_SECONDS = 30 * DAY_IN_SECONDS;
const YEAR_IN_SECONDS = 365 * DAY_IN_SECONDS;

/**
 * 생성 시각(createdAt)과 기준 시각(baseTime)의 차이를 요구사항 규격에 문자열로 변환
 *
 * [표시 기준]
 * - 1시간 미만: "방금 전", "N분 전"
 * - 1시간 ~ 23시간: "1시간 전" ~ "23시간 전"
 * - 24시간(1일) ~ 6일: "1일 전" ~ "6일 전"
 * - 7일(1주) ~ 3주: "1주일 전", "2주일 전", "3주일 전"
 * - 4주 ~ 11개월: "1개월 전" ~ "11개월 전"
 * - 12개월(1년) 이상: "1년 전", "2년 전", ...
 *
 * @param {string | Date} createdAt - 알림 생성 시각
 * @param {number | string | Date} [baseTime] - 서버 기준 시각
 * @returns {string} 포맷팅된 한국어 상대 시간 문자열
 */
export function formatRelativeTime(createdAt, baseTime) {
  if (!createdAt) return "";

  const createdMs = new Date(createdAt).getTime();
  if (Number.isNaN(createdMs)) return "";

  const parsedBaseMs =
    typeof baseTime === "number" ? baseTime : baseTime ? new Date(baseTime).getTime() : Date.now();
  const baseMs = Number.isNaN(parsedBaseMs) ? Date.now() : parsedBaseMs;

  const diffSeconds = Math.max(0, Math.floor((baseMs - createdMs) / 1000));

  // 1시간 미만
  if (diffSeconds < MINUTE_IN_SECONDS) {
    return "방금 전";
  }
  if (diffSeconds < HOUR_IN_SECONDS) {
    const minutes = Math.floor(diffSeconds / MINUTE_IN_SECONDS);
    return `${minutes}분 전`;
  }

  // 1시간 ~ 23시간
  if (diffSeconds < DAY_IN_SECONDS) {
    const hours = Math.floor(diffSeconds / HOUR_IN_SECONDS);
    return `${hours}시간 전`;
  }

  // 24시간(1일) ~ 6일
  if (diffSeconds < WEEK_IN_SECONDS) {
    const days = Math.floor(diffSeconds / DAY_IN_SECONDS);
    return `${days}일 전`;
  }

  // 7일(1주) ~ 3주 (4주 미만)
  if (diffSeconds < FOUR_WEEKS_IN_SECONDS) {
    const weeks = Math.floor(diffSeconds / WEEK_IN_SECONDS);
    return `${weeks}주일 전`;
  }

  // 4주 이상 ~ 11개월
  if (diffSeconds < YEAR_IN_SECONDS) {
    const months = Math.max(1, Math.floor(diffSeconds / MONTH_IN_SECONDS));
    return `${Math.min(11, months)}개월 전`;
  }

  // 12개월(1년) 이상
  const years = Math.floor(diffSeconds / YEAR_IN_SECONDS);
  return `${years}년 전`;
}
