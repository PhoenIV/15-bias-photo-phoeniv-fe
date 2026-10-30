import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css.js";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const labelRecipe = recipe({
  base: {
    color: vars.colors.white,
    marginBottom: "10px",
  },
  variants: {
    variant: {
      default: {
        // 일반 Input
        fontWeight: vars.fontWeight.regular,
        fontSize: vars.fontSize[16],
        "@media": {
          [media.pc]: {
            fontSize: vars.fontSize[18],
          },
        },
      },
      display: {
        // 포토카드 폼
        fontWeight: vars.fontWeight.bold,
        fontSize: vars.fontSize[16],
        "@media": {
          [media.pc]: {
            fontSize: vars.fontSize[20],
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const inputContainer = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
});

export const inputRecipe = recipe({
  base: {
    width: "100%",
    backgroundColor: "transparent",
    border: `1px solid ${vars.colors.gray200}`,
    borderRadius: "2px",
    color: vars.colors.white,
    fontFamily: vars.fonts.base,
    outline: "none",
    transition: "border-color 0.2s ease",

    // 모바일 기본 (태블릿과 동일)
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
      "&::placeholder": {
        color: vars.colors.gray300,
        fontWeight: vars.fontWeight.light,
      },
      "&:focus": {
        borderColor: vars.colors.white,
      },
      "&:disabled": {
        borderColor: vars.colors.gray400,
        color: vars.colors.gray400,
        cursor: "not-allowed",
      },
      // 브라우저 기본 X 버튼 숨기기
      "&::-webkit-search-cancel-button": {
        display: "none",
      },
    },
  },
  variants: {
    variant: {
      default: {
        fontWeight: vars.fontWeight.regular,
        fontSize: vars.fontSize[14],
        "@media": {
          [media.pc]: { fontSize: vars.fontSize[16] },
        },
      },
      display: {
        fontWeight: vars.fontWeight.bold,
        fontSize: vars.fontSize[16],
        "@media": {
          [media.pc]: { fontSize: vars.fontSize[20] },
        },
      },
    },
    error: {
      true: {
        borderColor: vars.colors.red,
        selectors: { "&:focus": { borderColor: vars.colors.red } },
      },
    },
    hasRightElement: {
      true: {
        paddingRight: "44px",
        "@media": {
          [media.pc]: {
            paddingRight: "52px",
          },
        },
      },
    },
  },
});

export const rightElement = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.colors.gray200,
  right: "16px",
  "@media": {
    [media.pc]: {
      right: "20px",
    },
  },
});

export const errorMessage = style({
  marginTop: "8px",
  fontWeight: vars.fontWeight.light,
  color: vars.colors.red,
  fontSize: vars.fontSize[14],
  "@media": {
    [media.pc]: {
      marginTop: "10px",
      fontSize: vars.fontSize[16],
    },
  },
});
