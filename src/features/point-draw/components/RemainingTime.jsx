"use client";

import { useEffect, useState } from "react";

export default function RemainingTime({ nextAvailableAt }) {
  const [now, setNow] = useState(() => Date.now());

  //1초 마다 now에 시간을 저장해준다 -> 즉, now = 1초 씩 지나가는 시간을 나타냄
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  //시간 형태로 나타낼 변수들 초, 분
  const totalSeconds = Math.max(0, Math.ceil((new Date(nextAvailableAt).getTime() - now) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <>
      {minutes}분 {seconds}초
    </>
  );
}
