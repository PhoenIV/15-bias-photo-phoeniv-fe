"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";

import { IconButton } from "@/components/ui/IconButton";

import * as styles from "./Modal.css.js";

/**
 * 모달 Base 컴포넌트
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 여부
 * @param {() => void} [props.onClose] - 닫기(X 버튼, 배경 클릭, ESC) 실행 함수
 * @param {"alert" | "default"} [props.variant="default"] - 모달 형태 (alert: 알럿용 좁은 창, default: 일반 커스텀용 넓은 창)
 * @param {React.ReactNode} props.children - 모달 내부에 들어갈 커스텀 UI
 * @param {string} [props.className] - 외부 주입 커스텀 클래스
 */
export default function Modal({ children, className, isOpen, onClose, variant = "default" }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div aria-modal="true" role="dialog" className={styles.overlay} onClick={handleOverlayClick}>
      <div className={clsx(styles.contentRecipe({ variant }), className)}>
        {onClose && (
          <IconButton
            icon="/images/ic-close.svg"
            label="모달 닫기"
            size={28}
            className={styles.closeButton}
            onClick={onClose}
          />
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
