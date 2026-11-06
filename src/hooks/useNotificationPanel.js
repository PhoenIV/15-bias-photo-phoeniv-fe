"use client";

import { useState } from "react";

import { useCloseOnBreakpoint } from "./useCloseOnBreakpoint";
import { useNotifications, useReadAllNotifications } from "./useNotifications";

/**
 * 알림 패널(PC/태블릿 팝오버, 모바일 모달) 공통 상태 관리
 * @param {Object} params
 * @param {boolean} [params.isLoggedIn=false] - 로그인 여부
 * @param {"mobile" | "tablet"} params.closeOn - 어떤 뷰포트로 전환될 때 패널을 닫을지
 */
export function useNotificationPanel({ isLoggedIn = false, closeOn }) {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotifications({ enabled: isLoggedIn });
  const { isPending: isReadingAll, mutate: readAll } = useReadAllNotifications();

  // 패널을 닫는 모든 경로(바깥 클릭, ESC, 항목 클릭, 뷰포트 전환)에서 한 번만 읽음 처리
  const handleOpenChange = (nextOpen) => {
    setIsOpen(nextOpen);
    if (!nextOpen && unreadCount > 0 && !isReadingAll) {
      readAll();
    }
  };

  const close = () => handleOpenChange(false);

  useCloseOnBreakpoint({ isOpen, onClose: close, closeOn });

  return {
    alarmIcon: unreadCount > 0 ? "/images/ic-alarm-active.svg" : "/images/ic-alarm-default.svg",
    alarmLabel: unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : "알림",
    close,
    handleOpenChange,
    isOpen,
  };
}
