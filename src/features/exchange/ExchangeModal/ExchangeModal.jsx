"use client";

import { useState } from "react";

import { useCreateExchangeOffer } from "@/hooks/useExchange";

import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

import OfferFormStep from "./OfferFormStep.jsx";
import SelectCardStep from "./SelectCardStep.jsx";

import * as styles from "./ExchangeModal.css.js";

// 포토카드 교환하기 모달: ① 교환할 카드 선택 → ② 교환 제시 내용 입력
export default function ExchangeModal({
  saleId,
  exchangeGrade = null,
  exchangeGenre = null,
  isOpen,
  onClose,
  onSuccess,
}) {
  const toast = useToast();
  const [selectedCard, setSelectedCard] = useState(null); // null이면 ①, 고르면 ②
  const { isPending, mutate } = useCreateExchangeOffer();

  const handleClose = () => {
    setSelectedCard(null);
    onClose?.();
  };

  // 제출 중에는 닫기,뒤로가기 막기
  const handleCancel = () => {
    if (isPending) return;
    handleClose();
  };

  const handleBack = () => {
    if (isPending) return;
    setSelectedCard(null);
  };

  const handleSubmit = ({ offeredUserCardId, description }) => {
    mutate(
      { saleId, offeredUserCardId, description: description.trim() || null },
      {
        onSuccess: (result) => {
          handleClose();
          // 성공 시 토스트
          if (onSuccess) onSuccess(result.data);
          else toast.success("포토카드 교환 제시에 성공했습니다!");
        },
        // 실패하면 폼은 그대로 두고 서버 메시지를 토스트로
        onError: (error) => toast.error(error.message),
      },
    );
  };

  return (
    <Modal
      ariaLabel="포토카드 교환하기"
      isOpen={isOpen}
      className={styles.modal}
      onClose={handleCancel}
    >
      {selectedCard ? (
        <OfferFormStep
          card={selectedCard}
          isSubmitting={isPending}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      ) : (
        <SelectCardStep
          exchangeGenre={exchangeGenre}
          exchangeGrade={exchangeGrade}
          onSelect={setSelectedCard}
        />
      )}
    </Modal>
  );
}
