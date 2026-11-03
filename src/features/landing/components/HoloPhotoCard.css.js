import { style } from "@vanilla-extract/css";

import { media } from "@/styles/theme.css.js";

export const holoCardWrapper = style({
  position: "relative",
  width: "160px",
  borderRadius: "12px",
  transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
  transformStyle: "preserve-3d",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.65)",
  cursor: "pointer",
  overflow: "hidden",
  willChange: "transform",
  "@media": {
    [media.tablet]: { width: "200px" },
    [media.pc]: { width: "240px" },
  },
});

export const holoCardImage = style({
  display: "block",
  width: "100%",
  height: "auto",
  pointerEvents: "none",
});

export const holoFoil = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `
    linear-gradient(
      125deg,
      rgba(255, 119, 181, 0.45) 0%,
      rgba(255, 237, 133, 0.45) 20%,
      rgba(138, 255, 193, 0.45) 40%,
      rgba(130, 219, 255, 0.45) 60%,
      rgba(195, 148, 255, 0.45) 80%,
      rgba(255, 119, 181, 0.45) 100%
    )
  `,
  backgroundSize: "350% 350%", // 크기를 크게 키워서 경계선이 보이지 않도록 처리
  mixBlendMode: "color-dodge",
  transition: "opacity 0.4s ease",
});

// 빛 반사
export const holoGlare = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  mixBlendMode: "overlay",
  transition: "opacity 0.4s ease",
});
