import { useId } from "react";

import clsx from "clsx";

import * as styles from "./Input.css.js";

/**
 * 공통 텍스트 입력 컴포넌트 (일반 텍스트, 이메일 등)
 *
 * @param {Object} props
 * @param {string} [props.label] - 입력창 상단 라벨 텍스트
 * @param {string} [props.error] - 에러 메시지 (전달 시 테두리가 빨간색으로 변경됨)
 * @param {React.ReactNode} [props.rightElement] - 우측 내부에 배치할 요소 (아이콘 버튼 등)
 * @param {"default" | "display"} [props.variant="default"] - 텍스트 스타일 변주 (default: 기본 / display: 굵고 큰 강조용)
 * @param {string} [props.className] - 외부 주입 커스텀 클래스
 */
export default function Input({
  className,
  error,
  label,
  rightElement,
  variant = "default",
  ...restProps
}) {
  const inputId = useId();
  const errorId = error ? `${inputId}-error` : undefined;
  const hasError = Boolean(error);

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.labelRecipe({ variant })}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        <input
          id={inputId}
          aria-errormessage={errorId}
          aria-invalid={hasError}
          className={styles.inputRecipe({
            error: hasError,
            hasRightElement: Boolean(rightElement),
            variant,
          })}
          {...restProps}
        />
        {rightElement && <div className={styles.rightElement}>{rightElement}</div>}
      </div>

      {hasError && (
        <p id={errorId} className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
