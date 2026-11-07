// 포토카드 관련 상수 (등급, 장르)
export const GRADE_OPTIONS = [
  { color: "main", label: "COMMON", value: "COMMON" },
  { color: "blue", label: "RARE", value: "RARE" },
  { color: "purple", label: "SUPER RARE", value: "SUPER_RARE" },
  { color: "pink", label: "LEGENDARY", value: "LEGENDARY" },
];

export const GENRE_OPTIONS = [
  { label: "앨범", value: "ALBUM" },
  { label: "특전", value: "SPECIAL" },
  { label: "팬싸", value: "FAN_SIGN" },
  { label: "시즌그리팅", value: "SEASONS_GREETINGS" },
  { label: "팬미팅", value: "FAN_MEETING" },
  { label: "콘서트", value: "CONCERT" },
  { label: "MD", value: "MD" },
  { label: "콜라보", value: "COLLAB" },
  { label: "팬클럽", value: "FAN_CLUB" },
  { label: "기타", value: "OTHERS" },
];

// 등급 영문 코드 -> 테마 색상 맵
export const GRADE_COLOR_MAP = Object.fromEntries(
  GRADE_OPTIONS.map(({ color, value }) => [value, color]),
);

// 장르 영문 코드 -> 한글 라벨 맵
export const GENRE_LABEL_MAP = Object.fromEntries(
  GENRE_OPTIONS.map(({ label, value }) => [value, label]),
);

// 카드 목록 드롭다운 및 모바일 모달 공통 필터 설정
export const CARD_GRADE_FILTER = {
  label: "등급",
  options: GRADE_OPTIONS,
  placeholder: "등급",
  value: "grade",
};

export const CARD_GENRE_FILTER = {
  label: "장르",
  options: GENRE_OPTIONS,
  placeholder: "장르",
  value: "genre",
};

// 나의 판매 포토카드 관련 상수 (판매방법, 매진여부)
export const SALE_TYPE_OPTIONS = [
  { label: "판매 중", value: "SALE" },
  { label: "교환 제시 대기 중", value: "EXCHANGE" },
];

export const SOLD_OUT_OPTIONS = [
  { label: "거래 가능", value: "false" },
  { label: "판매 완료(매진)", value: "true" },
];

export const SALE_TYPE_STATUS_MAP = {
  EXCHANGE: "exchangePending",
  SALE: "selling",
};

export const CARD_SALE_TYPE_FILTER = {
  label: "판매방법",
  options: SALE_TYPE_OPTIONS,
  placeholder: "판매방법",
  value: "saleType",
};

export const CARD_SOLD_OUT_FILTER = {
  label: "매진여부",
  options: SOLD_OUT_OPTIONS,
  placeholder: "매진여부",
  value: "isSoldOut",
};

// 카드당 최대 발행량
export const MAX_TOTAL_QUANTITY = 10;

// 등급별 기본 카운트 기본값
export const DEFAULT_GRADE_COUNTS = {
  COMMON: 0,
  LEGENDARY: 0,
  RARE: 0,
  SUPER_RARE: 0,
};
