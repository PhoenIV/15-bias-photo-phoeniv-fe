import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css.js";

export const toggleButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  background: "none",
  border: "none",
  color: vars.colors.gray200,
  cursor: "pointer",
  transition: "color 0.2s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      color: vars.colors.white,
    },
    "&:disabled": {
      color: vars.colors.gray400,
      cursor: "not-allowed",
    },
  },
});
