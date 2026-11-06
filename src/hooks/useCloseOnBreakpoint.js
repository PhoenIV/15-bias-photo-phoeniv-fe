"use client";

import { useEffect } from "react";

import { breakpoints } from "@/styles/theme.css";

/**
 * 뷰포트 변경 시 열려 있는 오버레이(드롭다운/모달 등)를 자동으로 닫는 hook
 *
 * @param {Object} params
 * @param {boolean} params.isOpen - 오버레이 열림 여부 (열려 있을 때만 리스너 등록)
 * @param {() => void} params.onClose - 닫기 콜백
 * @param {"mobile" | "tablet"} params.closeOn - 어떤 뷰포트로 전환될 때 닫을지
 */
export function useCloseOnBreakpoint({ isOpen, onClose, closeOn }) {
  useEffect(() => {
    if (!isOpen) return;

    const mql = window.matchMedia(`(min-width: ${breakpoints.tablet})`);
    const handleMediaChange = (e) => {
      const isTabletUp = e.matches;
      if ((closeOn === "tablet" && isTabletUp) || (closeOn === "mobile" && !isTabletUp)) {
        onClose();
      }
    };

    mql.addEventListener("change", handleMediaChange);
    return () => mql.removeEventListener("change", handleMediaChange);
  }, [isOpen, onClose, closeOn]);
}
