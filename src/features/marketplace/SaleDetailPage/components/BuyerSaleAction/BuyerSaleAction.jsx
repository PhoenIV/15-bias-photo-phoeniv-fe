"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saleKeys } from "@/services/queryKeys";
import { makePurchase } from "@/services/saleService";

import { Button } from "@/components/ui/Button";
import { AlertModal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

import * as styles from "./BuyerSaleAction.css";

// 구매자가 보는 구매하기 영역
export default function BuyerSaleAction({ sale }) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isPurchaseConfirmModalOpen, setIsPurchaseConfirmModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { mutate: purchase, isPending: isPurchasePending } = useMutation({
    mutationFn: makePurchase,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: saleKeys.detail(sale.id) }),
        queryClient.invalidateQueries({ queryKey: saleKeys.lists() }),
      ]);
      toast.success("구매가 완료되었습니다.");
      setIsPurchaseConfirmModalOpen(false);
    },
    onError: () => {
      toast.error("구매에 실패했습니다.");
    },
  });

  // 구매 수량을 조절하는 상수와 함수
  const maxQuantity = Math.min(sale.remainingQuantity, 10);
  const currentQuantity = Math.min(quantity, Math.max(1, maxQuantity));
  const subtract = () => {
    setQuantity(Math.max(1, currentQuantity - 1));
  };
  const add = () => {
    setQuantity(Math.min(maxQuantity, currentQuantity + 1));
  };

  const isSoldOut = sale.remainingQuantity === 0;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.quantityRow}>
          <span className={styles.fieldName}>구매수량</span>
          <div className={styles.quantityController}>
            <button
              disabled={isSoldOut || currentQuantity <= 1}
              type="button"
              className={styles.quantityButton}
              onClick={subtract}
            >
              -
            </button>
            <input
              disabled={isSoldOut}
              max={maxQuantity}
              min={1}
              step={1}
              type="number"
              value={isSoldOut ? 0 : currentQuantity}
              className={styles.input}
              onChange={(event) => {
                const next = event.target.valueAsNumber;
                if (Number.isInteger(next)) {
                  setQuantity(Math.min(maxQuantity, Math.max(1, next)));
                }
              }}
            />
            <button
              disabled={isSoldOut || currentQuantity >= maxQuantity}
              type="button"
              className={styles.quantityButton}
              onClick={add}
            >
              +
            </button>
          </div>
        </div>
        <div className={styles.totalPriceRow}>
          <span className={styles.fieldName}>총 가격</span>
          <div className={styles.fieldValue}>
            <span className={styles.totalPrice}>
              {isSoldOut ? "0P" : `${currentQuantity * sale.price}P`}
            </span>
            <span className={styles.setQuantity}>
              {isSoldOut ? " (품절)" : ` (${currentQuantity}장)`}
            </span>
          </div>
        </div>
        <div>
          <Button
            disabled={isSoldOut}
            size="responsive"
            thickness="thin"
            className={styles.purchaseButton}
            onClick={() => setIsPurchaseConfirmModalOpen(true)}
          >
            포토카드 구매하기
          </Button>
        </div>
      </div>
      <AlertModal
        confirmText={isPurchasePending ? "구매 처리 중..." : "확인"}
        description={`[${sale.card.grade}|${sale.card.name}] ${currentQuantity}장을 구매하시겠습니까?`}
        isOpen={isPurchaseConfirmModalOpen}
        title="포토카드 구매"
        onClose={() => setIsPurchaseConfirmModalOpen(false)}
        onConfirm={() => {
          if (isPurchasePending) return;
          purchase({ saleId: sale.id, quantity: currentQuantity, expectedPrice: sale.price });
        }}
      />
    </>
  );
}
