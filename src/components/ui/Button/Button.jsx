import clsx from "clsx";

import { buttonRecipe } from "./Button.css";

/**
 * 공통 버튼 컴포넌트
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as="button"] 렌더링할 HTML 태그나 Next.js Link 컴포넌트
 * @param {React.ReactNode} props.children - 버튼 내부에 들어갈 내용
 * @param {"primary" | "secondary"} [props.variant="primary"] - 버튼 스타일
 * @param {"thick" | "thin"} [props.thickness="thick"] - 버튼 두께
 * @param {"responsive" | "lg" | "md" | "sm" | "xs"} [props.size="md"] - 버튼 크기 (responsive는 화면 크기에 따라 자동 전환)
 * @param {boolean} [props.fullWidth] - 가로 길이를 100%로 꽉 채울지 여부
 * @param {string} [props.className] - 외부 주입 커스텀 클래스
 * @param {boolean} [props.disabled=false] - 버튼 비활성화 여부
 * @param {"button" | "submit" | "reset"} [props.type="button"] - 버튼의 기본 HTML 타입
 */
export default function Button({
  as: Component = "button", // 외부에서 주입받은 태그로 렌더링합니다. (기본값은 'button')
  children,
  variant = "primary",
  thickness = "thick",
  size = "md",
  fullWidth,
  className,
  disabled,
  type = "button",
  ...restProps
}) {
  return (
    <Component
      disabled={disabled}
      // <a> 태그나 <Link>일 때는 type="button" 속성이 들어가면 웹 표준에 어긋나므로 분기 처리
      type={Component === "button" ? type : undefined}
      className={clsx(buttonRecipe({ variant, thickness, size }), className)}
      style={fullWidth ? { width: "100%" } : undefined}
      {...restProps}
    >
      {children}
    </Component>
  );
}
