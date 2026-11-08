import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { GENRE_LABEL_MAP } from "@/constants/card";
import { useMyGalleryCards } from "@/hooks/useCard";

import { MobileFilterModal } from "@/components/common/MobileFilterModal";
import { PhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";

import { genre, grade } from "../MarketplaceConfig";

import * as styles from "./SalePickModal.css";

export default function SalePickModalChildren({}) {
  const updateParam = (key, value) => {
    setParams((prev) => {
      return { ...prev, [key]: value || undefined };
    });
  };
  const filters = [grade, genre];
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [params, setParams] = useState({ grade: null, genre: null });
  const handleFilterChange = (filterKey, value) => {
    setParams((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey] === value ? undefined : value || undefined,
    }));
  };
  const handleMultipleFilterChange = (filters) => {
    setParams((prev) => {
      const next = { ...prev };
      Object.entries(filters).forEach(([key, value]) => {
        next[key] = value || undefined;
      });
      return next;
    });
  };
  const filterButtonRef = useRef(null);
  const loadMoreRef = useRef(null);

  const onSearch = (keyword) => {
    updateParam("keyword", keyword);
  };

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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    isPending,
    refetch,
  } = useMyGalleryCards(params);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isFetching || isFetchNextPageError) return;

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
  }, [hasNextPage, fetchNextPage, isFetching, isFetchNextPageError]);

  if (isPending) return <p className={styles.bigInformText}>내 보유카드 불러오는 중...</p>;
  if (isError && !data)
    return (
      <>
        <p className={styles.bigInformText}>오류가 발생했습니다.</p>
        <Button size="sm" thickness="thin" onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </>
    );

  const cards = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>마이갤러리</h2>
        <h3 className={styles.modalPageTitle}>나의 포토카드 판매하기</h3>
        <div className={styles.queryRow}>
          <button
            ref={filterButtonRef}
            className={styles.mobileFilterButton}
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Image alt="필터 열기" height={24} src="/images/ic-filter.svg" width={24} />
          </button>
          <SearchInput className={styles.searchInput} onSearch={onSearch} />
          <div className={styles.filters}>
            {filters.map((filter) => (
              <Dropdown
                key={filter.value}
                options={filter.options}
                placeholder={filter.placeholder}
                value={params[filter.value] ?? filter.defaultValue ?? ""}
                className={styles.filter}
                onChange={(value) => {
                  handleFilterChange(filter.value, value);
                }}
              />
            ))}
          </div>
        </div>

        {cards.length === 0 ? (
          <p className={styles.informText}>조회 결과가 없습니다.</p>
        ) : (
          <div className={styles.cardContainer}>
            {cards.map((card) => (
              <PhotoCard
                key={card.userCardId}
                category={GENRE_LABEL_MAP[card.genre] ?? card.genre}
                countLabel="수량"
                grade={card.grade}
                imageId={card.imagePublicId}
                nickname={card.creatorNickname}
                price={card.minPrice}
                remainCount={card.netQuantity}
                title={card.name}
              />
            ))}
          </div>
        )}
        {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}
        {isFetchingNextPage && (
          <p aria-live="polite" role="status" className={styles.informText}>
            더 많은 포토카드 불러오는 중...
          </p>
        )}
        {isFetchNextPageError && (
          <div role="status">
            <p className={styles.informText}>추가 목록 조회에 실패했습니다.</p>
            <Button size="sm" thickness="thin" onClick={() => fetchNextPage()}>
              다시 시도하기
            </Button>
          </div>
        )}
      </div>
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
          filters={filters}
          params={params}
          title="등급·장르 필터"
          onApply={handleMultipleFilterChange}
          onClose={() => setIsFilterModalOpen(false)}
        />
      </Modal>
    </>
  );
}
