import { globalStyle, style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css.js";

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const loginContainer = style({
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

export const navRegister = style({
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
