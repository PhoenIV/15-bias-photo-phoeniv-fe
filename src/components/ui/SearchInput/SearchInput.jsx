"use client";

import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";

import * as styles from "./SearchInput.css.js";

/**
 * 돋보기 아이콘이 포함된 검색 전용 입력창 컴포넌트
 *
 * @param {Object} props
 * @param {(value: string) => void} [props.onSearch] - 엔터 키 입력 또는 돋보기 클릭 시 호출되는 함수
 * @param {string} [props.className] - 외부 주입 클래스
 */
export default function SearchInput({
  className,
  disabled,
  onKeyDown,
  onSearch,
  placeholder = "검색",
  ...restProps
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(e.currentTarget.value);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleSearchClick = (e) => {
    if (!onSearch) return;
    const wrapper = e.currentTarget.closest("div")?.parentElement;
    const inputEl = wrapper?.querySelector("input");
    if (inputEl) {
      onSearch(inputEl.value);
    }
  };

  return (
    <Input
      disabled={disabled}
      placeholder={placeholder}
      rightElement={
        <IconButton
          disabled={disabled}
          icon="/images/ic-search.svg"
          label="검색"
          className={styles.searchButton}
          onClick={handleSearchClick}
        />
      }
      type="search"
      className={className}
      onKeyDown={handleKeyDown}
      {...restProps}
    />
  );
}
