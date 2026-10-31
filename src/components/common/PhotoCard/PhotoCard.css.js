import { globalStyle } from "@vanilla-extract/css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css";

/* =========================================================
  카드 전체 래퍼
  ========================================================= */
export const cardWrapperRecipe = recipe({
  base: {
    width: "100%",
    minWidth: 0,
    backgroundColor: vars.colors.black,
    border: `1px solid rgba(255, 255, 255, 0.10)`,
    borderRadius: "2px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "@media": {
      [media.tablet]: { gap: "20px" },
      [media.pc]: { pgap: "25px" },
    },
  },
  variants: {
    type: {
      standard: {
        padding: "10px", // 모바일
        "@media": {
          [media.tablet]: { padding: "20px 20px 30px 20px" },
          [media.pc]: { padding: "40px" },
        },
      },
      exchange: {
        padding: "10px",
        "@media": {
          [media.tablet]: { padding: "20px 20px 25px 20px" },
          [media.pc]: { padding: "40px" },
        },
      },
    },
  },
  defaultVariants: {
    type: "standard",
  },
});

/* =========================================================
  썸네일 영역
  ========================================================= */

export const imageBox = style({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  backgroundColor: vars.colors.gray500, // 이미지 로딩 전 배경
  borderRadius: "2px",
  overflow: "hidden",
});

export const statusBadgeOverlay = style({
  position: "absolute",
  top: "8px",
  left: "8px",
  zIndex: 10,
});

export const statusBadgeRecipe = recipe({
  base: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px 8px",
    borderRadius: "2px",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 뒤 이미지가 비치는 검정
    fontSize: vars.fontSize[10],
    fontWeight: vars.fontWeight.regular,
    lineHeight: "normal",
    whiteSpace: "nowrap", // "교환 제시 대기 중"이 줄바꿈되지 않게
    "@media": {
      [media.tablet]: {
        fontSize: vars.fontSize[14],
      },
      [media.pc]: {
        padding: "4px 10px",
        fontSize: vars.fontSize[16],
      },
    },
  },
  variants: {
    color: {
      white: { color: vars.colors.white },
      main: { color: vars.colors.main },
    },
  },
  defaultVariants: {
    color: "white",
  },
});

export const soldOutOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 20,
});

export const soldOutImageWrapper = style({
  position: "relative", // 안쪽 Image(fill)의 기준
  width: "46%", // SOLD OUT 도장 크기: 이미지 영역 너비의 46%
  aspectRatio: "1 / 1",
});

/* =========================================================
  콘텐츠 영역 (공통)
  ========================================================= */

export const contentBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const title = style({
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[22] },
  },
});

/* =========================================================
  메타 줄 (등급 | 카테고리 ... 닉네임)
  ========================================================= */

export const metaRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: vars.fontSize[10],
  color: vars.colors.gray300,
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[12] },
  },
});

export const metaLeft = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const categoryText = style({
  color: vars.colors.gray300,
  fontSize: vars.fontSize[10],
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[16],
    },
  },
});

export const nicknameText = style({
  marginLeft: "auto",
  minWidth: 0,
  color: vars.colors.white,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: vars.fontSize[10],
  // 밑줄
  textDecorationLine: "underline",
  textDecorationSkipInk: "none", // 글자와 겹치는 부분도 선을 끊지 않음
  textUnderlinePosition: "from-font", // 폰트에 정의된 밑줄 위치 사용
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[16],
    },
  },
});

export const divider = style({
  alignSelf: "center",
  width: "1px",
  height: vars.fontSize[10],
  backgroundColor: vars.colors.gray400,
  "@media": {
    [media.tablet]: {
      height: vars.fontSize[16],
    },
  },
});

export const horizontalDivider = style({
  width: "100%",
  height: "1px",
  backgroundColor: vars.colors.gray400,
  margin: "4px 0", // contentBox의 gap(12px)에 위아래 4px씩 더해져요
});

/* =========================================================
  일반 카드: 가격 / 수량 행
  ========================================================= */

export const infoRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: vars.fontSize[10],
  color: vars.colors.gray200,
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[16] },
  },
});

export const infoLabel = style({ fontWeight: vars.fontWeight.light, color: vars.colors.gray300 });
export const infoValue = style({ fontWeight: vars.fontWeight.bold, color: vars.colors.white });

export const totalCount = style({
  color: vars.colors.gray300,
  fontWeight: vars.fontWeight.regular,
});

export const logoWrapper = style({
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "8px",
    },
  },
});

/* =========================================================
  교환 카드: 메타 영역
  ========================================================= */

export const exchangeMeta = style({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  fontSize: vars.fontSize[10],
  color: vars.colors.gray300,
  "@media": {
    [media.tablet]: { gap: "10px", fontSize: vars.fontSize[16] },
  },
});

export const exchangeMetaRight = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
});

export const purchaseText = style({
  flexShrink: 0,
  color: vars.colors.gray300,
  whiteSpace: "nowrap",
  fontWeight: vars.fontWeight.light,
  fontSize: vars.fontSize[10],
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[16] },
  },
});

export const purchasePrice = style({
  color: vars.colors.white,
  fontWeight: vars.fontWeight.regular,
});

/* =========================================================
  교환 카드: 메시지 / 버튼
  ========================================================= */

export const exchangeText = style({
  fontSize: vars.fontSize[10],
  color: vars.colors.gray200,
  lineHeight: "1.4",
  minHeight: "2.8em", // lineHeight 1.4 × 2줄. 한 줄 메시지여도 두 줄 높이를 확보
  wordBreak: "keep-all",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[16] },
  },
});

export const actionRow = style({
  display: "flex",
  gap: "8px",
  marginTop: "12px",
});

// actionRow 안의 버튼이 남는 너비를 균등하게 나눠 갖도록
globalStyle(`${actionRow} > button`, { flex: 1, minWidth: 0 });

// hideOnMobile: 모바일에서 숨김, 태블릿부터 표시 ("거절하기")
export const hideOnMobile = style({
  display: "none",
  "@media": { [media.tablet]: { display: "inline" } },
});

// showOnMobile: 모바일에서만 표시 ("거절")
export const showOnMobile = style({
  display: "inline",
  "@media": { [media.tablet]: { display: "none" } },
});
