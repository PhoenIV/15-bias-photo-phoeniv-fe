import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css.js";

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
        fontWeight: vars.fontWeight.bold, // primary는 모두 bold체
        backgroundColor: vars.colors.main,
        color: vars.colors.black,
        selectors: { "&:hover:not(:disabled)": { opacity: 0.9 } },
      },
      secondary: {
        fontWeight: vars.fontWeight.medium, // secondary는 모두 medium체
        backgroundColor: vars.colors.black,
        color: vars.colors.white,
        border: `1px solid ${vars.colors.gray100}`,
        selectors: { "&:hover:not(:disabled)": { backgroundColor: vars.colors.gray500 } },
      },
    },
    thickness: {
      // 컴포넌트 prop 인식을 위해 키는 남겨두되, 스타일은 비워둡니다.
      thick: {},
      thin: {},
    },
    size: {
      lg: {},
      md: {},
      sm: {},
      xs: {},
    },
  },

  // 3. 복합 변형(Compound Variants) 스타일
  // 조건(variants)이 모두 일치할 때 해당 스타일(style)을 덮어씌웁니다.
  compoundVariants: [
    // --- thick 두께 폰트 사이즈 ---
    {
      variants: { thickness: "thick", size: "lg" },
      style: { fontSize: vars.fontSize[20], width: "440px", height: "80px" },
    },
    {
      variants: { thickness: "thick", size: "md" },
      style: { fontSize: vars.fontSize[18], width: "345px", height: "75px" },
    },
    {
      variants: { thickness: "thick", size: "sm" },
      style: { fontSize: vars.fontSize[18], width: "345px", height: "75px" },
    },

    // --- thin 두께 폰트 사이즈 ---
    {
      variants: { thickness: "thin", size: "lg" },
      style: { fontSize: vars.fontSize[18], width: "520px", height: "60px" },
    },
    {
      variants: { thickness: "thin", size: "md" },
      style: { fontSize: vars.fontSize[16], width: "440px", height: "55px" },
    },
    {
      variants: { thickness: "thin", size: "sm" },
      style: { fontSize: vars.fontSize[16], width: "345px", height: "55px" },
    },
    {
      variants: { thickness: "thin", size: "xs" },
      style: { fontSize: vars.fontSize[12], width: "150px", height: "40px" },
    },
  ],

  // 4. 기본값
  defaultVariants: {
    variant: "primary",
    thickness: "thick",
    size: "md",
  },
});
