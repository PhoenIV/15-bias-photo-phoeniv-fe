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
      queryClient.setQueryData(userKeys.me(), null);
      // TODO: 로그인한 사용자 본인의 데이터 캐시(내 갤러리, 내 판매 목록 등)가 생기면
      // 이 자리에서 removeQueries로 삭제 (예: queryClient.removeQueries({ queryKey: cardKeys.mine() }))

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
