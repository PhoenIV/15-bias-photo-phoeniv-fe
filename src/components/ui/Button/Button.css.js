import { recipe } from "@vanilla-extract/recipes";

import { media, vars } from "@/styles/theme.css.js";

export const buttonRecipe = recipe({
  // 1. 공통(Base) 스타일
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px",
    fontFamily: vars.fonts.base,
    cursor: "pointer",
    transition: "background-color 0.2s ease, opacity 0.2s ease",
    border: "none",
    padding: "0 24px", // 최소여백
    selectors: {
      "&:disabled": {
        backgroundColor: vars.colors.gray400,
        color: vars.colors.gray300,
        borderColor: vars.colors.gray400,
        cursor: "not-allowed",
      },
    },
  },

  // 2. 개별 변형(Variants) 스타일
  variants: {
    variant: {
      primary: {
        fontWeight: vars.fontWeight.bold,
        backgroundColor: vars.colors.main,
        color: vars.colors.black,
        selectors: { "&:hover:not(:disabled)": { opacity: 0.9 } },
      },
      secondary: {
        fontWeight: vars.fontWeight.regular,
        backgroundColor: vars.colors.black,
        color: vars.colors.white,
        border: `1px solid ${vars.colors.gray100}`,
        selectors: { "&:hover:not(:disabled)": { backgroundColor: vars.colors.gray500 } },
      },
    },
    thickness: { thick: {}, thin: {} },
    size: {
      responsive: {}, // 화면 크기에 따라 자동 전환 (모바일 → 태블릿 → PC)
      lg: {}, // PC 값 고정
      md: {}, // 태블릿 값 고정
      sm: {}, // 모바일 값 고정
      xs: {}, // thin 전용 작은 버튼
    },
  },

  // 3. 복합 변형(Compound Variants) 스타일
  // 조건(variants)이 모두 일치할 때 해당 스타일(style)을 덮어씌웁니다.
  compoundVariants: [
    // --- thick ---
    {
      variants: { thickness: "thick", size: "lg" },
      style: { fontSize: vars.fontSize[20], height: "80px" },
    },
    {
      variants: { thickness: "thick", size: "md" },
      style: { fontSize: vars.fontSize[18], height: "75px" },
    },
    {
      variants: { thickness: "thick", size: "sm" },
      style: { fontSize: vars.fontSize[18], height: "75px" },
    },
    {
      // 모바일/태블릿 18px·75px → PC 20px·80px
      variants: { thickness: "thick", size: "responsive" },
      style: {
        fontSize: vars.fontSize[18],
        height: "75px",
        "@media": {
          [media.pc]: { fontSize: vars.fontSize[20], height: "80px" },
        },
      },
    },

    // --- thin ---
    {
      variants: { thickness: "thin", size: "lg" },
      style: { fontSize: vars.fontSize[18], height: "60px" },
    },
    {
      variants: { thickness: "thin", size: "md" },
      style: { fontSize: vars.fontSize[16], height: "55px" },
    },
    {
      variants: { thickness: "thin", size: "sm" },
      style: { fontSize: vars.fontSize[16], height: "55px" },
    },
    {
      variants: { thickness: "thin", size: "xs" },
      style: { fontSize: vars.fontSize[12], height: "40px" },
    },
    {
      // 모바일 12px·40px → 태블릿 16px·55px → PC 18px·60px
      variants: { thickness: "thin", size: "responsive" },
      style: {
        fontSize: vars.fontSize[12],
        height: "40px",
        "@media": {
          [media.tablet]: { fontSize: vars.fontSize[16], height: "55px" },
          [media.pc]: { fontSize: vars.fontSize[18], height: "60px" },
        },
      },
    },
  ],

  // 4. 기본값
  defaultVariants: { variant: "primary", thickness: "thick", size: "md" },
});
