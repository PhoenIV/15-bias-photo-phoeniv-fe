import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css.js";

export const gradeTextRecipe = recipe({
  variants: {
    grade: {
      COMMON: { color: vars.colors.main },
      RARE: { color: vars.colors.blue },
      SUPER_RARE: { color: vars.colors.purple },
      LEGENDARY: { color: vars.colors.pink },
    },
    type: {
      "card-lg": { fontSize: vars.fontSize[16], fontWeight: vars.fontWeight.light },
      "card-sm": { fontSize: vars.fontSize[10], fontWeight: vars.fontWeight.light },
      "detail-lg": { fontSize: vars.fontSize[24], fontWeight: vars.fontWeight.bold },
      "detail-sm": { fontSize: vars.fontSize[18], fontWeight: vars.fontWeight.bold },
    },
  },
  defaultVariants: {
    type: "card-lg",
  },
});
