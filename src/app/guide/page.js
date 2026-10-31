import { notFound } from "next/navigation";

import GuideClient from "./GuideClient";

// 검색엔진에 노출되지 않도록 함
export const metadata = {
  title: "디자인 시스템 쇼룸",
  robots: { index: false, follow: false },
};

/**
 * 디자인 가이드 페이지 (개발 환경 전용)
 */
export default function DesignGuidePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <GuideClient />;
}
