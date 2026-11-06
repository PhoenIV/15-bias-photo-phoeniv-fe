import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { media, vars } from "./theme.css.js";

const space = {
  none: 0,
  small: vars.space.small,
  medium: vars.space.medium,
  large: vars.space.large,
};

const responsiveProperties = defineProperties({
  // 반응형 조건
  conditions: {
    mobile: {}, // 기본값 (0px 부터)
    tablet: { "@media": media.tablet },
    pc: { "@media": media.pc },
  },
  defaultCondition: "mobile", // 아무것도 안 적으면 모바일 기준

  // 반응형을 적용할 속성들
  properties: {
    display: ["none", "flex", "block", "grid"],
    padding: space,
    margin: space,
  },
});

export const sprinkles = createSprinkles(responsiveProperties);
