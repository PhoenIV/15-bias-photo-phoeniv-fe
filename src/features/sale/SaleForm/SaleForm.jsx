"use client";

import Image from "next/image";
import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GENRE_OPTIONS, GRADE_OPTIONS } from "@/constants/card";
import { cardKeys, saleKeys } from "@/services/queryKeys";
import { postSale } from "@/services/saleService";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";

import * as styles from "./SaleForm.css.js";

// 나의 포토카드 판매하기 모달 (판매할 카드를 고른 다음 단계)
export default function SaleForm({ card, isOpen, onClose }) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  // 한 번에 최대 10장, 내가 가진 수량까지만
  const maxQuantity = Math.min(card.netQuantity, 10);

  const { mutate, isPending } = useMutation({
    mutationFn: postSale,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: saleKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: cardKeys.all });
      toast.success("판매글을 등록했습니다.");
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
    if (Number(price) < card.minPrice || Number(price) > 100000) {
      toast;
    }
    mutate({
      userCardId: card.userCardId,
      price: Number(price),
      totalQuantity: quantity,
      exchangeGrade: grade || null,
      exchangeGenre: genre || null,
      exchangeDescription: description || null,
    });
  };

  return (
    <Modal
      ariaLabel="포토카드 판매하기"
      isOpen={isOpen}
      className={styles.modal}
      onClose={handleClose}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.subTitle}>나의 포토카드 판매하기</p>
        {/* Radix 모달은 제목(Dialog.Title)이 없으면 콘솔 에러가 나서 감쌈 */}
        <Dialog.Title className={styles.title}>{card.name}</Dialog.Title>

        <div className={styles.cardRow}>
          <Image alt={card.name} height={300} src={card.imagePublicId} width={400} />
          <div className={styles.infoBox}>
            <p>
              {card.grade} | {card.genre} | {card.creatorNickname}
            </p>

            <div className={styles.fieldRow}>
              <span>총 판매 수량</span>
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
            {isPending ? "등록하는 중..." : "판매하기"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
