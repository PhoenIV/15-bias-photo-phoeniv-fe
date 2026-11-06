"use client";

import { useMe } from "@/hooks/useMe";

import AppHeader from "./AppHeader";

//HeaderContainer는 유저의 데이터를 가져오는 역할
//Header는 props만 받아 그리는 역할
export default function HeaderContainer() {
  const { user } = useMe();

  return <AppHeader isLoggedIn={Boolean(user)} nickname={user?.nickname} points={user?.point} />;
}
