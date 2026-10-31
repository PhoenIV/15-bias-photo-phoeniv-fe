import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css.js";

export const gradeTextRecipe = recipe({
  variants: {
    grade: {
      COMMON: { color: vars.colors.main },
      RARE: { color: vars.colors.blue },
      SUPER_RARE: { color: vars.colors.purple },
      LEGENDARY: { color: vars.colors.pink },
    },
    type: {
      // 카드용 (반응형): 모바일 10px → 태블릿 이상 16px
      // PhotoCard처럼 화면 크기에 따라 자동으로 바뀌어야 할 때 사용
      card: {
        fontSize: vars.fontSize[10],
        fontWeight: vars.fontWeight.light,
        "@media": {
          [media.tablet]: { fontSize: vars.fontSize[16] },
        },
      },

      // 기존값 유지
      "card-lg": { fontSize: vars.fontSize[16], fontWeight: vars.fontWeight.light },
      "card-sm": { fontSize: vars.fontSize[10], fontWeight: vars.fontWeight.light },
      "detail-lg": { fontSize: vars.fontSize[24], fontWeight: vars.fontWeight.bold },
      "detail-sm": { fontSize: vars.fontSize[18], fontWeight: vars.fontWeight.bold },
    },
  },
  defaultVariants: {
    type: "card",
  },
});
