import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css.js";

export const modal = style({ maxWidth: "920px", textAlign: "left", alignItems: "stretch" });

export const form = style({ display: "flex", flexDirection: "column", gap: "20px" });

export const subTitle = style({ color: vars.colors.gray300 });

export const title = style({
  paddingBottom: "10px",
  borderBottom: `2px solid ${vars.colors.gray100}`,
  fontSize: vars.fontSize[24],
  fontWeight: vars.fontWeight.bold,
});

export const cardRow = style({ display: "flex", gap: "20px" });

export const infoBox = style({ display: "flex", flexDirection: "column", gap: "20px", flex: 1 });

export const fieldRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  whiteSpace: "nowrap",
});

export const stepButton = style({
  width: "30px",
  height: "30px",
  color: vars.colors.white,
  background: "none",
  border: `1px solid ${vars.colors.gray200}`,
});

export const quantity = style({ margin: "0 15px" });

export const sectionTitle = style({
  paddingBottom: "10px",
  borderBottom: `2px solid ${vars.colors.gray100}`,
  fontSize: vars.fontSize[20],
});

export const buttonRow = style({ display: "flex", gap: "15px" });
