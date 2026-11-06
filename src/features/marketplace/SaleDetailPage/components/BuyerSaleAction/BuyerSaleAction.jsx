"use client";

import { useState } from "react";

import { makePurchase } from "@/services/saleService";

import { Button } from "@/components/ui/Button";
import { AlertModal, Modal } from "@/components/ui/Modal";

import * as styles from "./BuyerSaleAction.css";

// 구매자가 보는 구매하기 영역
export default function BuyerSaleAction({ sale }) {
  const [isPurchaseConfirmModalOpen, setIsPurchaseConfirmModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const subtract = () => {
    setQuantity((prev) => prev - 1);
  };
  const add = () => {
    setQuantity((prev) => prev + 1);
  };
  const onClickPurchase = () => {
    makePurchase(sale.id, quantity, sale.price);
  };
  return (
    <>
      <div>
        <div>
          <span>구매수량</span>
          <div>
            <button type="button" onClick={subtract}>
              -
            </button>
            <input value={quantity} />
            <button type="button" onClick={add}>
              +
            </button>
          </div>
        </div>
        <div>
          <span>총 가격</span>
          <div>
            <span>{quantity * sale.price}P</span>
            <span>({quantity}장)</span>
          </div>
        </div>
        <div>
          <Button
            size="responsive"
            thickness="thin"
            onClick={() => setIsPurchaseConfirmModalOpen(true)}
          >
            포토카드 구매하기
          </Button>
        </div>
      </div>
      <AlertModal
        isOpen={isPurchaseConfirmModalOpen}
        title="포토카드를 구매합니다."
        onClose={() => setIsPurchaseConfirmModalOpen(false)}
      >
        <Button />
      </AlertModal>
      <Modal isOpen={isExchangeModalOpen} onClose={() => setIsExchangeModalOpen(false)}></Modal>
    </>
  );
}
