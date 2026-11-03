import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css.js";

// 전체 페이지 래퍼
export const container = style({
  width: "100%",
  backgroundColor: vars.colors.black,
  color: vars.colors.white,
  fontFamily: vars.fonts.base,
  overflow: "hidden", // 그래픽이나 회전하는 카드가 삐져나가도 가로 스크롤이 생기지 않도록 방어
});

// 최상단 히어로(Hero) 섹션
export const heroSection = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "32px 16px 0", // 화면 전체의 기본 좌우 여백
  "@media": {
    [media.tablet]: { padding: "40px 32px 0" },
    [media.pc]: { padding: "60px 60px 0" },
  },
});

export const heroContainer = style({
  position: "relative",
  width: "100%",
  maxWidth: "1480px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

// 보라색 배경 레이어
export const heroBgLayer = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "20px",
  overflow: "hidden",
  zIndex: 0,
  "::before": {
    content: '""',
    position: "absolute",
    top: "-5%",
    left: "-5%",
    right: "-5%",
    bottom: "-5%",
    backgroundImage: "url('/images/hero-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
  "@media": {
    [media.tablet]: { borderRadius: "28px" },
    [media.pc]: { borderRadius: "32px" },
  },
});

// 콘텐츠 레이어
export const heroContent = style({
  position: "relative",
  width: "100%",
  zIndex: 1, // 배경 위에 오도록 설정
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "48px",
  "@media": {
    [media.tablet]: { paddingTop: "64px" },
    [media.pc]: { paddingTop: "76px" },
  },
});

export const heroTextContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  "@media": {
    [media.tablet]: {
      gap: "36px",
    },
  },
});

export const heroTitleWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media": {
    [media.tablet]: {
      gap: "24px",
    },
  },
});

// 히어로 박스 안의 상단 미니 로고 (태블릿/PC에서만 노출)
export const heroLogoWrapper = style({
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

export const heroTitle = style({
  fontSize: vars.fontSize[20],
  fontWeight: vars.fontWeight.bold,
  textAlign: "center",
  lineHeight: "1.4",
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[40] },
  },
});

export const highlightText = style({
  color: vars.colors.main,
});

export const landingCtaButton = style({
  width: "150px !important",
  "@media": {
    [media.tablet]: { width: "226px !important" },
  },
});

export const heroGraphicWrapper = style({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginTop: "40px",

  width: "calc(100% + 32px)",
  marginLeft: "-16px",
  marginRight: "-16px",
  maxWidth: "1600px",

  "@media": {
    [media.tablet]: {
      marginTop: "60px",
      width: "calc(100% + 64px)",
      marginLeft: "-32px",
      marginRight: "-32px",
    },
    [media.pc]: {
      marginTop: "80px",
      width: "calc(100% + 120px)",
      marginLeft: "-60px",
      marginRight: "-60px",
    },
  },
});

export const bottomCtaSection = style({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "120px 20px",
  "@media": {
    [media.tablet]: { padding: "160px 40px" },
  },
});

export const bottomCtaTitle = style({
  fontSize: vars.fontSize[20],
  fontWeight: vars.fontWeight.bold,
  textAlign: "center",
  marginTop: "40px",
  marginBottom: "28px",
  "@media": {
    [media.tablet]: { fontSize: vars.fontSize[24], marginTop: "48px", marginBottom: "36px" },
    [media.pc]: { fontSize: vars.fontSize[28] },
  },
});
