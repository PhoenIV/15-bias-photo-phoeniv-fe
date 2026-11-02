import { style } from "@vanilla-extract/css";

export const container = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gridTemplateRows: "repeat(5, minmax(0, 1fr))",
});

export const photoCard = style({
  width: "440px",
  height: "600px",
});
