"use client";

import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { GENRE_OPTIONS } from "@/constants/card";

import { PhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Textarea } from "@/components/ui/Textarea";

import * as styles from "./ExchangeModal.css.js";

const DESCRIPTION_MAX_LENGTH = 200; // 백엔드 최대 글자 수

const genreLabel = (value) => GENRE_OPTIONS.find((opt) => opt.value === value)?.label ?? value;

// ② 교환 제시 내용 입력
export default function OfferFormStep({ card, isSubmitting, onBack, onSubmit }) {
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return; // 중복 요청 방지
    onSubmit({ offeredUserCardId: card.userCardId, description });
  };

  return (
    <form className={styles.stepLayout} onSubmit={handleSubmit}>
      {/* 모바일: 뒤로가기 줄 */}
      <div className={styles.topBar}>
        <IconButton
          disabled={isSubmitting}
          icon="/images/ic-back.svg"
          label="뒤로가기"
          onClick={onBack}
        />
        <span className={styles.subTitle}>포토카드 교환하기</span>
      </div>

      <header className={styles.header}>
        <p className={`${styles.subTitle} ${styles.pcOnly}`}>포토카드 교환하기</p>
        {/* Radix 모달은 제목(Dialog.Title)이 없으면 콘솔 에러가 나서 감쌈 */}
        <Dialog.Title asChild>
          <h2 className={styles.title}>{card.name}</h2>
        </Dialog.Title>
      </header>

      <div className={styles.formBody}>
        <PhotoCard
          category={genreLabel(card.genre)}
          countLabel="수량"
          grade={card.grade}
          imageId={card.imagePublicId}
          nickname={card.creatorNickname}
          price={card.minPrice}
          remainCount={card.netQuantity}
          title={card.name}
        />

        <div className={styles.stepLayout}>
          <Textarea
            label="교환 제시 내용"
            maxLength={DESCRIPTION_MAX_LENGTH}
            placeholder="내용을 입력해 주세요"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <p className={styles.smallText}>
            {description.length} / {DESCRIPTION_MAX_LENGTH}
          </p>

          <div className={styles.buttonRow}>
            <Button
              disabled={isSubmitting}
              fullWidth
              size="responsive"
              thickness="thin"
              variant="secondary"
              onClick={onBack}
            >
              취소하기
            </Button>
            <Button
              disabled={isSubmitting}
              fullWidth
              size="responsive"
              thickness="thin"
              type="submit"
            >
              {isSubmitting ? "제시하는 중..." : "교환하기"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
