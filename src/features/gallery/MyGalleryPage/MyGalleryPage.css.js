import { globalStyle, style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "1480px",
  minWidth: "375px",
  minHeight: "100dvh",
  margin: "0 auto",
  padding: "20px 15px 90px",
  "@media": {
    [media.tablet]: {
      padding: "40px 20px 60px",
    },
    [media.pc]: {
      padding: "60px 20px 120px",
    },
  },
});

export const topRow = style({
  "@media": {
    [media.tablet]: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingBottom: "20px",
      borderBottom: `2px solid ${vars.colors.gray100}`,
    },
  },
});

export const pageTitle = style({
  display: "none",
  fontFamily: vars.fonts.brand,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  letterSpacing: vars.letterSpacing.brand,
  lineHeight: 1.2,
  "@media": {
    [media.tablet]: {
      display: "block",
      fontSize: vars.fontSize[48],
    },
    [media.pc]: {
      fontSize: vars.fontSize[62],
    },
  },
});

export const createButton = style({
  position: "fixed",
  left: "15px",
  right: "15px",
  bottom: "15px",
  height: "55px",
  fontSize: vars.fontSize[16],
  zIndex: vars.zIndex.dropdown,
  whiteSpace: "nowrap",
  "@media": {
    [media.tablet]: {
      position: "static",
      width: "342px",
      height: "55px",
      fontSize: vars.fontSize[16],
    },
    [media.pc]: {
      width: "440px",
      height: "60px",
      fontSize: vars.fontSize[18],
    },
  },
});

export const summarySection = style({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  paddingBottom: "20px",
  borderBottom: `1px solid ${vars.colors.gray400}`,
  "@media": {
    [media.tablet]: {
      marginTop: "40px",
      paddingBottom: "30px",
    },
    [media.pc]: {
      gap: "20px",
      paddingBottom: "40px",
    },
  },
});

export const summaryTitle = style({
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[20],
    },
    [media.pc]: {
      fontSize: vars.fontSize[24],
    },
  },
});

export const summaryCount = style({
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.gray300,
  marginLeft: "4px",
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[18],
    },
    [media.pc]: {
      fontSize: vars.fontSize[20],
    },
  },
});

export const chipRow = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  overflowX: "auto",
  padding: "4px 2px",
  margin: "-4px -2px",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  "@media": {
    [media.pc]: {
      gap: "20px",
    },
  },
});

export const chipButton = style({
  cursor: "pointer",
  outline: "none",
  transition: "opacity 0.2s ease, background-color 0.2s ease",
  selectors: {
    "&:hover": {
      opacity: 0.85,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.colors.white}`,
      outlineOffset: "2px",
    },
  },
});

export const chipInactive = style({
  opacity: 0.35,
  selectors: {
    "&:hover": {
      opacity: 0.75,
    },
  },
});

export const chipActive = style({
  opacity: 1,
  fontWeight: vars.fontWeight.bold,
});

export const chipActiveMain = style({
  backgroundColor: "rgba(239, 255, 4, 0.15)",
});

export const chipActiveBlue = style({
  backgroundColor: "rgba(41, 201, 249, 0.15)",
});

export const chipActivePurple = style({
  backgroundColor: "rgba(167, 126, 255, 0.15)",
});

export const chipActivePink = style({
  backgroundColor: "rgba(255, 42, 106, 0.15)",
});

export const chipActiveColors = {
  blue: chipActiveBlue,
  main: chipActiveMain,
  pink: chipActivePink,
  purple: chipActivePurple,
};

export const queryRow = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "15px",
  marginBottom: "20px",
  "@media": {
    [media.tablet]: {
      gap: "30px",
      marginTop: "20px",
      marginBottom: "40px",
    },
    [media.pc]: {
      gap: "45px",
      marginTop: "30px",
      marginBottom: "60px",
    },
  },
});

export const mobileFilterButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "45px",
  height: "45px",
  flexShrink: 0,
  backgroundColor: "transparent",
  border: `1px solid ${vars.colors.gray200}`,
  borderRadius: "2px",
  cursor: "pointer",
  "@media": {
    [media.tablet]: {
      display: "none",
    },
  },
});

export const searchInput = style({
  flex: 1,
  height: "45px",
  "@media": {
    [media.tablet]: {
      flex: "0 0 200px",
      width: "200px",
      height: "45px",
    },
    [media.pc]: {
      flex: "0 0 320px",
      width: "320px",
      height: "50px",
    },
  },
});

globalStyle(`${searchInput} input`, {
  height: "45px",
  "@media": {
    [media.pc]: {
      height: "50px",
    },
  },
});

export const desktopFilters = style({
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "flex",
      alignItems: "center",
      gap: "25px",
    },
    [media.pc]: {
      gap: "45px",
    },
  },
});

export const filterDropdown = style({
  width: "auto",
});

globalStyle(`${filterDropdown} > button`, {
  border: "none",
  height: "45px",
  padding: "0 4px",
  gap: "10px",
  width: "auto",
  whiteSpace: "nowrap",
});

globalStyle(`${filterDropdown} > ul`, {
  minWidth: "130px",
  width: "max-content",
});

export const cardGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "15px",
  "@media": {
    [media.tablet]: {
      gap: "20px",
    },
    [media.pc]: {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "40px",
    },
  },
});

export const statusWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "40dvh",
  margin: "0 auto",
});

export const informText = style({
  fontFamily: vars.fonts.brand,
  fontWeight: vars.fontWeight.regular,
  fontSize: vars.fontSize[20],
  color: vars.colors.gray300,
  textAlign: "center",
  margin: "12px 0",
  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize[28],
    },
    [media.pc]: {
      fontSize: vars.fontSize[36],
    },
  },
});

export const retryButton = style({
  marginTop: "16px",
});

export const mobileFilterModal = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100dvw",
  minWidth: "375px",
  maxWidth: "none",
  height: "45dvh",
  maxHeight: "45dvh",
  boxSizing: "border-box",
  padding: "15px",
  borderRadius: "12px 12px 0 0",
  alignItems: "stretch",
});

globalStyle(`${mobileFilterModal} button[aria-label="모달 닫기"]`, {
  display: "none",
});

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
