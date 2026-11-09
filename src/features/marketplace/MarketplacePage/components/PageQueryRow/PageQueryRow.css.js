import { globalStyle, style } from "@vanilla-extract/css";

import { media } from "@/styles/theme.css";

export const pageQueryRow = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gridTemplateAreas: `"search search" "filters sort"`,
  gap: "8px",
  "@media": {
    [media.tablet]: {
      display: "flex",
      alignItems: "center",
    },
    [media.pc]: {
      //   gridTemplateColumns: "140px auto minmax(120px, 1fr)",
      //   gridTemplateAreas: `"search filters sort"`,
      //   gap: "16px",
      display: "flex",
      alignItems: "center",
    },
  },
});

export const search = style({
  gridArea: "search",
  width: "100%",
  maxWidth: "713px",
  height: "45px",
  margin: "20px auto 0",
  "@media": {
    [media.tablet]: {
      maxWidth: "300px",
      padding: "11px 20px",
      marginLeft: "10px",
      position: "relative",
      top: "-23px",
    },
    [media.pc]: {
      maxWidth: "320px",
      height: "50px",
    },
  },
});

export const filters = style({
  gridArea: "filters",
  display: "none",
  "@media": {
    [media.tablet]: {
      flex: "0 0 300px",
      display: "flex",
      height: "45px",
      justifyContent: "space-around",
      alignItems: "center",
      gap: "10px",
      "& button": { border: "none" },
    },
  },
});

export const filter = style({
  flex: "1 1 0",
  height: "22px",
  minWidth: "120px",
  whiteSpace: "nowrap",
  textAlign: "left",
});

export const mobileFilter = style({
  width: "45px",
  height: "45px",
  minWidth: 0,
  margin: "15px",
  "@media": {
    [media.tablet]: {
      display: "none",
    },
  },
});

export const blankSpace = style({
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "flex",
      width: "100%",
      maxWidth: "200px",
      flex: "1 1 0",
      minWidth: 0,
    },
    [media.pc]: { display: "flex", width: "100%", maxWidth: "400px" },
  },
});

export const sort = style({
  gridArea: "sort",
  width: "130px",
  height: "35px",
  margin: "15px",
  "@media": {
    [media.tablet]: {
      width: "140px",
      height: "45px",
    },
    [media.tablet]: {
      height: "50px",
    },
  },
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
