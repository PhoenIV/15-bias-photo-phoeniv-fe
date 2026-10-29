import { style } from "@vanilla-extract/css";

import { media } from "@/styles/theme.css.js";

export const logoImage = style({
  width: "84px",
  height: "auto",

  "@media": {
    [media.tablet]: {
      width: "110px",
    },
    [media.pc]: {
      width: "138px",
    },
  },
});
