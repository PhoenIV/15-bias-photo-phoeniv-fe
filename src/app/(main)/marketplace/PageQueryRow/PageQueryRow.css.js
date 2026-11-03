import { style } from "@vanilla-extract/css";

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
  height: "22px",
});

export const mobileFilter = style({
  width: "45px",
  height: "45px",
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
    [media.tablet]: { display: "flex", width: "100%", maxWidth: "200px" },
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
