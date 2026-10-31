"use client";

import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

import { IconButton } from "@/components/ui/IconButton";

import * as styles from "./Modal.css.js";

/**
 * 모달 Base 컴포넌트
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 여부
 * @param {() => void} [props.onClose] - 모달 닫기 함수
 * @param {"alert" | "default"} [props.variant="default"] - 모달 형태
 * @param {React.ReactNode} props.children - 모달 내부 UI
 * @param {string} [props.className] - 외부 주입 커스텀 클래스
 * @param {string} [props.ariaLabel="모달"] - 모달의 접근성 이름
 */
export default function Modal({
  children,
  className,
  isOpen,
  onClose,
  variant = "default",
  ariaLabel = "모달",
}) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content
            aria-label={ariaLabel}
            className={clsx(styles.contentRecipe({ variant }), className)}
          >
            {onClose && (
              <Dialog.Close asChild>
                <IconButton
                  icon="/images/ic-close.svg"
                  label="모달 닫기"
                  size={28}
                  className={styles.closeButton}
                />
              </Dialog.Close>
            )}

            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
