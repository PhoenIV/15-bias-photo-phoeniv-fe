// 도메인별 쿼리 키(캐시 이름표) 관리 예시
export const cardKeys = {
  all: ["cards"],
  lists: (filters = {}) => [...cardKeys.all, "list", filters],
  detail: (id) => [...cardKeys.all, "detail", id],
};

export const userKeys = {
  all: ["users"],
  me: () => [...userKeys.all, "me"],
};
