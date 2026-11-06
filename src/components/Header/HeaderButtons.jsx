"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/services/authService";
import { userKeys } from "@/services/queryKeys";

import { IconButton } from "@/components/ui/IconButton";

import { AlertModal } from "../ui/Modal";

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
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: userKeys.me() });
      queryClient.setQueryData(userKeys.me(), null); //-> 로그인 페이지로 이동 전에 헤더를 비로그인 상태로 보여줌
      queryClient.clear(); //-> 사용자별 캐시를 전부 삭제
      router.replace("/login");
    },
    onError: () => {
      setIsErrorOpen(true);
    },
  });
  return (
    <>
      <button
        disabled={isPending}
        type="button"
        className={styles.logoutBtn}
        onClick={() => mutate()}
      >
        로그아웃
      </button>
      <AlertModal
        description="잠시 후 다시 시도해 주세요"
        isOpen={isErrorOpen}
        title="로그아웃 실패"
        onClose={() => setIsErrorOpen(false)}
      />
    </>
  );
}
