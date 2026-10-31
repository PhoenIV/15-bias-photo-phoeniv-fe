import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css.js";

export const chipRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: "1px",
    whiteSpace: "nowrap",
  },

  variants: {
    variant: {
      outlined: { border: "1px solid", gap: "10px" },
      ghost: { border: "none" },
    },
    size: {
      responsive: {}, // 화면 크기에 따라 자동 전환 (모바일 → 태블릿 → PC)
      lg: {}, // PC 값 고정
      md: {}, // 태블릿 값 고정
      sm: {}, // 모바일 값 고정
    },
    color: {
      default: { borderColor: vars.colors.gray400, color: vars.colors.gray400 },
      main: { borderColor: vars.colors.main, color: vars.colors.main },
      blue: { borderColor: vars.colors.blue, color: vars.colors.blue },
      purple: { borderColor: vars.colors.purple, color: vars.colors.purple },
      pink: { borderColor: vars.colors.pink, color: vars.colors.pink },
    },
  },

  compoundVariants: [
    // --- outlined ---
    {
      variants: { variant: "outlined", size: "lg" },
      style: {
        padding: "8px 20px",
        fontSize: vars.fontSize[16],
        fontWeight: vars.fontWeight.light,
      },
    },
    {
      variants: { variant: "outlined", size: "md" },
      style: {
        padding: "6px 10px",
        fontSize: vars.fontSize[14],
        fontWeight: vars.fontWeight.light,
      },
    },
    {
      variants: { variant: "outlined", size: "sm" },
      style: {
        padding: "6px 10px",
        fontSize: vars.fontSize[12],
        fontWeight: vars.fontWeight.light,
      },
    },
    {
      // 모바일 sm → 태블릿 md → PC lg 값
      variants: { variant: "outlined", size: "responsive" },
      style: {
        padding: "6px 10px",
        fontSize: vars.fontSize[12],
        fontWeight: vars.fontWeight.light,
        "@media": {
          [media.tablet]: { fontSize: vars.fontSize[14] },
          [media.pc]: { padding: "8px 20px", fontSize: vars.fontSize[16] },
        },
      },
    },

    // --- ghost ---
    {
      variants: { variant: "ghost", size: "lg" },
      style: {
        padding: "4px 10px",
        fontSize: vars.fontSize[16],
        fontWeight: vars.fontWeight.regular,
      },
    },
    {
      variants: { variant: "ghost", size: "md" },
      style: {
        padding: "4px 8px",
        fontSize: vars.fontSize[14],
        fontWeight: vars.fontWeight.regular,
      },
    },
    {
      variants: { variant: "ghost", size: "sm" },
      style: {
        padding: "4px 8px",
        fontSize: vars.fontSize[10],
        fontWeight: vars.fontWeight.regular,
      },
    },
    {
      variants: { variant: "ghost", size: "responsive" },
      style: {
        padding: "4px 8px",
        fontSize: vars.fontSize[10],
        fontWeight: vars.fontWeight.regular,
        "@media": {
          [media.tablet]: { fontSize: vars.fontSize[14] },
          [media.pc]: { padding: "4px 10px", fontSize: vars.fontSize[16] },
        },
      },
    },
  ],

  defaultVariants: {
    variant: "outlined",
    size: "md",
    color: "default",
  },
});
