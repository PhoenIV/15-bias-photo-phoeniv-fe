import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "20px 0",
});

export const quantityRow = style({
  display: "flex",
  justifyContent: "space-between",
});

export const quantityController = style({
  display: "inline-block",
  border: `1px solid ${vars.colors.white}`,
  width: "100px",
});

export const quantityButton = style({
  color: vars.colors.white,
  fontSize: vars.fontSize[20],
  textAlign: "center",
});

export const input = style({
  background: vars.colors.black,
  color: vars.colors.white,
  textAlign: "center",
  width: "80%",
});

export const totalPriceRow = style({
  display: "flex",
  justifyContent: "space-between",
});

export const fieldName = style({
  color: vars.colors.white,
});

export const fieldValue = style({});

export const totalPrice = style({
  color: vars.colors.white,
  fontWeight: vars.fontWeight.bold,
});

export const setQuantity = style({
  color: vars.colors.gray300,
});

export const purchaseButton = style({
  width: "100%",
});
