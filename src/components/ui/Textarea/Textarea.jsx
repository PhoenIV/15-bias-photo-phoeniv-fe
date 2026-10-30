import { useId } from "react";

import clsx from "clsx";

import * as styles from "./Textarea.css.js";

/**
 * 여러 줄 텍스트 입력 컴포넌트 (카드 설명 등)
 *
 * @param {Object} props
 * @param {string} [props.label] - 상단 라벨 텍스트
 * @param {string} [props.error] - 에러 메시지
 * @param {string} [props.className] - 외부 주입 클래스
 */
export default function Textarea({ className, error, label, ...restProps }) {
  const inputId = useId();
  const errorId = error ? `${inputId}-error` : undefined;
  const hasError = Boolean(error);

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        aria-errormessage={errorId}
        aria-invalid={hasError}
        className={styles.textareaRecipe({ error: hasError })}
        {...restProps}
      />
      {hasError && (
        <p id={errorId} className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
