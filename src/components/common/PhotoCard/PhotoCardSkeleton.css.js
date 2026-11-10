import { keyframes, style } from "@vanilla-extract/css";

import { media } from "@/styles/theme.css";

// 쉬머 애니메이션
const shimmer = keyframes({
  "0%": {
    backgroundPosition: "200% 0",
  },
  "100%": {
    backgroundPosition: "-200% 0",
  },
});

// 반투명 베이스
export const skeletonBase = style({
  backgroundImage: `linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 25%,
    rgba(255, 255, 255, 0.14) 50%,
    rgba(255, 255, 255, 0.04) 75%
  )`,
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.6s ease-in-out infinite`,
});

// 텍스트 바 베이스
export const skeletonPill = style([
  skeletonBase,
  {
    borderRadius: "9999px",
  },
]);

// 썸네일 이미지 박스
export const imageBox = style([
  skeletonBase,
  {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "4px",
  },
]);

// 제목 바
export const titleBar = style([
  skeletonPill,
  {
    width: "65%",
    height: "14px",
    "@media": {
      [media.tablet]: {
        height: "22px",
      },
    },
  },
]);

// 메타 영역 (등급 / 닉네임)
export const metaRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

export const metaLeftBar = style([
  skeletonPill,
  {
    width: "40%",
    height: "10px",
    "@media": {
      [media.tablet]: {
        height: "14px",
      },
    },
  },
]);

export const metaRightBar = style([
  skeletonPill,
  {
    width: "28%",
    height: "10px",
    "@media": {
      [media.tablet]: {
        height: "14px",
      },
    },
  },
]);

// 얇은 구분선
export const divider = style({
  width: "100%",
  height: "1px",
  backgroundColor: "rgba(255, 255, 255, 0.06)",
  margin: "4px 0",
});

// 가격 / 수량 행
export const infoRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const infoLabelBar = style([
  skeletonPill,
  {
    width: "18%",
    height: "10px",
    "@media": {
      [media.tablet]: {
        height: "14px",
      },
    },
  },
]);

export const infoValueBar = style([
  skeletonPill,
  {
    width: "32%",
    height: "10px",
    "@media": {
      [media.tablet]: {
        height: "14px",
      },
    },
  },
]);

// 하단 로고 (태블릿/PC)
export const logo = style([
  skeletonPill,
  {
    display: "none",
    "@media": {
      [media.tablet]: {
        display: "block",
        margin: "8px auto 0",
        width: "75px",
        height: "14px",
      },
    },
  },
]);
