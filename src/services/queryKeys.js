// 도메인별 쿼리 키(캐시 이름표) 관리
export const cardKeys = {
  all: ["cards"],
  lists: (filters = {}) => [...cardKeys.all, "list", filters],
  detail: (id) => [...cardKeys.all, "detail", id],
  quota: () => [...cardKeys.all, "quota"],
};

export const userKeys = {
  all: ["users"],
  me: () => [...userKeys.all, "me"],
};

export const saleKeys = {
  all: ["sales"],
  lists: (params = {}) => [...saleKeys.all, "list", params],
  detail: (id) => [...saleKeys.all, "detail", id],
};

export const pointDrawKeys = {
  all: ["point-draws"],
  status: () => [...pointDrawKeys.all, "status"],
};
  
export const notificationKeys = {
  all: ["notifications"],
  lists: (params = {}) => [...notificationKeys.all, "list", params],
};
