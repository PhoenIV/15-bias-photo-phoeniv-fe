"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { PROFILE_MENU_ITEMS } from "@/constants/header";
import { breakpoints } from "@/styles/theme.css";

import { IconButton } from "@/components/ui/IconButton";

import { LogoutButton } from "./HeaderButtons";

import * as styles from "./Header.css";

/**
 * 프로필 상단 인사말 및 보유 포인트 공통 영역
 *
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 * @param {string} [props.nickname=""] - 사용자 닉네임
 * @param {number} [props.points=0] - 보유 포인트
 */
export function ProfileUserInfo({ isLoggedIn = false, nickname = "", points = 0 }) {
  return (
    <div className={styles.profileInfoSection}>
      {isLoggedIn ? (
        <>
          <p className={styles.profileGreeting}>안녕하세요, {nickname}님!</p>
          <div className={styles.profilePointRow}>
            <span className={styles.profilePointLabel}>보유 포인트</span>
            <span className={styles.profilePointValue}>{points.toLocaleString()} P</span>
          </div>
        </>
      ) : (
        <p className={styles.profileGreeting}>{"안녕하세요,\n로그인 해주세요."}</p>
      )}
    </div>
  );
}

/**
 * 프로필 메뉴 링크 목록 공통 컴포넌트
 * (PC Radix DropdownMenu와 모바일 드로어에서 공용으로 사용)
 *
 * @param {Object} props
 * @param {boolean} [props.isDropdown=false] - Radix DropdownMenu.Item 으로 감쌀지 여부
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 * @param {() => void} [props.onItemClick] - 링크 클릭 시 실행할 콜백 (예: 드로어 닫기)
 */
export function ProfileMenuList({ isDropdown = false, isLoggedIn = false, onItemClick }) {
  return (
    <ul className={styles.profileMenuList}>
      {PROFILE_MENU_ITEMS.map((item) => {
        const isDisabled = !isLoggedIn && item.requiresAuth;

        if (isDisabled) {
          return (
            <li key={item.href}>
              <span aria-disabled="true" className={styles.profileMenuLinkDisabled}>
                {item.label}
              </span>
            </li>
          );
        }

        const link = (
          <Link href={item.href} className={styles.profileMenuLink} onClick={onItemClick}>
            {item.label}
          </Link>
        );

        return (
          <li key={item.href}>
            {isDropdown ? <DropdownMenu.Item asChild>{link}</DropdownMenu.Item> : link}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * 프로필 드롭다운 컴포넌트 (PC / 태블릿)
 *
 * @param {Object} props
 * @param {string} [props.nickname=""] - 사용자 닉네임
 * @param {number} [props.points=0] - 보유 포인트
 */
export function ProfileDropdown({ nickname = "", points = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

  // 모바일 뷰포트로 전환될 때 열려 있던 드롭다운 자동 닫힘
  useEffect(() => {
    if (!isOpen) return;

    const mql = window.matchMedia(`(min-width: ${breakpoints.tablet})`);
    const handleMediaChange = (e) => {
      if (!e.matches) {
        setIsOpen(false);
      }
    };

    mql.addEventListener("change", handleMediaChange);
    return () => mql.removeEventListener("change", handleMediaChange);
  }, [isOpen]);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={styles.nicknameButton}>
          {nickname}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          aria-label="내 프로필 메뉴"
          side="bottom"
          sideOffset={16}
          className={styles.profileDropdown}
        >
          <ProfileUserInfo isLoggedIn nickname={nickname} points={points} />
          <DropdownMenu.Separator className={styles.profileDivider} />
          <ProfileMenuList isDropdown isLoggedIn />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/**
 * 프로필 드로어 컴포넌트 (모바일)
 *
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 * @param {string} [props.nickname=""] - 사용자 닉네임
 * @param {number} [props.points=0] - 보유 포인트
 */
export function MobileProfileDrawer({ isLoggedIn = false, nickname = "", points = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const mql = window.matchMedia(`(min-width: ${breakpoints.tablet})`);
    const handleMediaChange = (e) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };

    mql.addEventListener("change", handleMediaChange);
    return () => mql.removeEventListener("change", handleMediaChange);
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <IconButton icon="/images/ic-menu.svg" label="메뉴 열기" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.drawerOverlay} />
        <Dialog.Content aria-describedby={undefined} className={styles.drawerContent}>
          <Dialog.Title className={styles.srOnly}>내 프로필 및 메뉴</Dialog.Title>

          <div>
            <ProfileUserInfo isLoggedIn={isLoggedIn} nickname={nickname} points={points} />
            <div className={styles.profileDivider} />
            <ProfileMenuList isLoggedIn={isLoggedIn} onItemClick={handleClose} />
          </div>

          <div className={styles.drawerFooter}>
            {isLoggedIn ? (
              <LogoutButton onAfterLogout={handleClose} />
            ) : (
              <Link href="/login" className={styles.logoutBtn} onClick={handleClose}>
                로그인
              </Link>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
