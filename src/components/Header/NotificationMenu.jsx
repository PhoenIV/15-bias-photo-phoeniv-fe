"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";

import { useNotificationPanel } from "@/hooks/useNotificationPanel";
import { useNotifications, useServerNow } from "@/hooks/useNotifications";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

import { IconButton } from "@/components/ui/IconButton";

import * as styles from "./Header.css";

/**
 * 알림 목록 공통 컴포넌트 (PC/태블릿: 팝오버 & 모바일: 전체화면 모달 공용)
 *
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 * @param {() => void} [props.onItemClick] - 알림 항목 클릭 시 실행할 콜백 (예: 패널 닫기)
 * @param {import("react").RefObject<HTMLElement | null>} [props.scrollContainerRef] - 목록이 스크롤되는 컨테이너 ref
 */
export function NotificationList({ isLoggedIn = false, onItemClick, scrollContainerRef }) {
  const {
    dataUpdatedAt,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isFetchNextPageError,
    isPending,
    notifications,
    refetch,
    serverTime,
  } = useNotifications({ enabled: isLoggedIn });

  const now = useServerNow(serverTime, dataUpdatedAt);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isFetchingNextPage || isFetchNextPageError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      // 스크롤 컨테이너를 root로 지정해야 rootMargin이 컨테이너 기준으로 적용
      { root: scrollContainerRef?.current ?? null, rootMargin: "120px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError, scrollContainerRef]);

  if (isPending) {
    return <div className={styles.notificationEmptyState}>알림을 불러오는 중입니다...</div>;
  }

  if (isError && notifications.length === 0) {
    return (
      <div className={styles.notificationErrorState}>
        <span>알림을 불러오지 못했습니다.</span>
        <button type="button" className={styles.notificationRetryBtn} onClick={() => refetch()}>
          다시 시도
        </button>
      </div>
    );
  }

  if (notifications.length === 0) {
    return <div className={styles.notificationEmptyState}>알림이 없습니다.</div>;
  }

  return (
    <>
      <ul className={styles.notificationList}>
        {notifications.map((item) => {
          const unread = item.readAt === null;
          const itemClassName = styles.notificationItem({ unread });

          const content = (
            <>
              <p className={styles.notificationMessage({ unread })}>{item.message}</p>
              <span className={styles.notificationTime({ unread })}>
                {formatRelativeTime(item.createdAt, now)}
              </span>
            </>
          );

          return (
            <li key={item.id}>
              {item.saleId ? (
                <Link
                  href={`/sales/${item.saleId}`}
                  className={itemClassName}
                  onClick={onItemClick}
                >
                  {content}
                </Link>
              ) : (
                <div className={itemClassName}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}

      {isFetchingNextPage && (
        <div className={styles.notificationEmptyState}>알림을 더 불러오는 중...</div>
      )}

      {isFetchNextPageError && (
        <div className={styles.notificationErrorState}>
          <span>추가 알림을 불러오지 못했습니다.</span>
          <button
            type="button"
            className={styles.notificationRetryBtn}
            onClick={() => fetchNextPage()}
          >
            다시 시도
          </button>
        </div>
      )}
    </>
  );
}

/**
 * PC / 태블릿 헤더 알림 아이콘 및 팝오버 컴포넌트 (@radix-ui/react-popover 기반)
 *
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 */
export function NotificationPopover({ isLoggedIn = false }) {
  const { alarmIcon, alarmLabel, close, handleOpenChange, isOpen } = useNotificationPanel({
    closeOn: "mobile",
    isLoggedIn,
  });
  const contentRef = useRef(null);

  return (
    <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <IconButton icon={alarmIcon} label={alarmLabel} size={24} />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          ref={contentRef}
          align="end"
          aria-label="알림 목록"
          side="bottom"
          sideOffset={16}
          className={styles.notificationPopover}
        >
          <NotificationList
            isLoggedIn={isLoggedIn}
            scrollContainerRef={contentRef}
            onItemClick={close}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

/**
 * 모바일 헤더 우측 알림 아이콘 및 전체화면 알림 모달 컴포넌트 (@radix-ui/react-dialog 기반)
 *
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 */
export function MobileNotificationModal({ isLoggedIn = false }) {
  const { alarmIcon, alarmLabel, close, handleOpenChange, isOpen } = useNotificationPanel({
    closeOn: "tablet",
    isLoggedIn,
  });
  const bodyRef = useRef(null);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <IconButton icon={alarmIcon} label={alarmLabel} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.notificationMobileOverlay} />
        <Dialog.Content aria-describedby={undefined} className={styles.notificationMobileContent}>
          <div className={styles.notificationMobileHeader}>
            <div className={styles.mobileSide}>
              <Dialog.Close asChild>
                <IconButton icon="/images/ic-back.svg" label="알림 닫기" />
              </Dialog.Close>
            </div>

            <div className={styles.centerOrLeftArea}>
              <Dialog.Title className={styles.mobileTitle}>알림</Dialog.Title>
            </div>

            <div className={styles.mobileSide} />
          </div>

          <div ref={bodyRef} className={styles.notificationMobileBody}>
            <NotificationList
              isLoggedIn={isLoggedIn}
              scrollContainerRef={bodyRef}
              onItemClick={close}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
