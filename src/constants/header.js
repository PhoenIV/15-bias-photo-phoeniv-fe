// 앱 내 이전 히스토리가 없을 때 이동할 기본 폴백 경로
export const DEFAULT_BACK_FALLBACK_HREF = "/marketplace";

// 서브페이지 헤더를 사용할 경로와 모바일 헤더 타이틀 매핑
// 여기에 없는 경로는 기본 Header(로고) 표시
// 피그마를 보고 서브 타이틀을 정리한 것으로 경로는 자유롭게 변경해주세요!
export const SUB_PAGE_TITLES = {
  "/my-gallery": "마이갤러리",
  "/my-gallery/create": "포토카드 생성",
  "/my-listings": "나의 판매 포토카드",
};

// 서브페이지별 뒤로가기 폴백 경로 매핑
export const SUB_PAGE_BACK_FALLBACKS = {
  "/my-gallery": DEFAULT_BACK_FALLBACK_HREF,
  "/my-gallery/create": "/my-gallery",
  "/my-listings": DEFAULT_BACK_FALLBACK_HREF,
};

// 프로필 네비게이션 메뉴 목록
export const PROFILE_MENU_ITEMS = [
  { href: "/marketplace", label: "마켓플레이스", requiresAuth: false },
  { href: "/my-gallery", label: "마이갤러리", requiresAuth: true },
  { href: "/my-listings", label: "나의 판매 포토카드", requiresAuth: true },
];
