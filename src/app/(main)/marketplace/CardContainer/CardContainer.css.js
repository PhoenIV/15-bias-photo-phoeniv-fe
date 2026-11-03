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

export const photoCard = style({});
