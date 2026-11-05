import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

//모달컴포넌트의 너비 값 덮어쓰기
export const modal = style({
  selectors: {
    "&&": {
      width: "fit-content",
      maxWidth: "calc(100vw - 32px)",
      padding: 0,
    },
  },
});

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "60px 23px 45px",

  "@media": {
    [media.tablet]: { padding: "60px 35px 58px" },
    [media.pc]: { padding: "80px 99px 63px" },
  },
});

export const container2 = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "70px 52px 57px",

  "@media": {
    [media.tablet]: { padding: "80px 57px 93px" },
    [media.pc]: { padding: "80px 57px 93px" },
  },
});

export const header = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "60px",
  flexDirection: "column",
});

export const header2 = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const title = style({
  display: "flex",

  color: vars.colors.white,
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[46],
  fontWeight: vars.fontWeight.regular,
  lineHeight: "normal",
});

export const highlight = style({
  color: vars.colors.main,
});

export const highlightpoint = style({
  color: vars.colors.main,
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[32],
  fontWeight: vars.fontWeight.regular,
  lineHeight: "normal",
});

export const content = style({
  color: vars.colors.white,
  fontFamily: vars.fonts.base,
  fontSize: vars.fontSize[20],
  fontWeight: vars.fontWeight.bold,
  lineHeight: "normal",
});

export const time = style({
  display: "flex",
  gap: "5px",
  flexDirection: "column",

  "@media": {
    [media.tablet]: { display: "flex", gap: "5px" },
    [media.pc]: { display: "flex", flexDirection: "row", gap: "10px" },
  },
});

export const timeText = style({
  color: vars.colors.gray300,
  fontFamily: vars.fonts.base,
  fontSize: vars.fontSize[16],
  fontWeight: vars.fontWeight.regular,
  lineHeight: "normal",
});

export const drawTime = style({
  color: vars.colors.main,
});

export const boxImage = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "60px 0 60px",
  gap: "15px",

  "@media": {
    [media.tablet]: { gap: "25px", margin: "60px 0 60px" },
    [media.pc]: { gap: "60px", margin: "94px 0 76px" },
  },
});

export const boxImgdetail = style({
  width: "97px",
  height: "auto", // 가로 크기에 맞춰 세로 비율 유지

  "@media": {
    [media.tablet]: {
      width: "165px",
    },
    [media.pc]: {
      width: "245px",
    },
  },
});
//선택안된 박스 회색처리
export const boxGray = style({
  filter: "grayscale(80%)",
  transition: "filter 0.2s",
});

export const selectBtn = style({
  color: vars.colors.black,
});

export const noBtn = style({
  visibility: "hidden",
});

export const pointImage = style({
  width: "240px",
  height: "228px",
  backgroundPosition: "center",

  "@media": {
    [media.tablet]: {
      width: "340px",
      height: "auto",
    },
    [media.pc]: {
      width: "340px",
      height: "324px",
    },
  },
});

export const point = style({
  display: "flex",
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[32],
  fontWeight: vars.fontWeight.regular,
  lineHeight: "normal",
});
