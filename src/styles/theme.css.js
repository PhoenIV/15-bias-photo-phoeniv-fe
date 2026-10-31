import { createGlobalTheme } from "@vanilla-extract/css";

// CSS 변수로 변환될 토큰들 (색상, 폰트 크기 등)
// 프로젝트의 디자인 토큰(상수)을 정의
export const vars = createGlobalTheme(":root", {
  colors: {
    black: "#0F0F0F",
    gray500: "#161616",
    gray400: "#5A5A5A",
    gray300: "#A4A4A4",
    gray200: "#DDDDDD",
    gray100: "#EEEEEE",
    white: "#FFFFFF",
    red: "#FF483D",
    blue: "#29C9F9",
    purple: "#A77EFF",
    pink: "#FF2A6A",
    main: "#EFFF04",
  },
  fonts: {
    base: "var(--font-noto-sans-kr), sans-serif", // 기본 폰트
    brand: "var(--font-baskin-robbins), sans-serif", // 배스킨라빈스 포인트 폰트
  },
  fontSize: {
    10: "0.625rem", // 10px
    12: "0.75rem", // 12px
    14: "0.875rem", // 14px
    16: "1rem", // 16px (기본 본문)
    18: "1.125rem", // 18px
    20: "1.25rem", // 20px
    22: "1.375rem", // 22px
    24: "1.5rem", // 24px
    28: "1.75rem", // 28px
    32: "2rem", // 32px
    40: "2.5rem", // 40px
    46: "2.875rem", // 46px
    48: "3rem", // 48px
    62: "3.875rem", // 62px
  },
  fontWeight: {
    light: "300",
    regular: "400",
    bold: "700",
  },
  letterSpacing: {
    base: "0", // Noto Sans KR
    brand: "-0.03em", // 배스킨라빈스 용 (-3% = -0.03em)
  },
  space: {
    none: 0,
    small: "16px",
    medium: "24px",
    large: "40px",
  },

  /**
   * Z-Index 컨벤션
   *
   * 1. 전역(Global) 팝업 요소들은 반드시 아래의 vars.zIndex 토큰을 사용하세요.
   * 2. 포토카드 내부 뱃지 등 특정 컴포넌트 안에만 있는 지역(Local) z-index는
   *    테마에 추가하지 말고, 해당 CSS 파일에서 10~99 사이의 "두 자리 숫자"로만 하드코딩해서 사용해 주세요.
   */
  zIndex: {
    base: "1", // 기본
    dropdown: "100", // 드랍다운
    sticky: "200", // 스크롤 헤더
    modal: "1000", // 모달
    toast: "9999", // 토스트
  },
});

// JS 상수로 쓸 브레이크 포인트 (미디어 쿼리용)
// 미디어 쿼리에 사용할 기준점 숫자를 저장
export const breakpoints = {
  tablet: "744px",
  pc: "1024px",
};

// 미디어 쿼리 변수 저장
export const media = {
  tablet: `screen and (min-width: ${breakpoints.tablet})`,
  pc: `screen and (min-width: ${breakpoints.pc})`,
};
