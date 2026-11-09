import clsx from "clsx";

import { chipRecipe } from "./Chip.css.js";

/**
 * 상태나 메타데이터(카드 수량 등)를 표시하는 Chip 컴포넌트입니다.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as="div"] - 렌더링할 HTML 태그 (예: "button", "div")
 * @param {React.ReactNode} props.children - 칩 내부에 들어갈 내용
 * @param {string} [props.className] - 추가 커스텀 CSS 클래스
 * @param {"default" | "main" | "blue" | "purple" | "pink"} [props.color="default"] - 테두리 및 글자 색상
 * @param {"responsive" | "lg" | "md" | "sm"} [props.size="md"] - 칩 크기 규격 (responsive는 화면 크기에 따라 자동 전환)
 * @param {"outlined" | "ghost"} [props.variant="outlined"] - 테두리 유무
 */
export default function Chip({
  as: Component = "div",
  children,
  className,
  color = "default",
  size = "md",
  variant = "outlined",
  ...restProps
}) {
  return (
    <Component className={clsx(chipRecipe({ color, size, variant }), className)} {...restProps}>
      {children}
    </Component>
  );
}
