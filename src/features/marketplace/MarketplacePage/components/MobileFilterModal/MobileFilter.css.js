import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

// 모달 내용물 전체
export const modalChildren = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  minHeight: 0,
});

// 닫기 버튼
export const closeButton = style({
  position: "absolute",
  top: "10%",
  right: 0,
  transform: "translateY(-50%)",
  width: "32px",
  height: "32px",
  padding: 0,
  border: 0,
  background: "transparent",
});

// 필터 제목(제일 윗 줄)
export const titleRow = style({
  position: "relative",
  display: "flex",
  flex: "0 0 15%",
  alignItems: "center",
  justifyContent: "center",
});

// 둘째줄
export const filterTabs = style({
  display: "flex",
  flex: "0 0 15%",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
});

// 각각의 탭(가로로 진열)
export const tab = style({
  flex: "0 0 auto",
  display: "flex",
  width: "auto",
  padding: "0 15px",
  whiteSpace: "nowrap",
});

// 탭마다의 항목을 감싸는 래퍼
export const wrapper = style({
  flex: "1 1 auto",
  minHeight: 0,
  width: "100%",
  overflowY: "auto",
  margin: 0,
  padding: 0,
  listStyle: "none",
});

// 탭마다의 각각의 항목
export const options = style({
  margin: "15px",
});

export const applyRow = style({
  display: "flex",
  flex: "0 0 20%",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "15px",
  width: "100%",
});

export const applyButton = style({
  width: "60%",
  minWidth: "235px",
  maxWidth: "500px",
});

export const selectedOption = style({
  fontWeight: vars.fontWeight.bold,
});

export const main = style({
  color: vars.colors.main,
});

export const blue = style({
  color: vars.colors.blue,
});

export const purple = style({
  color: vars.colors.purple,
});

export const pink = style({
  color: vars.colors.pink,
});
