import clsx from "clsx";

import { GlobalLayout } from "@/components/layouts/GlobalLayout";

import "@/styles/global.css.js";

import { baskinRobbins, notoSansKr } from "@/styles/fonts";

export const metadata = {
  title: "최애의 포토",
  description: `디지털 시대의 새로운 수집 문화를 선도하는 플랫폼입니다. 
자신이 좋아하는 아이돌이나 스포츠 스타, 그림 등 디지털 포토카드를 손쉽게 사고팔 수 있는 공간으로, 특별한 커뮤니티를 제공합니다. 
좋아하는 포토카드를 실제로 모으는 것뿐만 아니라, 디지털 자산으로 소장하며 나만의 컬렉션을 완성해보세요.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={clsx(notoSansKr.variable, baskinRobbins.variable)}>
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
