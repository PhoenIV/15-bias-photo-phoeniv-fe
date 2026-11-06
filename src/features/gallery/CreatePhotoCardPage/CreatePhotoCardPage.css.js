import { globalStyle, style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

// 페이지 전체 컨테이너
export const page = style({
  width: "100%",
  maxWidth: "1480px",
  margin: "0 auto",
  padding: "20px 15px 40px",
  "@media": {
    [media.tablet]: {
      padding: "40px 20px 60px",
    },
    [media.pc]: {
      padding: "60px 40px 120px",
    },
  },
});

// 입력 폼
export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  maxWidth: "345px",
  margin: "0 auto",
  "@media": {
    [media.tablet]: {
      gap: "40px",
      maxWidth: "440px",
      marginTop: "80px",
    },
    [media.pc]: {
      gap: "60px",
      maxWidth: "520px",
    },
  },
});

// Dropdown 스타일 덮어쓰기
export const dropdown = style({});
globalStyle(`${dropdown} label`, { fontWeight: vars.fontWeight.bold });
globalStyle(`${dropdown} button, ${dropdown} li`, { fontSize: vars.fontSize[16] });
globalStyle(`${dropdown} button, ${dropdown} li`, {
  "@media": {
    [media.pc]: { fontSize: vars.fontSize[20] },
  },
});

export const submitButton = style({
  marginTop: "14px",
  "@media": {
    [media.tablet]: {
      marginTop: "4px",
    },
    [media.pc]: {
      height: "60px",
      fontSize: vars.fontSize[18],
    },
  },
});

export const quotaText = style({
  marginTop: "12px",
  textAlign: "center",
  fontSize: vars.fontSize[14],
  color: vars.colors.gray300,
});
