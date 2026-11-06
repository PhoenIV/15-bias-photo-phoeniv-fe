"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/services/authService";
import { userKeys } from "@/services/queryKeys";

import { IconButton } from "@/components/ui/IconButton";

import { AlertModal } from "../ui/Modal";
import { MobileProfileDrawer } from "./ProfileMenu";

import * as styles from "./Header.css";

/**
 * 모바일 서브페이지 헤더 좌측의 뒤로가기 버튼
 */
export function BackButton() {
  const router = useRouter();
  return <IconButton icon="/images/ic-back.svg" label="뒤로가기" onClick={() => router.back()} />;
}

/**
 * 모바일 헤더 좌측의 햄버거 메뉴 버튼 (클릭 시 사이드 드로어 열림)
 *
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 * @param {string} [props.nickname=""] - 사용자 닉네임
 * @param {number} [props.points=0] - 보유 포인트
 */
export function MenuButton({ isLoggedIn = false, nickname = "", points = 0 }) {
  return <MobileProfileDrawer isLoggedIn={isLoggedIn} nickname={nickname} points={points} />;
}

/**
 * 로그아웃 처리 및 캐시 초기화 버튼
 *
 * @param {Object} props
 * @param {() => void} [props.onAfterLogout] - 로그아웃 성공 직후 추가로 실행할 콜백 (예: 모바일 드로어 닫기)
 */
export function LogoutButton({ onAfterLogout }) {
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

      onAfterLogout?.();
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
