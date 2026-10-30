"use client";

import { useState } from "react";

import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";

import * as styles from "./PasswordInput.css.js";

/**
 * 비밀번호 숨김/표시 토글 기능이 있는 비밀번호 Input 컴포넌트
 *
 * @param {Object} props
 * @param {string} [props.label] - 입력창 상단 라벨
 * @param {string} [props.error] - 에러 메시지
 * @param {string} [props.className] - 외부 주입 클래스
 */
export default function PasswordInput({
  className,
  disabled,
  placeholder = "비밀번호를 입력해 주세요",
  ...restProps
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Input
      disabled={disabled}
      placeholder={placeholder}
      rightElement={
        <IconButton
          disabled={disabled}
          icon={isVisible ? "/images/ic-invisible.svg" : "/images/ic-visible.svg"}
          label={isVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
          className={styles.toggleButton}
          onClick={handleToggle}
        />
      }
      type={isVisible ? "text" : "password"}
      className={className}
      {...restProps}
    />
  );
}
