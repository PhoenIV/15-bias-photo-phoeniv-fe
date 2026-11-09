import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "50px 0",
});

export const topRow = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  color: vars.colors.white,
  fontSize: vars.fontSize[16],
  fontWeight: vars.fontWeight.bold,
  paddingBottom: "5px",
  borderBottom: `1px solid ${vars.colors.gray100}`,
  marginTop: "20px",
  width: "100%",
});

export const exchangeInfoContainer = style({
  paddingBottom: "20px",
  borderBottom: `1px solid ${vars.colors.gray400}`,
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
  borderBottom: `1px solid ${vars.colors.gray400}`,
});

export const actionButtons = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
