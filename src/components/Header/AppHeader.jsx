"use client";

import { usePathname } from "next/navigation";

import {
  DEFAULT_BACK_FALLBACK_HREF,
  SUB_PAGE_BACK_FALLBACKS,
  SUB_PAGE_TITLES,
} from "@/constants/header";
import { InAppHistoryProvider, useInAppHistory } from "@/hooks/useInAppHistory";

import Header from "./Header";
import SubPageHeader from "./SubPageHeader";

/**
 * 현재 경로에 따라 Header / SubPageHeader 를 골라 렌더링
 * 서브페이지 경로와 타이틀·폴백 경로는 상수파일(header.js) 에서 관리
 */
export default function AppHeader(props) {
  const pathname = usePathname();
  const historyValue = useInAppHistory(pathname);

  const title = SUB_PAGE_TITLES[pathname];
  const fallbackHref = SUB_PAGE_BACK_FALLBACKS[pathname] ?? DEFAULT_BACK_FALLBACK_HREF;

  return (
    <InAppHistoryProvider value={historyValue}>
      {title ? (
        <SubPageHeader fallbackHref={fallbackHref} title={title} {...props} />
      ) : (
        <Header {...props} />
      )}
    </InAppHistoryProvider>
  );
}
