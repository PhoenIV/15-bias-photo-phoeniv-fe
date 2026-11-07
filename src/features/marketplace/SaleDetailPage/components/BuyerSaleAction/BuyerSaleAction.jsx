"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { makePurchase } from "@/services/saleService";

import { Button } from "@/components/ui/Button";
import { AlertModal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

import * as styles from "./BuyerSaleAction.css";

// 구매자가 보는 구매하기 영역
export default function BuyerSaleAction({ sale }) {
  const [isPurchaseConfirmModalOpen, setIsPurchaseConfirmModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = Math.min(sale.remainingQuantity, 10);
  const isSoldOut = sale.remainingQuantity === 0;
  const subtract = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };
  const add = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };

  const router = useRouter();
  const toast = useToast();

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
        description={`[${sale.card.grade}|${sale.card.name}] ${quantity}장을 구매하시겠습니까?`}
        isOpen={isPurchaseConfirmModalOpen}
        title="포토카드 구매"
        onClose={() => setIsPurchaseConfirmModalOpen(false)}
        onConfirm={() => {
          makePurchase({ saleId: sale.id, quantity, expectedPrice: sale.price })
            .then(() => {
              toast.success("구매가 완료되었습니다.");
              setIsPurchaseConfirmModalOpen(false);
              router.refresh();
            })
            .catch(() => {
              toast.error("구매에 실패했습니다.");
            });
        }}
      />
    </>
  );
}
