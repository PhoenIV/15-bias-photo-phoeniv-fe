import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css.js";

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
      outlined: {
        border: "1px solid",
        gap: "10px",
      },
      ghost: {
        border: "none",
      },
    },
    size: {
      lg: {},
      md: {},
      sm: {},
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
    // 1. 테두리 있는 타입 (lg, md, sm)
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

    // 2. 테두리 없는 타입 (lg, md, sm)
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
  ],

  defaultVariants: {
    variant: "outlined",
    size: "md",
    color: "default",
  },
});
