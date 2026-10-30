import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css.js";

export const searchButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  background: "none",
  border: "none",
  color: vars.colors.white,
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  selectors: {
    "&:hover": {
      opacity: 0.8,
    },
    "&:disabled": {
      color: vars.colors.gray400,
      cursor: "not-allowed",
    },
  },
});
