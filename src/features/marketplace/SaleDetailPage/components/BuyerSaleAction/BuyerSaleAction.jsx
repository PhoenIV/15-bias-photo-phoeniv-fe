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
  const subtract = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };
  const add = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };

  const isSoldOut = sale.remainingQuantity === 0;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.quantityRow}>
          <span className={styles.fieldName}>구매수량</span>
          <div className={styles.quantityController}>
            <button
              disabled={isSoldOut || quantity <= 1}
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
              value={isSoldOut ? 0 : quantity}
              className={styles.input}
              onChange={(event) => {
                const next = event.target.valueAsNumber;
                if (Number.isInteger(next)) {
                  setQuantity(Math.min(maxQuantity, Math.max(1, next)));
                }
              }}
            />
            <button
              disabled={isSoldOut || quantity >= maxQuantity}
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
              {isSoldOut ? "0P" : `${quantity * sale.price}P`}
            </span>
            <span className={styles.setQuantity}>{isSoldOut ? " (품절)" : ` (${quantity}장)`}</span>
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
        description={`[${sale.card.grade}|${sale.card.name}] ${quantity}장을 구매하시겠습니까?`}
        isOpen={isPurchaseConfirmModalOpen}
        title="포토카드 구매"
        onClose={() => setIsPurchaseConfirmModalOpen(false)}
        onConfirm={() => {
          if (isPurchasePending) return;
          purchase({ saleId: sale.id, quantity, expectedPrice: sale.price });
        }}
      />
    </>
  );
}
