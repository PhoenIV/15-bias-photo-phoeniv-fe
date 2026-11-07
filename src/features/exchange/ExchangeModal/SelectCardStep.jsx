"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { GENRE_OPTIONS, GRADE_OPTIONS } from "@/constants/card";
import { useMyGalleryCards } from "@/hooks/useCard";

import { PhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { SearchInput } from "@/components/ui/SearchInput";

import * as styles from "./ExchangeModal.css.js";

const PAGE_LIMIT = 12;

// "전체"를 고르면 필터를 다시 풀 수 있게 맨 앞에 추가
const ALL = "ALL";
const GRADE_FILTER_OPTIONS = [{ label: "전체", value: ALL }, ...GRADE_OPTIONS];
const GENRE_FILTER_OPTIONS = [{ label: "전체", value: ALL }, ...GENRE_OPTIONS];
const toFilterValue = (value) => (value === ALL ? "" : value);

const genreLabel = (value) => GENRE_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
const gradeLabel = (value) => GRADE_OPTIONS.find((opt) => opt.value === value)?.label ?? value;

// ① 교환할 포토카드 선택
export default function SelectCardStep({ exchangeGrade, exchangeGenre, onSelect }) {
  const [keyword, setKeyword] = useState("");
  // 판매자가 정한 교환 조건이 있으면 그 값으로 필터 고정
  const [grade, setGrade] = useState(exchangeGrade ?? "");
  const [genre, setGenre] = useState(exchangeGenre ?? "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const isGradeLocked = Boolean(exchangeGrade);
  const isGenreLocked = Boolean(exchangeGenre);

  const conditionText = [
    exchangeGrade && gradeLabel(exchangeGrade),
    exchangeGenre && genreLabel(exchangeGenre),
  ]
    .filter(Boolean)
    .join(" · ");

  let emptyMessage = "교환에 사용할 수 있는 포토카드가 없습니다.";
  if (conditionText && !keyword) {
    emptyMessage = `판매자가 원하는 ${conditionText} 포토카드가 없습니다.`;
  } else if (keyword || grade || genre) {
    emptyMessage = "조건에 맞는 포토카드가 없습니다.";
  }

  const filters = (
    <>
      <Dropdown
        disabled={isGradeLocked}
        options={GRADE_FILTER_OPTIONS}
        placeholder="등급"
        value={grade}
        onChange={(value) => setGrade(toFilterValue(value))}
      />
      <Dropdown
        disabled={isGenreLocked}
        options={GENRE_FILTER_OPTIONS}
        placeholder="장르"
        value={genre}
        onChange={(value) => setGenre(toFilterValue(value))}
      />
    </>
  );

  return (
    <div className={styles.stepLayout}>
      <div className={styles.sheetHandle} />

      <header className={styles.header}>
        <p className={styles.subTitle}>마이갤러리</p>
        {/* Radix 모달은 제목(Dialog.Title)이 없으면 콘솔 에러가 나서 감쌈 */}
        <Dialog.Title asChild>
          <h2 className={styles.brandTitle}>포토카드 교환하기</h2>
        </Dialog.Title>
      </header>

      <div className={styles.queryRow}>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <Image alt="필터" height={24} src="/images/ic-filter.svg" width={24} />
        </button>
        <SearchInput className={styles.searchBox} onSearch={(value) => setKeyword(value.trim())} />
        <div className={styles.inlineFilters}>{filters}</div>
      </div>

      {isFilterOpen && <div className={styles.mobileFilters}>{filters}</div>}

      <MyCardList
        emptyMessage={emptyMessage}
        params={{ genre, grade, keyword, limit: PAGE_LIMIT }}
        onSelect={onSelect}
      />
    </div>
  );
}

// 내 카드 목록 (마켓플레이스 CardContainer와 같은 방식)
function MyCardList({ params, emptyMessage, onSelect }) {
  const {
    data,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    refetch,
  } = useMyGalleryCards(params);

  const loadMoreRef = useRef(null);

  // 목록 끝이 보이면 다음 페이지 불러오기
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isFetchingNextPage || isFetchNextPageError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, isFetchNextPageError]);

  if (isPending)
    return (
      <div className={styles.cardList}>
        <p className={styles.informText}>로딩중...</p>
      </div>
    );
  if (isError && !data)
    return (
      <div className={styles.cardList}>
        <p className={styles.informText}>앗! 조회에 실패했습니다.</p>
        <Button size="responsive" thickness="thin" onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </div>
    );

  const cards = data.pages.flatMap((page) => page.data);

  if (cards.length === 0)
    return (
      <div className={styles.cardList}>
        <p className={styles.informText}>{emptyMessage}</p>
      </div>
    );

  return (
    <div className={styles.cardList}>
      <ul className={styles.cardGrid}>
        {cards.map((card) => (
          <li key={card.userCardId}>
            <button type="button" className={styles.cardButton} onClick={() => onSelect(card)}>
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
            </button>
          </li>
        ))}
      </ul>

      {hasNextPage && <div ref={loadMoreRef} />}
      {isFetchingNextPage && <p className={styles.informText}>로딩중...</p>}
      {isFetchNextPageError && (
        <Button size="responsive" thickness="thin" onClick={() => fetchNextPage()}>
          다시 시도하기
        </Button>
      )}
    </div>
  );
}
