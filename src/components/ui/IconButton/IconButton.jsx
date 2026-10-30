import Image from "next/image";

import * as styles from "./IconButton.css";

/**
 * 로컬 이미지 아이콘 버튼 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.label - 웹 접근성(aria-label, alt)을 위한 대체 텍스트
 * @param {string} props.icon - 아이콘 이미지 경로 (예: "/images/ic-search.svg")
 * @param {number} [props.size=24] - 아이콘의 가로/세로 픽셀 크기
 * @param {boolean} [props.disabled=false] - 버튼 비활성화 여부
 * @param {function} [props.onClick] - 클릭 시 실행될 콜백 함수
 * @param {string} [props.className] - 외부 주입 커스텀 클래스 (전달 시 기본 styles.iconBtn을 덮어씀)
 */
export default function IconButton({ label, icon, size = 24, disabled, onClick, className }) {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      type="button"
      className={className || styles.iconBtn}
      onClick={onClick}
    >
      <Image alt={label} height={size} src={icon} unoptimized width={size} />
    </button>
  );
}
