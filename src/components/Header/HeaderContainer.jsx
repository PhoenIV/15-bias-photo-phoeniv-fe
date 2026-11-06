"use client";

import { useMe } from "@/hooks/useMe";
import { useNotificationStream } from "@/hooks/useNotifications";

import AppHeader from "./AppHeader";

/**
 * 헤더 컨테이너 컴포넌트
 */
export default function HeaderContainer() {
  const { user } = useMe();
  const isLoggedIn = Boolean(user);

  useNotificationStream(isLoggedIn);

  return <AppHeader isLoggedIn={isLoggedIn} nickname={user?.nickname} points={user?.point} />;
}
