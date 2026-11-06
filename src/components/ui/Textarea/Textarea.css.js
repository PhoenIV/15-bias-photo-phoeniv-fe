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

export const textareaRecipe = recipe({
  base: {
    width: "100%",
    backgroundColor: "transparent",
    border: `1px solid ${vars.colors.gray200}`,
    borderRadius: "2px",
    color: vars.colors.white,
    fontFamily: vars.fonts.base,
    fontWeight: vars.fontWeight.regular,
    lineHeight: "1.5",
    wordBreak: "break-all",
    outline: "none",
    resize: "none",

    overflowY: "scroll",
    transition: "border-color 0.2s ease",

    height: "140px",
    padding: "12px 4px 12px 20px",
    fontSize: vars.fontSize[14],

    "@media": {
      [media.pc]: {
        height: "180px",
        padding: "18px 4px 18px 20px",
        fontSize: vars.fontSize[16],
      },
    },

    selectors: {
      "&::placeholder": {
        color: vars.colors.gray300,
        fontWeight: vars.fontWeight.light,
      },
      "&:focus": { borderColor: vars.colors.white },
      "&:disabled": {
        borderColor: vars.colors.gray400,
        color: vars.colors.gray400,
        cursor: "not-allowed",
      },

      // 스크롤바 디자인
      "&::-webkit-scrollbar": {
        width: "16px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: vars.colors.gray400,
        borderRadius: "10px",
        border: "4px solid transparent",
        backgroundClip: "padding-box",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: vars.colors.gray300,
        border: "4px solid transparent",
        backgroundClip: "padding-box",
      },
    },
  },
  variants: {
    error: {
      true: {
        borderColor: vars.colors.red,
        selectors: { "&:focus": { borderColor: vars.colors.red } },
      },
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
