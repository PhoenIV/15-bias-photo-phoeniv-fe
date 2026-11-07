"use client";

import { useState } from "react";

import { makePurchase } from "@/services/saleService";

import { Button } from "@/components/ui/Button";
import { AlertModal } from "@/components/ui/Modal";

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

  return (
    <>
      <div>
        <div>
          <span>구매수량</span>
          <div>
            <button disabled={isSoldOut} type="button" onClick={subtract}>
              -
            </button>
            <input
              disabled={isSoldOut}
              type="number"
              value={isSoldOut ? 0 : quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <button disabled={isSoldOut} type="button" onClick={add}>
              +
            </button>
          </div>
        </div>
        <div>
          <span>총 가격</span>
          <div>
            <span>{isSoldOut ? "0P" : `${quantity * sale.price}P`}</span>
            <span>{isSoldOut ? "(품절)" : `(${quantity}장)`}</span>
          </div>
        </div>
        <div>
          <Button
            disabled={isSoldOut}
            size="responsive"
            thickness="thin"
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
          makePurchase({ saleId: sale.id, quantity, expectedPrice: sale.price });
          setIsPurchaseConfirmModalOpen(false);
        }}
      />
    </>
  );
}
