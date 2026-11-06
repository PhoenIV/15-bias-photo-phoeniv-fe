import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";

// 구글 폰트 설정
export const notoSansKr = Noto_Sans_KR({
  weight: ["300", "400", "700"], // Light, Regular, Bold
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

// 배스킨라빈스 로컬 폰트 설정
export const baskinRobbins = localFont({
  src: [
    {
      path: "../app/fonts/baskin-robbins-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/baskin-robbins-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-baskin-robbins",
});
