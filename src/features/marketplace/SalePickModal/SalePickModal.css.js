import { globalStyle, style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "60dvh",
});

export const pageTitle = style({
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[16],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.gray300,
  textAlign: "left",
  padding: "15px 0",
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[20],
    },
    [media.pc]: {
      fontSize: vars.fontSize[24],
    },
  },
});

export const modalPageTitle = style({
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[24],
  textAlign: "left",
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[32],
    },
    [media.pc]: {
      fontSize: vars.fontSize[40],
    },
  },
});

export const queryRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "6px",
  margin: "20px 0",
});

export const mobileFilterButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "45px",
  height: "45px",
  flexShrink: 0,
  backgroundColor: "transparent",
  border: `1px solid ${vars.colors.gray200}`,
  borderRadius: "2px",
  cursor: "pointer",
  "@media": {
    [media.tablet]: {
      display: "none",
    },
  },
});

export const searchInput = style({
  flex: 1,
  height: "45px",
  "@media": {
    [media.tablet]: {
      flex: "0 0 200px",
      width: "200px",
      height: "45px",
    },
    [media.pc]: {
      flex: "0 0 320px",
      width: "320px",
      height: "50px",
    },
  },
});

export const filters = style({
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "flex",
      height: "45px",
      justifyContent: "space-around",
      alignItems: "center",
      gap: "10px",
      "& button": { border: "none" },
    },
  },
});

export const filter = style({
  height: "22px",
  whiteSpace: "nowrap",
});

export const informText = style({
  display: "flex",
  alignItems: "center",
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[16],
  textAlign: "center",
  margin: "60px auto",
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[20],
    },
    [media.pc]: {
      fontSize: vars.fontSize[24],
    },
  },
});

export const bigInformText = style({
  display: "flex",
  alignItems: "center",
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[24],
  textAlign: "center",
  margin: "60px auto",
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[32],
    },
    [media.pc]: {
      fontSize: vars.fontSize[40],
    },
  },
});

export const cardContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
});

export const mobileFilterModal = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100dvw",
  minWidth: "375px",
  maxWidth: "none",
  height: "45dvh",
  maxHeight: "45dvh",
  boxSizing: "border-box",
  padding: "15px",
  borderRadius: "12px 12px 0 0",
  alignItems: "stretch",
});

globalStyle(`${mobileFilterModal} button[aria-label="모달 닫기"]`, {
  display: "none",
});

// 카드를 버튼으로 감싸도 모양은 그대로 (키보드 Tab·Enter로 선택 가능)
export const cardButton = style({
  width: "100%",
  padding: 0,
  border: "none",
  background: "none",
  textAlign: "left",
  cursor: "pointer",
});
