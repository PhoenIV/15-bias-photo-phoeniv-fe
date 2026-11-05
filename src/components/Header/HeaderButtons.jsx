"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/services/authService";
import { userKeys } from "@/services/queryKeys";

import { IconButton } from "@/components/ui/IconButton";

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: userKeys.me() });
      queryClient.setQueryData(userKeys.me(), null);
      router.replace("/login");
    },
  });
  return (
    <button
      disabled={isPending}
      type="button"
      className={styles.logoutBtn}
      onClick={() => mutate()}
    >
      로그아웃
    </button>
  );
}
