import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css.js";

export const section = style({
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "60px 20px 24px",
  backgroundSize: "100% auto",
  backgroundPosition: "center bottom",
  backgroundRepeat: "no-repeat",
  "@media": {
    [media.tablet]: { padding: "112px 40px 40px" },
    [media.pc]: { padding: "136px 60px 40px", backgroundSize: "contain" },
  },
});

export const sectionInner = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "40px",
  width: "fit-content",
  maxWidth: "1000px",
});

export const textWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const sectionTitle = style({
  fontSize: vars.fontSize[22],
  fontWeight: vars.fontWeight.bold,
  textAlign: "left",
  zIndex: 10,
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[28] },
    [media.pc]: { fontSize: vars.fontSize[36] },
  },
});

export const sectionSubtitle = style({
  fontSize: vars.fontSize[14],
  color: vars.colors.gray300,
  textAlign: "left",
  lineHeight: "1.6",
  zIndex: 10,
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[16] },
    [media.pc]: { fontSize: vars.fontSize[18] },
  },
});

export const graphicWrapper = style({
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  zIndex: 10,
});

// 하이라이트 전용 클래스
export const highlightMain = style({ color: vars.colors.main });
export const highlightBlue = style({ color: vars.colors.blue });
