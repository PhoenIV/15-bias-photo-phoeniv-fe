"use client";

import { usePathname } from "next/navigation";

import { SUB_PAGE_TITLES } from "@/constants/header.js";

import Header from "./Header";
import SubPageHeader from "./SubPageHeader";

/**
 * 현재 경로에 따라 Header / SubPageHeader 를 골라 렌더링
 * 서브페이지 경로와 타이틀은 상수파일(header.js) 에서 관리
 */
export default function AppHeader(props) {
  const pathname = usePathname();
  const title = SUB_PAGE_TITLES[pathname];

  return title ? <SubPageHeader title={title} {...props} /> : <Header {...props} />;
}
