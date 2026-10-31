"use client";

import { Button } from "@/components/ui/Button";

import Modal from "./Modal.jsx";

import * as styles from "./Modal.css.js";

/**
 * 알럿 모달 컴포넌트
 *
 * @param {Object} props
 * @param {string} [props.title] - 알럿 창 제목
 * @param {string} [props.description] - 알럿 창 본문 설명 (개행 문자는 \n 사용)
 * @param {string} [props.confirmText="확인"] - 확인 버튼 텍스트
 * @param {boolean} props.isOpen - 모달 열림 여부
 * @param {() => void} [props.onClose] - 모달 닫기 함수
 * @param {() => void} [props.onConfirm] - 확인 버튼 클릭 시 실행할 함수 (생략 시 onClose 실행)
 */
export default function AlertModal({
  confirmText = "확인",
  description,
  isOpen,
  onClose,
  onConfirm,
  title,
}) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose?.();
    }
  };

  return (
    <Modal isOpen={isOpen} variant="alert" onClose={onClose}>
      {title && <h2 className={styles.alertTitle}>{title}</h2>}
      {description && <p className={styles.alertDesc}>{description}</p>}
      <div className={styles.alertButtonWrapper}>
        <Button size="responsive" thickness="thin" variant="primary" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
