import { globalStyle, style } from "@vanilla-extract/css";
import { keyframes } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css.js";

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const signupContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  maxWidth: "345px",
  minHeight: "100dvh",

  "@media": {
    [media.tablet]: {
      maxWidth: "440px",
    },
    [media.pc]: {
      maxWidth: "520px",
    },
  },
});

export const formContainer = style({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "34px",
  width: "100%",
  margin: "80px 0 44px",
});

//로고 사이즈를 로그인 페이지에서만 덮어씌우는 코드
export const logoSize = style({
  display: "block",
});
globalStyle(`${logoSize} img`, { width: "330px" });

export const input = style({
  width: "100%",
});

export const navLogin = style({
  display: "flex",
  marginTop: "40px",
  gap: "10px",
});

export const buttonText = style({
  color: vars.colors.black,
  fontFamily: vars.fonts.base,
  fontSize: vars.fontSize[18],
  fontWeight: vars.fontWeight.bold,
  lineHeight: "normal",
});

export const text = style({
  color: vars.colors.white,
  fontFamily: vars.fonts.base,
  fontSize: vars.fontSize[16],
  fontWeight: vars.fontWeight.regular,
  lineHeight: "normal",
});
export const link = style({
  color: vars.colors.main,
  fontFamily: vars.fonts.base,
  fontSize: vars.fontSize[16],
  fontWeight: vars.fontWeight.regular,
  lineHeight: "normal",
  textDecoration: "underline",
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg) scale(1)", opacity: 0.4 },
  "50%": { transform: "rotate(180deg) scale(0.5)", opacity: 1 },
  "100%": { transform: "rotate(360deg) scale(1)", opacity: 0.4 },
});

export const spinner = style({
  display: "block",
  width: "24px",
  height: "24px",
  border: "3px solid currentColor",
  borderTopColor: "transparent",
  borderRadius: "50%",
  animation: `${spin} 0.8s linear infinite`,
});

// 화면에서는 숨기고 스크린 리더에게만 읽히게 하는 스타일
export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
