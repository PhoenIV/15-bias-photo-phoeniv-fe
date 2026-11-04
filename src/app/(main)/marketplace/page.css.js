import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css.js";

export const page = style({
  minWidth: "375px",
  padding: "15px",
  "@media": {
    [media.tablet]: {
      padding: "30px",
    },
  },
});

export const topRow = style({
  "@media": {
    [media.tablet]: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "993px",
    },
    [media.pc]: {
      maxWidth: "1480px",
      paddingBottom: "20px",
    },
  },
});

export const pageTitle = style({
  fontFamily: vars.fonts.brand,
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "flex",
      fontSize: "48px",
      fontWeight: "700",
      margin: "30px",
    },
    [media.pc]: {
      fontSize: "62px",
    },
  },
});

export const sellButton = style({
  position: "fixed",
  left: "15px",
  right: "15px",
  bottom: "15px",
  width: "100%",
  maxWidth: "345px",
  zIndex: "100", // 모바일 화면에서 포토카드 사진 뒤로 가려져서 드롭다운과 같은 수준으로 하드코딩
  whiteSpace: "nowrap",
  "@media": {
    [media.tablet]: {
      position: "static",
      maxWidth: "342px",
      height: "60px",
      margin: "15px",
    },
    [media.pc]: {
      maxWidth: "440px",
      padding: "0 90px",
    },
  },
});

export const filters = style({});

export const filter = style({});
