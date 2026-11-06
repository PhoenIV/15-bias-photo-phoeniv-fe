import { globalStyle } from "@vanilla-extract/css";

import { vars } from "./theme.css.js";

// --- Reset ---
// 브라우저마다 제각각인 기본 스타일을 초기화
// 1. 모든 요소에 box-sizing 적용: 테두리나 패딩을 추가해도 요소의 전체 크기가 커지지 않게 함
globalStyle("*, *::before, *::after", { boxSizing: "border-box" });

// 2. 기본 여백 제거: 브라우저가 기본으로 제공하는 마진과 패딩을 없앰
globalStyle("body, h1, h2, h3, p, ul, ol, li, figure, figcaption, blockquote, dl, dd", {
  margin: 0,
  padding: 0,
});

// 3. 리스트 불릿 제거
globalStyle("ul, ol, li", { listStyle: "none" });

// 4. a 태그(링크) 초기화
globalStyle("a", { textDecoration: "none", color: "inherit" });

// 5. 버튼 초기화
globalStyle("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontFamily: "inherit",
});

// 6. 폼 요소 초기화: input이나 textarea는 브라우저 기본 폰트를 고집하기 때문에 상속을 강제
globalStyle("input, textarea, select", {
  fontFamily: "inherit",
  border: "none",
  outline: "none",
});

// 7. 반응형 이미지 처리: 이미지가 부모 컨테이너 밖으로 삐져나가는 것 방지
globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

// --- Global ---
// 기본값 설정
// body의 기본 폰트 패밀리 지정, 배경색, 한국어 줄바꿈 최적화, 스크롤 부드럽게 등
globalStyle("html", { scrollBehavior: "smooth" });

globalStyle("body", {
  fontFamily: vars.fonts.base,
  backgroundColor: vars.colors.black,
  color: vars.colors.gray200,
  wordBreak: "keep-all", // 한국어 줄바꿈 최적화 (단어 단위로 끊어짐)
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});
