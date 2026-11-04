"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useMe } from "@/hooks/useMe";

//FE 에서 비로그인 유저의 접근을 막아주는 화면 가드 역할
export default function PrivateLayout({ children }) {
  const router = useRouter();
  const { user, isPending, error } = useMe();
  const isUnauthenticated = error?.status === 401;

  //비로그인 유저 접급시 로그인 페이지로 이동 (replace를 사용하여 뒤로가기 했을 때도 다시 접근 못하게)
  useEffect(() => {
    if (isUnauthenticated) {
      router.replace("/login");
    }
  }, [isUnauthenticated, router]);

  //로딩중이거나 확인 중일때 private 아래의 페이지를 보여주지 않음
  if (isPending || isUnauthenticated) {
    return null;
  }

  //회원 유저가 접속중에 서버 불안정으로 끊길 경우 로그인 페이지로 튕기는 걸 막아줌
  //401 이외의 에러가 발생했을 때 화면이 아예 날아가는 것을 막아줌
  if (!user) {
    return <p>사용자 정보를 불러오지 못했습니다.</p>;
  }

  return children;
}
