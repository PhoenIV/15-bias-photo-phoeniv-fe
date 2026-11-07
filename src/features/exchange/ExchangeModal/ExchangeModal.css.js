import { globalStyle, style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css.js";

// 모바일: 아래에서 올라온 시트 / PC: 가운데 상자
export const modal = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  maxWidth: "none",
  height: "calc(100dvh - 30px)",
  padding: "0 15px",
  alignItems: "stretch",
  textAlign: "left",
  borderRadius: "12px 12px 0 0",
  overflowY: "auto",
  "@media": {
    [media.pc]: {
      position: "relative",
      maxWidth: "1160px",
      height: "min(1000px, calc(100dvh - 32px))",
      padding: "0 120px",
      borderRadius: "2px",
    },
  },
});

// 공통 Modal의 X 버튼은 PC에서만 보임
globalStyle(`${modal} > button[aria-label="모달 닫기"]`, {
  display: "none",
  "@media": { [media.pc]: { display: "inline-flex" } },
});

export const stepLayout = style({ display: "flex", flexDirection: "column", height: "100%" });

// 모바일 전용 / PC 전용 (아래 스타일들이 섞어 씀)
export const mobileOnly = style({ "@media": { [media.pc]: { display: "none" } } });

export const pcOnly = style({ display: "none", "@media": { [media.pc]: { display: "flex" } } });

export const sheetHandle = style([
  mobileOnly,
  {
    width: "40px",
    height: "4px",
    margin: "15px auto 0",
    borderRadius: "2px",
    backgroundColor: vars.colors.gray400,
  },
]);

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  paddingTop: "32px",
  "@media": { [media.pc]: { gap: "40px", paddingTop: "60px" } },
});

export const subTitle = style({
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[14],
  color: vars.colors.gray300,
  "@media": { [media.pc]: { fontSize: vars.fontSize[24] } },
});

export const title = style({
  paddingBottom: "10px",
  borderBottom: `2px solid ${vars.colors.gray100}`,
  fontSize: vars.fontSize[24],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  "@media": { [media.pc]: { fontSize: vars.fontSize[40] } },
});

export const brandTitle = style([title, { fontFamily: vars.fonts.brand }]);

// ① 검색·필터 줄
export const queryRow = style({ display: "flex", gap: "10px", marginTop: "20px" });

export const filterButton = style([
  mobileOnly,
  {
    width: "45px",
    height: "45px",
    border: `1px solid ${vars.colors.gray200}`,
    borderRadius: "2px",
  },
]);

export const searchBox = style({ flex: 1 });

export const mobileFilters = style([
  mobileOnly,
  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" },
]);

export const inlineFilters = style([pcOnly, { flex: 1, gap: "20px" }]);

// ① 카드 목록 (이 영역만 스크롤)
export const cardList = style({ flex: 1, overflowY: "auto", margin: "20px 0" });

export const cardGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "5px",
  "@media": { [media.pc]: { gap: "40px" } },
});

export const informText = style({
  padding: "40px 0",
  textAlign: "center",
  color: vars.colors.gray300,
});

// ② 내용 입력: 모바일은 위아래, PC는 좌우
export const formBody = style({
  display: "grid",
  gap: "40px",
  margin: "25px 0 30px",
  "@media": { [media.pc]: { gridTemplateColumns: "1fr 1fr", marginTop: "50px" } },
});

export const topBar = style([
  mobileOnly,
  { display: "flex", alignItems: "center", gap: "10px", height: "60px" },
]);

export const smallText = style({
  alignSelf: "flex-end",
  fontSize: vars.fontSize[12],
  color: vars.colors.gray400,
});

export const buttonRow = style({ display: "flex", gap: "15px", marginTop: "40px" });

export const cardButton = style({
  width: "100%",
  padding: 0,
  border: "none",
  background: "none",
  textAlign: "left",
  cursor: "pointer",
});
