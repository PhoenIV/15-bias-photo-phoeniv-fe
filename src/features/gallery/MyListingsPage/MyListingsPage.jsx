"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { clsx } from "clsx";

import {
  CARD_GENRE_FILTER,
  CARD_SALE_TYPE_FILTER,
  CARD_SOLD_OUT_FILTER,
  DEFAULT_CARD_LIMIT,
  DEFAULT_GRADE_COUNTS,
  GENRE_LABEL_MAP,
  GRADE_OPTIONS,
  NEXT_PAGE_SKELETON_COUNT,
  SALE_TYPE_STATUS_MAP,
} from "@/constants/card";
import { useMySalesCards, useMySalesSummary } from "@/hooks/useCard";
import { useCloseOnBreakpoint } from "@/hooks/useCloseOnBreakpoint";
import { useMe } from "@/hooks/useMe";

import { MobileFilterModal } from "@/components/common/MobileFilterModal";
import { PhotoCard, PhotoCardSkeleton } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Dropdown } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";

import * as styles from "./MyListingsPage.css";

const LISTINGS_FILTERS = [CARD_GENRE_FILTER, CARD_SALE_TYPE_FILTER, CARD_SOLD_OUT_FILTER];

export default function MyListingsPage() {
  const { user } = useMe();
  const { data: summary } = useMySalesSummary();

  const [params, setParams] = useState({ limit: DEFAULT_CARD_LIMIT });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filterButtonRef = useRef(null);
  const loadMoreRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isFetchNextPageError,
    isPending,
    refetch,
  } = useMySalesCards(params);

  const hasActiveFilter = Boolean(
    params.keyword ||
    params.grade ||
    params.genre ||
    params.saleType ||
    params.isSoldOut !== undefined,
  );

  // 필터에 연동되는 실시간 등급 통계
  const totalCount = data?.pages?.[0]?.pagination?.totalCount ?? summary?.totalCount ?? 0;
  const gradeCounts = data?.pages?.[0]?.gradeCounts ?? summary?.gradeCounts ?? DEFAULT_GRADE_COUNTS;

  // 태블릿/PC 뷰포트로 전환될 때 열려 있던 모바일 필터 모달 자동 닫힘
  useCloseOnBreakpoint({
    closeOn: "tablet",
    isOpen: isFilterModalOpen,
    onClose: () => setIsFilterModalOpen(false),
  });

  // 무한 스크롤 IntersectionObserver
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isFetchingNextPage || isFetchNextPageError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, isFetchNextPageError]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  };

  const updateParam = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
    scrollToTop();
  };

  const handleSearch = (keyword) => {
    updateParam("keyword", keyword.trim());
  };

  const handleFilterChange = (filterKey, value) => {
    // 이미 선택된 옵션을 다시 클릭하면 필터 해제
    setParams((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey] === value ? undefined : value || undefined,
    }));
    scrollToTop();
  };

  const handleMultipleFilterChange = (filters) => {
    setParams((prev) => {
      const next = { ...prev };
      Object.entries(filters).forEach(([key, value]) => {
        next[key] = value || undefined;
      });
      return next;
    });
    scrollToTop();
  };

  const sales = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className={styles.page}>
      {/* 상단 타이틀 (모바일에서는 SubPageHeader에 노출) */}
      <div className={styles.topRow}>
        <h1 className={styles.pageTitle}>나의 판매 포토카드</h1>
      </div>

      {/* 판매·교환 포토카드 요약 및 등급별 Chip */}
      <section className={styles.summarySection}>
        <div>
          <span className={styles.summaryTitle}>
            {user?.nickname
              ? `${user.nickname}님이 판매·교환 중인 포토카드`
              : "판매·교환 중인 포토카드"}
          </span>
          <span className={styles.summaryCount}>({totalCount}장)</span>
        </div>

        <div className={styles.chipRow}>
          {GRADE_OPTIONS.map(({ color, label, value }) => {
            const isSelected = params.grade === value;
            const isDimmed = Boolean(params.grade) && !isSelected;

            return (
              <Chip
                key={value}
                aria-pressed={isSelected}
                as="button"
                color={color}
                size="responsive"
                type="button"
                variant="outlined"
                className={clsx(
                  styles.chipButton,
                  isSelected && [styles.chipActive, styles.chipActiveColors[color]],
                  isDimmed && styles.chipInactive,
                )}
                onClick={() => handleFilterChange("grade", value)}
              >
                <span>{label}</span>
                <span>{gradeCounts[value] ?? 0}장</span>
              </Chip>
            );
          })}
        </div>
      </section>

      {/* 검색창 및 장르·판매방법·매진여부 필터 */}
      <div className={styles.queryRow}>
        <button
          ref={filterButtonRef}
          aria-label="필터 열기"
          type="button"
          className={styles.mobileFilterButton}
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Image alt="검색 필터" height={24} src="/images/ic-filter.svg" width={24} />
        </button>

        <SearchInput placeholder="검색" className={styles.searchInput} onSearch={handleSearch} />

        <div className={styles.desktopFilters}>
          {LISTINGS_FILTERS.map((filter) => (
            <Dropdown
              key={filter.value}
              options={filter.options}
              placeholder={filter.placeholder}
              value={params[filter.value] ?? ""}
              className={styles.filterDropdown}
              onChange={(value) => handleFilterChange(filter.value, value)}
            />
          ))}
        </div>
      </div>

      {/* 포토카드 목록 영역 */}
      {isPending ? (
        <div aria-busy="true" aria-label="포토카드 목록 로딩 중" className={styles.cardGrid}>
          {Array.from({ length: DEFAULT_CARD_LIMIT }).map((_, index) => (
            <PhotoCardSkeleton key={index} />
          ))}
        </div>
      ) : isError && !data ? (
        <div role="status" className={styles.statusWrapper}>
          <p className={styles.informText}>앗! 조회에 실패했습니다.</p>
          <Button
            size="sm"
            thickness="thin"
            className={styles.retryButton}
            onClick={() => refetch()}
          >
            다시 시도하기
          </Button>
        </div>
      ) : sales.length === 0 ? (
        <div role="status" className={styles.statusWrapper}>
          <p className={styles.informText}>
            {hasActiveFilter ? "조회 결과가 없습니다." : "판매·교환 중인 포토카드가 없습니다."}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.cardGrid}>
            {sales.map((item) => {
              const photoCard = item.photoCard ?? item;
              const cardKey = item.id ?? `${item.saleType}-${item.itemId}`;

              const cardContent = (
                <PhotoCard
                  category={GENRE_LABEL_MAP[photoCard.genre] ?? photoCard.genre}
                  countLabel="잔여"
                  grade={photoCard.grade}
                  imageId={photoCard.imagePublicId}
                  isSoldOut={item.isSoldOut}
                  nickname={photoCard.creatorNickname}
                  price={item.price}
                  remainCount={item.quantity}
                  status={item.isSoldOut ? undefined : SALE_TYPE_STATUS_MAP[item.saleType]}
                  title={photoCard.name}
                />
              );

              return item.saleId ? (
                <Link key={cardKey} href={`/sales/${item.saleId}`} className={styles.cardLink}>
                  {cardContent}
                </Link>
              ) : (
                <div key={cardKey}>{cardContent}</div>
              );
            })}
            {isFetchingNextPage &&
              Array.from({ length: NEXT_PAGE_SKELETON_COUNT }).map((_, index) => (
                <PhotoCardSkeleton key={`next-skeleton-${index}`} />
              ))}
          </div>

          {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}
          {isFetchNextPageError && (
            <div role="status" className={styles.statusWrapper}>
              <p className={styles.informText}>추가 목록 조회에 실패했습니다.</p>
              <Button
                size="sm"
                thickness="thin"
                className={styles.retryButton}
                onClick={() => fetchNextPage()}
              >
                다시 시도하기
              </Button>
            </div>
          )}
        </>
      )}

      {/* 모바일 필터 모달 */}
      <Modal
        isOpen={isFilterModalOpen}
        className={styles.mobileFilterModal}
        onClose={() => setIsFilterModalOpen(false)}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          filterButtonRef.current?.focus();
        }}
      >
        <MobileFilterModal
          filters={LISTINGS_FILTERS}
          params={params}
          title="필터"
          onApply={handleMultipleFilterChange}
          onClose={() => setIsFilterModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
