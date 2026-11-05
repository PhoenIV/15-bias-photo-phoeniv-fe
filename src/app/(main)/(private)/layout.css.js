import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css.js";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  minHeight: "50dvh",
});

export const errorText = style({
  color: vars.colors.white,
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[18],
});

export const buttonText = style({
  fontFamily: vars.fonts.brand,
});
