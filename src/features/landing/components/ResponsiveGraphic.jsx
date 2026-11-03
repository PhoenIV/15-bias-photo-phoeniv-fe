import Image from "next/image";

import { sprinkles } from "@/styles/sprinkles.css.js";

export default function ResponsiveGraphic({ alt, srcSm, srcMd, srcLg }) {
  return (
    <>
      {/* 모바일 이미지 */}
      <div className={sprinkles({ display: { mobile: "block", tablet: "none" } })}>
        <Image
          alt={alt}
          height={400}
          src={srcSm}
          width={345}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* 태블릿 이미지 */}
      <div className={sprinkles({ display: { mobile: "none", tablet: "block", pc: "none" } })}>
        <Image
          alt={alt}
          height={450}
          src={srcMd}
          width={600}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* PC 이미지 */}
      <div className={sprinkles({ display: { mobile: "none", pc: "block" } })}>
        <Image
          alt={alt}
          height={500}
          src={srcLg}
          width={1000}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </>
  );
}
