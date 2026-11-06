import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css.js";

export const container = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  padding: "15px",
  marginBottom: "70px",
  gap: "15px",
  "@media": {
    [media.tablet]: {
      gap: "30px",
      margin: "15px",
    },
    [media.pc]: {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
  },
});

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "50dvh",
  margin: "0 auto",
});

export const informText = style({
  fontFamily: vars.fonts.brand,
  fontWeight: vars.fontWeight.medium,
  textAlign: "center",
  display: "block",
  "@media": {
    [media.tablet]: {
      display: "flex",
      fontSize: "36px",
      margin: "15px",
    },
    [media.pc]: {
      fontSize: "48px",
    },
  },
});

export const retryButton = style({
  display: "block",
  margin: "20px",
});
