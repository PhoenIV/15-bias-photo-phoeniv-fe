import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  borderBottom: `1px solid ${vars.colors.gray400}`,
});

export const firstRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0 20px",
  borderBottom: `1px solid ${vars.colors.gray400}`,
});

export const cardInfo = style({
  fontSize: vars.fontSize[30],
  color: vars.colors.gray300,
});

export const divider = style({
  color: vars.colors.gray400,
});

export const sellerInfo = style({
  color: vars.colors.white,
  textDecoration: "underline",
});

export const secondRow = style({
  padding: "20px 0",
  borderBottom: `1px solid ${vars.colors.gray400}`,
});

export const descriptionInfo = style({});

export const thirdRow = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
});

export const thirdRowFieldName = style({
  color: vars.colors.gray300,
});

export const thirdRowValue = style({
  color: vars.colors.white,
  fontWeight: vars.fontWeight.bold,
});

export const totalQuantity = style({
  color: vars.colors.gray300,
  fontWeight: vars.fontWeight.normal,
});
