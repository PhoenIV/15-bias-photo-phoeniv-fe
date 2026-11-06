import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css.js";

// 모바일에서는 헤더에 타이틀이 들어가므로 숨김
export const wrapper = recipe({
  base: {
    display: "none",
    "@media": {
      [media.tablet]: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "100%",
        paddingBottom: "20px",
      },
    },
  },
  variants: {
    divider: {
      true: {
        "@media": {
          [media.tablet]: {
            borderBottom: `2px solid ${vars.colors.gray100}`,
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    divider: true,
  },
});

export const title = style({
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[48],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  letterSpacing: vars.letterSpacing.brand,
  lineHeight: 1.2,
  "@media": {
    [media.pc]: {
      fontSize: vars.fontSize[62],
    },
  },
});

export const action = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});
