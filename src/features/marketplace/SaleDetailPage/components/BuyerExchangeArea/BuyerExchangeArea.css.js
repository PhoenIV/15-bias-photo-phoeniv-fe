import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

export const areaTitleRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  color: vars.colors.white,
  fontSize: vars.fontSize[20],
  fontWeight: vars.fontWeight.bold,
  paddingBottom: "10px",
  borderBottom: `1px solid ${vars.colors.gray100}`,
  margin: "20px auto",
  width: "100%",
});

export const exchangeButtonInTitleRow = style({
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "flex",
      width: "calc(52% - 20px)",
    },
    [media.pc]: {
      width: "calc(35% - 50px)",
    },
  },
});

export const exchangeButtonBelowMyOffers = style({
  width: "100%",
  marginTop: "20px",
  "@media": {
    [media.tablet]: { display: "none", selectors: { "&": { display: "none" } } },
  },
});

export const exchangeInfoContainer = style({
  paddingBottom: "20px",
});

export const exchangeInfo = style({
  fontSize: vars.fontSize[30],
  color: vars.colors.gray300,
});

export const divider = style({
  color: vars.colors.gray400,
});

export const exchangeDescription = style({
  paddingBottom: "20px",
});

export const myOfferTitleRow = style({
  color: vars.colors.white,
  fontSize: vars.fontSize[20],
  fontWeight: vars.fontWeight.bold,
  paddingBottom: "10px",
  borderBottom: `1px solid ${vars.colors.gray100}`,
  margin: "20px auto",
  width: "100%",
});

export const cardContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  "@media": { [media.pc]: { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" } },
});
