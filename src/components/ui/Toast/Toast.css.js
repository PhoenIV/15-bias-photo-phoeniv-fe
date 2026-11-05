import { keyframes, style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

const slideDown = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(-16px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const toastContainer = style({
  position: "fixed",
  top: "24px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: vars.zIndex.toast,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  pointerEvents: "none",
  maxWidth: "90vw",
  "@media": {
    [media.tablet]: {
      top: "36px",
    },
  },
});

export const toastItem = style({
  pointerEvents: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 24px",
  backgroundColor: "rgba(35, 35, 35, 0.65)",
  color: vars.colors.white,
  borderRadius: "9999px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.regular,
  fontFamily: vars.fonts.base,
  maxWidth: "100%",
  wordBreak: "keep-all",
  animation: `${slideDown} 0.25s ease-out`,
  "@media": {
    [media.tablet]: {
      padding: "14px 28px",
      fontSize: vars.fontSize[16],
      whiteSpace: "nowrap",
    },
  },
});

export const iconWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  fontSize: vars.fontSize[16],
  lineHeight: 1,
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[18],
    },
  },
});
