import Image from "next/image";

import * as styles from "./IconButton.css";

/**
 * 로컬 이미지 아이콘 버튼 컴포넌트
 * Radix `asChild`(Trigger, Close 등)가 주입하는 이벤트 핸들러/aria 속성/ref를 버튼에 그대로 전달합니다.
 *
 * @param {Object} props
 * @param {string} props.label - 웹 접근성(aria-label)을 위한 대체 텍스트
 * @param {string} props.icon - 아이콘 이미지 경로 (예: "/images/ic-search.svg")
 * @param {number} [props.size=24] - 아이콘의 가로/세로 픽셀 크기
 * @param {string} [props.className] - 외부 주입 커스텀 클래스 (전달 시 기본 styles.iconBtn을 덮어씀)
 * @param {import("react").Ref<HTMLButtonElement>} [props.ref] - 버튼 ref (React 19에서는 일반 prop)
 */
export default function IconButton({ label, icon, size = 24, className, ...rest }) {
  return (
    <button aria-label={label} type="button" className={className || styles.iconBtn} {...rest}>
      {/* 버튼의 aria-label이 이름을 제공하므로 이미지는 (alt="")으로 처리 */}
      <Image alt="" height={size} src={icon} unoptimized width={size} />
    </button>
  );
}
