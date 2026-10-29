import clsx from "clsx";

import { buttonRecipe } from "./Button.css";

/**
 * 공통 버튼 컴포넌트
 *
 * @param {Object} props
 * @param {"primary" | "secondary"} [props.variant="primary"] - 버튼 스타일
 * @param {"thick" | "thin"} [props.thickness="thick"] - 버튼 두께
 * @param {"lg" | "md" | "sm" | "xs"} [props.size="md"] - 버튼 크기(xs: `thin`두께일때만 사용)
 * @param {boolean} [props.disabled=false] - 버튼 비활성화 여부
 */
export default function Button({
  children,
  type = "button",
  variant = "primary",
  thickness = "thick",
  size = "md",
  disabled = false,
  className,
  ...restProps
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      // buttonRecipe에 props를 넘겨주면 자동으로 알맞은 클래스 조합을 반환
      className={clsx(buttonRecipe({ variant, thickness, size }), className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
