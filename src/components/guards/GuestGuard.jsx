"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AUTH_ROUTES } from "@/constants/authRoutes";
import { useMe } from "@/hooks/useMe";

/**
 * 로그인 유저가 게스트 전용 페이지에 접근하지 못하도록 막아주는 클라이언트 화면 가드(로그인 차단)
 *
 * - 로그인된 유저가 접근 시: 마켓플레이스로 이동
 */
export function GuestGuard({ children }) {
  const router = useRouter();
  const { user } = useMe();

  useEffect(() => {
    if (user) {
      router.replace(AUTH_ROUTES.MARKETPLACE);
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return children;
}
