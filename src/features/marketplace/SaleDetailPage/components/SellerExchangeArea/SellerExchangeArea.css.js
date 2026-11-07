import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

export const container = style({});

export const areaTitle = style({
  color: vars.colors.white,
  fontSize: vars.fontSize[20],
  fontWeight: vars.fontWeight.bold,
  paddingBottom: "10px",
  borderBottom: `1px solid ${vars.colors.gray100}`,
});

export const cardsContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "25px",
  "@media": {
    [media.pc]: { gridTemplateColumns: "repeat(3, 1fr)" },
  },
});
