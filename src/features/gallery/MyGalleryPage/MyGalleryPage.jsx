"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { clsx } from "clsx";

import { CARD_GENRE_FILTER, GENRE_LABEL_MAP, GRADE_OPTIONS } from "@/constants/card";
import { useCardQuota, useMyGalleryCards, useMyGallerySummary } from "@/hooks/useCard";
import { useMe } from "@/hooks/useMe";

import { MobileFilterModal } from "@/components/common/MobileFilterModal";
import { PhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Dropdown } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";

import * as styles from "./MyGalleryPage.css";

const DEFAULT_LIMIT = 15;

const DEFAULT_GRADE_COUNTS = {
  COMMON: 0,
  LEGENDARY: 0,
  RARE: 0,
  SUPER_RARE: 0,
};

const GALLERY_FILTERS = [CARD_GENRE_FILTER];

export default function MyGalleryPage() {
  const router = useRouter();
  const { user } = useMe();
  const { data: quota, isPending: isQuotaPending } = useCardQuota();
  const { data: summary } = useMyGallerySummary();

  const [params, setParams] = useState({ limit: DEFAULT_LIMIT });
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
  } = useMyGalleryCards(params);

  const hasActiveFilter = Boolean(params.keyword || params.grade || params.genre);

  // 검색·필터와 무관하게 전체 보유 카드의 통계를 안전하게 유지
  const totalCount = summary?.totalCount ?? 0;
  const gradeCounts = summary?.gradeCounts ?? DEFAULT_GRADE_COUNTS;

  // TODO: 마켓플레이스와 중복되는 743px 브레이크포인트 리스너는 공통 커스텀 훅으로 통합 리팩터링 필요
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 743) {
        setIsFilterModalOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const remainingQuota = quota?.remainingQuota ?? 0;
  const maxQuota = quota?.maxQuota ?? 3;
  const isCreateDisabled = isQuotaPending || remainingQuota <= 0;

  const cards = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className={styles.page}>
      {/* 상단 타이틀 및 포토카드 생성하기 버튼 (모바일에서는 하단 고정 플로팅 버튼) */}
      <div className={styles.topRow}>
        <h1 className={styles.pageTitle}>마이갤러리</h1>
        <Button
          disabled={isCreateDisabled}
          size="responsive"
          thickness="thin"
          variant="primary"
          className={styles.createButton}
          onClick={() => router.push("/my-gallery/create")}
        >
          {`포토카드 생성하기 (${remainingQuota}/${maxQuota})`}
        </Button>
      </div>

      {/* 보유 포토카드 요약 및 등급별 Chip */}
      <section className={styles.summarySection}>
        <div>
          <span className={styles.summaryTitle}>
            {user?.nickname ? `${user.nickname}님이 보유한 포토카드` : "보유한 포토카드"}
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

      {/* 검색창 및 등급·장르 필터 */}
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
          {GALLERY_FILTERS.map((filter) => (
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
        <div aria-live="polite" role="status" className={styles.statusWrapper}>
          <p className={styles.informText}>최애가 나를 기다린다!</p>
          <p className={styles.informText}>로딩중...</p>
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
      ) : cards.length === 0 ? (
        <div role="status" className={styles.statusWrapper}>
          <p className={styles.informText}>
            {hasActiveFilter ? "조회 결과가 없습니다." : "보유한 포토카드가 없습니다."}
          </p>
        </div>
      ) : (
        <>
          <div className={styles.cardGrid}>
            {cards.map((card) => (
              <PhotoCard
                key={card.userCardId}
                category={GENRE_LABEL_MAP[card.genre] ?? card.genre}
                countLabel="수량"
                grade={card.grade}
                imageId={card.imagePublicId}
                nickname={card.creatorNickname}
                price={card.minPrice}
                remainCount={card.totalQuantity}
                title={card.name}
              />
            ))}
          </div>

          {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}
          {isFetchingNextPage && (
            <p aria-live="polite" role="status" className={styles.informText}>
              더 많은 포토카드 불러오는 중...
            </p>
          )}
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
          filters={GALLERY_FILTERS}
          params={params}
          title="장르 필터"
          onApply={handleMultipleFilterChange}
          onClose={() => setIsFilterModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
