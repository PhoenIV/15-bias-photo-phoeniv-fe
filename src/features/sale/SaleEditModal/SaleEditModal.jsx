"use client";

import Image from "next/image";
import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GENRE_OPTIONS, GRADE_OPTIONS } from "@/constants/card";
import { cardKeys, saleKeys } from "@/services/queryKeys";
import { updateSale } from "@/services/saleService";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";

import * as styles from "./SaleEditModal.css.js";

// 판매글 수정하기 모달 (판매자 상세의 [수정하기])
export default function SaleEditModal({ sale, isOpen, onClose }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { card } = sale;

  // 지금 판매글 값으로 채워서 시작 (수량은 남은 수량부터)
  const [quantity, setQuantity] = useState(sale.remainingQuantity);
  const [price, setPrice] = useState(sale.price);
  const [grade, setGrade] = useState(sale.exchangeGrade ?? "");
  const [genre, setGenre] = useState(sale.exchangeGenre ?? "");
  const [description, setDescription] = useState(sale.exchangeDescription ?? "");

  // 최대 = 지금 남은 수량 + 더 올릴 수 있는 내 보유 수량 (10장 이하)
  const maxQuantity = Math.min(sale.remainingQuantity + card.netQuantity, 10);

  const { mutate, isPending } = useMutation({
    mutationFn: updateSale,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: saleKeys.detail(sale.id) });
      await queryClient.invalidateQueries({ queryKey: saleKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: cardKeys.all });
      toast.success("판매글을 수정했습니다.");
      onClose();
    },
    // 실패하면 모달은 그대로 두고 서버 메시지를 토스트로
    onError: (error) => toast.error(error.message),
  });

  // 요청 중에는 X·Esc·취소로 닫히지 않게
  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) return;
    if (!price) {
      toast.warning("가격을 입력해 주세요.");
      return;
    }

    const data = {
      saleId: sale.id,
      price: Number(price),
      exchangeGrade: grade || null,
      exchangeGenre: genre || null,
      exchangeDescription: description || null,
    };
    // 수량은 바꿨을 때만 보냄 (보내면 남은 수량이 그 값으로 다시 맞춰지기 때문)
    if (quantity !== sale.remainingQuantity) {
      data.totalQuantity = quantity;
    }
    mutate(data);
  };

  return (
    <Modal
      ariaLabel="판매글 수정하기"
      isOpen={isOpen}
      className={styles.modal}
      onClose={handleClose}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.subTitle}>수정하기</p>
        {/* Radix 모달은 제목(Dialog.Title)이 없으면 콘솔 에러가 나서 감쌈 */}
        <Dialog.Title className={styles.title}>{card.name}</Dialog.Title>

        <div className={styles.cardRow}>
          <Image alt={card.name} height={300} src={card.imagePublicId} width={400} />
          <div className={styles.infoBox}>
            <p>
              {card.grade} | {card.genre} | {card.creator?.nickname}
            </p>

            <div className={styles.fieldRow}>
              <span>(최대 {maxQuantity}장)</span>
              <div>
                <button
                  disabled={quantity <= 1}
                  type="button"
                  className={styles.stepButton}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button
                  disabled={quantity >= maxQuantity}
                  type="button"
                  className={styles.stepButton}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
                <span> / {maxQuantity}</span>
              </div>
            </div>

            <div className={styles.fieldRow}>
              <span>장당 가격</span>
              <Input
                max={100000}
                min={card.minPrice}
                placeholder="숫자만 입력"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
        </div>

        <h3 className={styles.sectionTitle}>교환 희망 정보</h3>
        <div className={styles.cardRow}>
          <Dropdown
            label="등급"
            options={GRADE_OPTIONS}
            placeholder="등급을 선택해 주세요"
            value={grade}
            onChange={setGrade}
          />
          <Dropdown
            label="장르"
            options={GENRE_OPTIONS}
            placeholder="장르를 선택해 주세요"
            value={genre}
            onChange={setGenre}
          />
        </div>
        <Textarea
          label="교환 희망 설명"
          maxLength={200}
          placeholder="설명을 입력해 주세요"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className={styles.buttonRow}>
          <Button
            disabled={isPending}
            fullWidth
            size="responsive"
            thickness="thin"
            variant="secondary"
            onClick={handleClose}
          >
            취소하기
          </Button>
          <Button disabled={isPending} fullWidth size="responsive" thickness="thin" type="submit">
            {isPending ? "수정하는 중..." : "수정하기"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
