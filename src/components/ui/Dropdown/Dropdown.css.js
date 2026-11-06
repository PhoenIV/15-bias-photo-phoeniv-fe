import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css.js";

export const wrapper = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const label = style({
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.white,
  marginBottom: "10px",
  fontSize: vars.fontSize[16],
  "@media": {
    [media.pc]: {
      fontSize: vars.fontSize[20],
    },
  },
});

export const triggerRecipe = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
    border: `1px solid ${vars.colors.gray200}`,
    borderRadius: "2px",
    fontFamily: vars.fonts.base,
    textAlign: "left",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.2s ease",

    // 모바일
    height: "55px",
    padding: "0 20px",
    fontSize: vars.fontSize[14],

    "@media": {
      [media.pc]: {
        height: "60px",
        fontSize: vars.fontSize[16],
      },
    },

    selectors: {
      "&:focus": {
        borderColor: vars.colors.white,
      },
      "&:disabled": {
        borderColor: vars.colors.gray400,
        color: vars.colors.gray400,
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    hasValue: {
      true: {
        color: vars.colors.white,
        fontWeight: vars.fontWeight.regular, // 값이 선택되었을 때 선명
      },
      false: {
        color: vars.colors.gray300, // placeholder 색상
        fontWeight: vars.fontWeight.light, // 플레이스홀더일 때는 가볍게
      },
    },
    error: {
      true: {
        borderColor: vars.colors.red,
        selectors: {
          "&:focus": { borderColor: vars.colors.red },
        },
      },
    },
  },
  defaultVariants: {
    hasValue: false,
  },
});

export const menuList = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  width: "100%",
  backgroundColor: vars.colors.black,
  border: `1px solid ${vars.colors.gray200}`,
  borderRadius: "2px",
  zIndex: vars.zIndex.dropdown,
  maxHeight: "240px",
  overflowY: "auto",
  listStyle: "none",
  padding: "8px 0",
  margin: 0,
});

export const menuItem = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  color: vars.colors.white,
  fontFamily: vars.fonts.base,
  fontWeight: vars.fontWeight.regular,
  cursor: "pointer",
  transition: "background-color 0.15s ease",

  padding: "10px 16px",
  fontSize: vars.fontSize[14],

  "@media": {
    [media.pc]: {
      padding: "12px 20px",
      fontSize: vars.fontSize[16],
    },
  },

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.gray500,
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
