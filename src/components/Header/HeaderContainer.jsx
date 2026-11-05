"use client";

import { useMe } from "@/hooks/useMe";

import Header from "./Header";

//HeaderContainer는 유저의 데이터를 가져오는 역할
//Header는 props만 받아 그리는 역할
export default function HeaderContainer() {
  const { user } = useMe();

  return <Header isLoggedIn={Boolean(user)} nickname={user?.nickname} points={user?.point} />;
}
