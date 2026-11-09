import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: "375px",
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "15px",
  "@media": {
    [media.tablet]: {
      padding: "30px",
    },
    [media.pc]: {
      padding: "30px clamp(30px, 15.3vw, 220px)",
    },
  },
});

export const pageTitle = style({
  fontFamily: vars.fonts.brand,
  color: vars.colors.gray300,
  fontSize: vars.fontSize[20],
  "@media": {
    [media.tablet]: {
      marginBottom: "30px",
      fontSize: "24px",
    },
    [media.pc]: {},
  },
});

export const saleContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: "0 auto",

  "@media": {
    [media.tablet]: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "20px",
    },
    [media.pc]: {
      gap: "50px",
    },
  },
});

export const cardTitle = style({
  color: vars.colors.white,
  fontSize: vars.fontSize[20],
  fontWeight: vars.fontWeight.bold,
  paddingBottom: "10px",
  borderBottom: `1px solid ${vars.colors.gray100}`,
  margin: "20px auto",
  width: "100%",
  "@media": {
    [media.tablet]: {},
    [media.pc]: {},
  },
});

export const imageWrapper = style({
  position: "relative",
  width: "100%",
  aspectRatio: " 4 / 3 ",
  "@media": {
    [media.tablet]: {
      flex: "0 0 48%",
    },
    [media.pc]: {
      flex: "0 0 65%",
    },
  },
});

export const cardImage = style({
  objectFit: "cover",
});

export const saleArea = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: "0 auto",
  "@media": {
    [media.tablet]: {
      width: "auto",
      flex: "0 0 calc(52% - 20px)",
    },
    [media.pc]: {
      flex: "0 0 calc(35% - 50px)",
    },
  },
});

export const commonSaleInfo = style({
  width: "100%",
  margin: "0 auto",
  "@media": {
    [media.tablet]: {},
    [media.pc]: {},
  },
});

export const saleActionArea = style({
  width: "100%",
  margin: "0 auto",
  "@media": {
    [media.tablet]: {},
    [media.pc]: {},
  },
});

export const exchangeContainer = style({});

export const exchangeArea = style({
  "@media": {
    [media.tablet]: {},
    [media.pc]: {},
  },
});
