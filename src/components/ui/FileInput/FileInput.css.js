import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css.js";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const label = style({
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  marginBottom: "10px",
  fontSize: vars.fontSize[16],
  "@media": {
    [media.pc]: {
      fontSize: vars.fontSize[20],
    },
  },
});

export const rowContainer = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  gap: "10px",
});

export const hiddenInput = style({
  display: "none",
});

export const displayBoxRecipe = recipe({
  base: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    border: `1px solid ${vars.colors.gray200}`,
    borderRadius: "2px",
    fontFamily: vars.fonts.base,
    transition: "border-color 0.2s ease",

    height: "55px",
    padding: "0 20px",
    fontSize: vars.fontSize[14],

    "@media": {
      [media.pc]: {
        height: "60px",
        fontSize: vars.fontSize[16],
      },
    },
  },
  variants: {
    hasFile: {
      true: {
        color: vars.colors.white,
        fontWeight: vars.fontWeight.regular,
      },
      false: {
        color: vars.colors.gray300,
        fontWeight: vars.fontWeight.light,
      },
    },
    error: {
      true: { borderColor: vars.colors.red },
    },
    disabled: {
      true: {
        borderColor: vars.colors.gray400,
        color: vars.colors.gray400,
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: {
    hasFile: false,
  },
});

export const fileNameText = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginRight: "8px",
});

export const clearButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  background: "none",
  border: "none",
  cursor: "pointer",
  flexShrink: 0,
});

export const uploadButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  border: `1px solid ${vars.colors.main}`,
  borderRadius: "2px",
  color: vars.colors.main,
  fontFamily: vars.fonts.base,
  fontWeight: vars.fontWeight.regular,
  whiteSpace: "nowrap",
  cursor: "pointer",
  flexShrink: 0,
  transition: "background-color 0.2s ease",

  height: "55px",
  padding: "0 20px",
  fontSize: vars.fontSize[14],

  "@media": {
    [media.pc]: {
      height: "60px",
      padding: "0 20px",
      fontSize: vars.fontSize[16],
    },
  },

  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:disabled": {
      borderColor: vars.colors.gray400,
      color: vars.colors.gray400,
      cursor: "not-allowed",
    },
  },
});

export const errorMessage = style({
  marginTop: "8px",
  fontWeight: vars.fontWeight.light,
  color: vars.colors.red,
  fontSize: vars.fontSize[12],
  "@media": {
    [media.pc]: {
      fontSize: vars.fontSize[14],
    },
  },
});
