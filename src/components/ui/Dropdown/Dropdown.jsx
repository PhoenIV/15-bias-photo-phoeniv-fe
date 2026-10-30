"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import clsx from "clsx";

import * as styles from "./Dropdown.css.js";

/**
 * 옵션 목록에서 하나의 값을 선택하는 드롭다운 컴포넌트
 *
 * @param {Object} props
 * @param {Array<{ label: string, value: string }>} [props.options=[]] - 선택 가능한 옵션 배열
 * @param {string} [props.value] - 현재 선택된 값 (제어 컴포넌트용)
 * @param {string} [props.defaultValue=""] - 초기 선택 값 (비제어 컴포넌트용)
 * @param {(value: string) => void} [props.onChange] - 값 변경 시 호출되는 콜백 함수
 * @param {string} [props.placeholder="선택해 주세요"] - 값이 없을 때 표시할 안내 문구
 * @param {string} [props.label] - 상단 라벨 텍스트
 * @param {string} [props.error] - 에러 메시지
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {string} [props.className] - 외부 주입 클래스
 */
export default function Dropdown({
  className,
  defaultValue = "",
  disabled = false,
  error,
  label,
  onChange,
  options = [],
  placeholder = "선택해 주세요",
  value,
}) {
  const dropdownId = useId();
  const labelId = label ? `${dropdownId}-label` : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const wrapperRef = useRef(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === currentValue);
  const hasError = Boolean(error);

  // 드롭다운 바깥 영역 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (optionValue) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={clsx(styles.wrapper, className)}>
      {label && (
        <label id={labelId} className={styles.label}>
          {label}
        </label>
      )}

      <button
        id={dropdownId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        disabled={disabled}
        type="button"
        className={styles.triggerRecipe({
          error: hasError,
          hasValue: Boolean(selectedOption),
        })}
        onClick={handleToggle}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <Image
          alt={isOpen ? "닫기" : "열기"}
          height={24}
          src={isOpen ? "/images/ic-up.svg" : "/images/ic-down.svg"}
          unoptimized
          width={24}
        />
      </button>

      {isOpen && (
        <ul role="listbox" className={styles.menuList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              aria-selected={opt.value === currentValue}
              role="option"
              tabIndex={0} // 키보드 접근성
              className={styles.menuItem}
              onClick={() => handleSelect(opt.value)}
              onKeyDown={(e) => {
                // 키보드 접근성
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(opt.value);
                }
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {hasError && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
