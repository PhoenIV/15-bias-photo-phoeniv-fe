"use client";

import { useRouter } from "next/navigation";

import { IconButton } from "@/components/common/IconButton";

import * as styles from "./Header.css";

export function BackButton() {
  const router = useRouter();
  return <IconButton icon="/images/ic-back.svg" label="뒤로가기" onClick={() => router.back()} />;
}

export function MenuButton() {
  // TODO: 사이드 메뉴(드로어) 연결 필요
  return <IconButton icon="/images/ic-menu.svg" label="메뉴 열기" onClick={() => {}} />;
}

export function LogoutButton() {
  // TODO: 로그아웃 로직 연결 필요
  return (
    <button type="button" className={styles.logoutBtn} onClick={() => {}}>
      로그아웃
    </button>
  );
}
