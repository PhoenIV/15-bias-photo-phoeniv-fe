import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css";

// 헤더 배경
export const header = style({
  width: "100%",
  height: "60px",
  backgroundColor: vars.colors.black,
  "@media": {
    [media.tablet]: { height: "70px" },
    [media.pc]: { height: "80px" },
  },
});

// 헤더 컨테이너 (최대 너비 + 양옆 여백)
export const inner = style({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr", // 모바일: 좌 / 중앙 / 우
  alignItems: "center",
  width: "100%",
  maxWidth: "1480px",
  height: "100%",
  margin: "0 auto",
  padding: "0 16px",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr auto", // 태블릿 이상: 로고 / 네비
      padding: "0 24px",
    },
    [media.pc]: { padding: "0 40px" },
  },
});

/* ───────── 모바일 좌/우 영역 (태블릿 이상 숨김) ───────── */

export const mobileSide = style({
  display: "flex",
  alignItems: "center",
  "@media": { [media.tablet]: { display: "none" } },
});

// 오른쪽 mobileSide만 오른쪽 끝으로 붙이기
export const mobileSideEnd = style({
  justifyContent: "flex-end",
});

/* ───────── 중앙(모바일) / 좌측(태블릿·PC) 영역 ───────── */

// 타이틀 로고
export const centerOrLeftArea = style({
  display: "flex",
  alignItems: "center",
});

// 모바일 서브페이지 타이틀 (마이갤러리)
export const mobileTitle = style({
  display: "block",
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[20],
  color: vars.colors.white,
  letterSpacing: vars.letterSpacing.brand,
  "@media": { [media.tablet]: { display: "none" } },
});

// 서브페이지에서 모바일일 때 로고 숨기고 페이지 타이틀
export const hideLogoOnMobile = style({
  display: "none",
  "@media": { [media.tablet]: { display: "flex" } },
});

/* ───────── 태블릿, PC 우측 네비게이션 (모바일 숨김) ───────── */

export const desktopNav = style({
  display: "none",
  alignItems: "center",
  gap: "24px",
  "@media": { [media.tablet]: { display: "flex" } },
});

export const pointText = style({
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.gray200,
});

export const nicknameText = style({
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[18],
  color: vars.colors.gray200,
  letterSpacing: vars.letterSpacing.brand,
});

export const nicknameButton = style([
  nicknameText,
  {
    padding: 0,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
]);

// 닉네임과 로그아웃 버튼 세로 구분선
export const divider = style({
  width: "1px",
  height: "14px",
  backgroundColor: vars.colors.gray400,
});

export const logoutBtn = style({
  padding: 0,
  fontSize: vars.fontSize[14],
  color: vars.colors.gray400,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
});

/* ───────── 모바일, 데스크톱 공용 ───────── */

export const authLink = style({
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.gray200,
  textDecoration: "none",
});

/* ───────── 프로필 메뉴 (PC/태블릿 드롭다운 & 모바일 드로어) ───────── */

export const profileMenuWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const profileDropdown = style({
  width: "260px",
  backgroundColor: vars.colors.gray500,
  borderRadius: "2px",
  zIndex: vars.zIndex.dropdown,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
  outline: "none",
});

export const profileInfoSection = style({
  padding: "20px",
});

export const profileGreeting = style({
  margin: 0,
  fontSize: vars.fontSize[18],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  lineHeight: "1.4",
  whiteSpace: "pre-line",
  wordBreak: "keep-all",
});

export const profilePointRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "20px",
});

export const profilePointLabel = style({
  fontSize: vars.fontSize[12],
  fontWeight: vars.fontWeight.light,
  color: vars.colors.gray300,
});

export const profilePointValue = style({
  fontSize: vars.fontSize[12],
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.main,
});

export const profileDivider = style({
  width: "100%",
  height: "1px",
  backgroundColor: vars.colors.gray400,
});

export const profileMenuList = style({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  margin: 0,
  padding: "20px",
  listStyle: "none",
});

export const profileMenuLink = style({
  display: "block",
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
  textDecoration: "none",
  outline: "none",
  transition: "opacity 0.15s ease",
  selectors: {
    "&:hover, &:focus, &[data-highlighted]": {
      opacity: 0.8,
      outline: "none",
    },
  },
});

export const profileMenuLinkDisabled = style({
  display: "block",
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.gray400,
  cursor: "not-allowed",
  userSelect: "none",
});

/* ───────── 모바일 좌측 사이드 드로어 ───────── */

export const drawerOverlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  zIndex: vars.zIndex.modal,
  "@media": {
    [media.tablet]: { display: "none" },
  },
});

export const drawerContent = style({
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "260px",
  height: "100dvh",
  paddingTop: "20px",
  paddingBottom: "40px",
  boxSizing: "border-box",
  backgroundColor: vars.colors.gray500,
  zIndex: vars.zIndex.modal,
  outline: "none",
  "@media": {
    [media.tablet]: { display: "none" },
  },
});

export const drawerFooter = style({
  padding: "0 20px",
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
