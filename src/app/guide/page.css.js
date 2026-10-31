import { style } from "@vanilla-extract/css";

import { media, vars } from "@/styles/theme.css.js";

/* =========================================================
  페이지 전체 레이아웃
  ========================================================= */

export const container = style({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: `${vars.space.large} ${vars.space.medium}`,
  color: vars.colors.white,
  fontFamily: vars.fonts.base,
});

export const header = style({
  marginBottom: vars.space.large,
  paddingBottom: vars.space.medium,
  borderBottom: `1px solid ${vars.colors.gray400}`,
});

export const title = style({
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSize[32],
  fontWeight: vars.fontWeight.bold,
  letterSpacing: vars.letterSpacing.brand,
  color: vars.colors.main,
  marginBottom: "8px",
});

export const subtitle = style({
  fontSize: vars.fontSize[16],
  color: vars.colors.gray300,
});

/* =========================================================
  탭 네비게이션
  ========================================================= */

export const tabList = style({
  display: "flex",
  gap: "8px",
  marginBottom: vars.space.large,
  borderBottom: `1px solid ${vars.colors.gray500}`,
  paddingBottom: vars.space.small,
  flexWrap: "wrap",
});

export const tabButton = style({
  padding: "10px 20px",
  backgroundColor: vars.colors.gray500,
  color: vars.colors.gray300,
  border: `1px solid ${vars.colors.gray400}`,
  borderRadius: "4px",
  fontSize: vars.fontSize[16],
  fontWeight: vars.fontWeight.bold,
  cursor: "pointer",
  // 바뀌는 속성만 지정해요 (all은 불필요한 속성까지 감시해요)
  transition: "color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
  selectors: {
    "&:hover": {
      color: vars.colors.white,
      borderColor: vars.colors.gray200,
    },
    // 키보드(Tab 키)로 이동할 때 보이는 포커스 표시
    "&:focus-visible": {
      outline: `2px solid ${vars.colors.main}`,
      outlineOffset: "2px",
    },
  },
});

export const activeTabButton = style({
  backgroundColor: vars.colors.main,
  color: vars.colors.black,
  borderColor: vars.colors.main,
  selectors: {
    "&:hover": {
      color: vars.colors.black,
      borderColor: vars.colors.main,
    },
  },
});

/* =========================================================
  섹션 공통 레이아웃
  ========================================================= */

export const section = style({
  padding: vars.space.large,
  backgroundColor: vars.colors.gray500,
  border: `1px solid ${vars.colors.gray400}`,
  borderRadius: "8px",
});

export const sectionTitle = style({
  fontFamily: vars.fonts.brand,
  letterSpacing: vars.letterSpacing.brand,
  fontSize: vars.fontSize[24],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.main,
  marginBottom: "8px",
});

export const sectionDesc = style({
  fontSize: vars.fontSize[14],
  color: vars.colors.gray300,
  marginBottom: vars.space.medium,
});

export const previewBox = style({
  padding: vars.space.large,
  backgroundColor: vars.colors.black,
  border: `1px dashed ${vars.colors.gray400}`,
  borderRadius: "6px",
  marginBottom: vars.space.medium,
});

export const subTitle = style({
  fontSize: vars.fontSize[14],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.gray200,
  marginBottom: "12px",
});

/* =========================================================
  레이아웃 헬퍼 (가로/세로 배치, 예시 목록)
  ========================================================= */

export const flexRow = style({
  display: "flex",
  gap: vars.space.medium,
  alignItems: "center",
  flexWrap: "wrap",
});

// 아래쪽 기준으로 정렬하고 싶을 때 (크기가 다른 Chip을 나란히 놓을 때)
export const flexRowEnd = style({
  display: "flex",
  gap: vars.space.medium,
  alignItems: "flex-end",
  flexWrap: "wrap",
});

export const flexColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.medium,
});

// 예시(Example) 여러 개를 세로로 넓게 띄워서 나열할 때
export const exampleList = style({
  display: "flex",
  flexDirection: "column",
  gap: "48px",
});

// 폼 컴포넌트는 너무 넓어지지 않도록 폭을 제한해요
export const formList = style([
  exampleList,
  {
    maxWidth: "520px",
  },
]);

// "← lg" 같은 크기 설명 문구
export const sizeLabel = style({
  fontSize: vars.fontSize[12],
  color: vars.colors.gray300,
});

/* =========================================================
  Colors 탭
  ========================================================= */

export const colorGrid = style({
  display: "grid",
  // 화면 폭에 맞춰 열 개수가 자동으로 줄어들어요
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: vars.space.medium,
});

export const colorCard = style({
  backgroundColor: vars.colors.gray500,
  border: `1px solid ${vars.colors.gray400}`,
  borderRadius: "6px",
  overflow: "hidden",
});

export const colorSwatch = style({
  height: "80px",
  width: "100%",
  borderBottom: `1px solid ${vars.colors.gray400}`,
});

export const colorInfo = style({
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const colorName = style({
  fontSize: vars.fontSize[16],
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.white,
});

export const colorToken = style({
  fontSize: vars.fontSize[12],
  color: vars.colors.gray300,
  fontFamily: "monospace",
  // vars.colors.gray100 같은 긴 토큰 이름이 카드 밖으로 넘치지 않게 해요
  wordBreak: "break-all",
});

/* =========================================================
  PhotoCard 탭
  ========================================================= */

export const cardGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)", // 모바일 기본 1열
  gap: "16px",
  width: "100%",
  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))", // 태블릿 2열
    },
    [media.pc]: {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))", // PC 환경(1024px 이상)에서는 3열
    },
  },
});

/* =========================================================
  Modal 탭
  ========================================================= */

// 모달 열기 버튼이 가로로 늘어나지 않게 폭을 제한해요
export const alertTrigger = style({
  maxWidth: "240px",
});

export const customTrigger = style({
  maxWidth: "260px",
});

// 커스텀 모달 안쪽 예시 내용
export const customModalBody = style({
  padding: "40px 0",
  color: vars.colors.gray300,
});

export const customModalTitle = style({
  color: vars.colors.white,
  marginBottom: "12px",
});

/* =========================================================
  예시 블록 + 복사 가능한 코드 박스
  ========================================================= */

export const example = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

// 미리보기 영역 (previewBox 안에서 예시별로 구분)
export const exampleBox = style({
  width: "100%",
});

// 복사 가능한 코드 박스 (전체가 클릭 영역)
export const snippetButton = style({
  position: "relative",
  display: "block",
  width: "100%",
  padding: "16px",
  paddingRight: "120px", // 오른쪽 위 배지와 코드가 겹치지 않게
  textAlign: "left",
  backgroundColor: "#000000", // 미리보기 영역(black)보다 더 어둡게 보이도록 토큰 대신 직접 지정
  border: `1px solid ${vars.colors.gray400}`,
  borderRadius: "4px",
  cursor: "pointer",
  transition: "border-color 0.2s ease",
  selectors: {
    "&:hover": { borderColor: vars.colors.gray200 },
    "&:focus-visible": {
      outline: `2px solid ${vars.colors.main}`,
      outlineOffset: "2px",
    },
  },
});

export const snippetCode = style({
  display: "block",
  whiteSpace: "pre", // 줄바꿈과 들여쓰기를 그대로 보여줘요
  overflowX: "auto",
  fontFamily: "monospace",
  fontSize: vars.fontSize[14],
  color: vars.colors.blue,
});

// 오른쪽 위 안내 배지
export const copyBadge = style({
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "4px 8px",
  borderRadius: "2px",
  backgroundColor: vars.colors.gray500,
  color: vars.colors.gray300,
  fontSize: vars.fontSize[12],
});

// 복사 완료 상태
export const copyBadgeDone = style({
  backgroundColor: vars.colors.main,
  color: vars.colors.black,
});
