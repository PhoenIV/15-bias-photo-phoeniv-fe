import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css.js";

// 1. 배경 오버레이
export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: vars.zIndex.modal,
  padding: "16px",
});

// 2. 모달 박스
export const contentRecipe = recipe({
  base: {
    position: "relative",
    width: "100%",
    backgroundColor: vars.colors.gray500,
    borderRadius: "2px",
    color: vars.colors.white,
    fontFamily: vars.fonts.base,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  variants: {
    variant: {
      alert: {
        maxWidth: "345px",
        padding: "60px 20px 40px 20px",
        "@media": {
          [media.tablet]: {
            maxWidth: "400px",
            padding: "60px 32px 40px 32px",
          },
          [media.pc]: {
            maxWidth: "560px",
            padding: "80px 60px 60px 60px",
          },
        },
      },
      // 일반/커스텀 모달
      default: {
        maxWidth: "345px",
        padding: "48px 20px 32px",
        "@media": {
          [media.tablet]: {
            maxWidth: "600px",
            padding: "60px 40px 48px",
          },
          [media.pc]: {
            maxWidth: "800px",
            padding: "80px 60px 60px",
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// 닫기(X) 버튼
export const closeButton = style({
  position: "absolute",
  top: "12px",
  right: "12px",
  width: "28px",
  height: "28px",
  padding: 0,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "@media": {
    [media.tablet]: {
      top: "16px",
      right: "16px",
    },
    [media.pc]: {
      top: "24px",
      right: "24px",
      width: "32px",
      height: "32px",
    },
  },
});

globalStyle(`${closeButton} img`, {
  width: "100%",
  height: "100%",
});

/* =========================================================
  AlertModal 전용 스타일
  ========================================================= */
export const alertTitle = style({
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  fontSize: vars.fontSize[18],
  marginBottom: "16px",
  "@media": {
    [media.pc]: {
      fontSize: vars.fontSize[20],
      marginBottom: "24px",
    },
  },
});

export const alertDesc = style({
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.gray300,
  fontSize: vars.fontSize[14],
  lineHeight: "1.6",
  whiteSpace: "pre-line",
  marginBottom: "32px",
  "@media": {
    [media.pc]: {
      fontSize: vars.fontSize[16],
      marginBottom: "40px",
    },
  },
});

export const alertButtonWrapper = style({
  width: "100%",
  maxWidth: "120px",
  "@media": {
    [media.pc]: {
      maxWidth: "170px",
    },
  },
});

export const alertButtonOverride = style({
  height: "55px !important",
  fontSize: `${vars.fontSize[16]} !important`,
  "@media": {
    [media.pc]: {
      height: "60px !important",
      fontSize: `${vars.fontSize[18]} !important`,
    },
  },
});
