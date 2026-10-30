"use client";

import { useRef, useState } from "react";

import clsx from "clsx";

import { IconButton } from "@/components/ui/IconButton";

import * as styles from "./FileInput.css.js";

/**
 * 사진 및 파일 업로드 전용 인풋 컴포넌트
 *
 * @param {Object} props
 * @param {(file: File | null) => void} [props.onChange] - 파일 선택 또는 삭제 시 호출되는 콜백 함수
 * @param {string} [props.placeholder="사진 업로드"] - 파일 선택 전 표시될 안내 문구
 * @param {string} [props.buttonText="파일 선택"] - 우측 버튼 텍스트
 * @param {string} [props.accept="image/*"] - 허용할 파일 확장자 타입
 * @param {string} [props.label] - 상단 라벨 텍스트
 * @param {string} [props.error] - 에러 메시지
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {string} [props.className] - 외부 주입 클래스
 */
export default function FileInput({
  accept = "image/*",
  buttonText = "파일 선택",
  className,
  disabled = false,
  error,
  label,
  onChange,
  placeholder = "사진 업로드",
  ...restProps
}) {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);
  const hasError = Boolean(error);
  const hasFile = Boolean(fileName);

  const handleButtonClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      if (onChange) onChange(file);
    }
  };

  const handleClear = () => {
    setFileName("");
    if (inputRef.current) {
      inputRef.current.value = ""; // 동일 파일 재업로드 가능하도록 초기화
    }
    if (onChange) onChange(null);
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.rowContainer}>
        {/* 숨겨진 실제 file input */}
        <input
          ref={inputRef}
          accept={accept}
          disabled={disabled}
          type="file"
          className={styles.hiddenInput}
          onChange={handleFileChange}
          {...restProps}
        />

        {/* 좌측 파일명 표시 박스 */}
        <div
          className={styles.displayBoxRecipe({
            disabled,
            error: hasError,
            hasFile,
          })}
        >
          <span className={styles.fileNameText}>{hasFile ? fileName : placeholder}</span>

          {hasFile && !disabled && (
            <IconButton
              icon="/images/ic-close.svg"
              label="선택한 파일 삭제"
              size={22}
              className={styles.clearButton}
              onClick={handleClear}
            />
          )}
        </div>

        {/* 우측 파일 선택 트리거 버튼 */}
        <button
          disabled={disabled}
          type="button"
          className={styles.uploadButton}
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>

      {hasError && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
