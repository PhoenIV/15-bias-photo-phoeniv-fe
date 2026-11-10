import Link from "next/link";
import { useEffect, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { DEFAULT_CARD_LIMIT, NEXT_PAGE_SKELETON_COUNT } from "@/constants/card";
import { saleKeys } from "@/services/queryKeys";
import { getSales } from "@/services/saleService";

import { PhotoCard, PhotoCardSkeleton } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";

import { genre } from "@/features/marketplace/MarketplaceConfig";

import * as styles from "./CardContainer.css";

export default function CardContainer({ params }) {
  const genre_label_map = (value) => {
    return genre.options.find((option) => option.value === value)?.label ?? value;
  };

  const {
    data,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    refetch,
  } = useInfiniteQuery({
    queryKey: saleKeys.lists(params),
    queryFn: ({ pageParam }) =>
      getSales({ ...params, cursor: pageParam === null ? undefined : JSON.stringify(pageParam) }),
    initialPageParam: null,
    getNextPageParam: (lastFetch) =>
      lastFetch.pagination.hasNext ? lastFetch.pagination.nextCursor : null,
  });

  // useInfiniteQuery의 응답값 중 data는 { pages, pageParams } 형태의 객체이다.
  // data.pages에는 초기 응답과 추가 요청의 응답이 모두 누적되어 있다.

  const loadMoreRef = useRef(null);

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
      <div aria-busy="true" aria-label="마켓플레이스 목록 로딩 중" className={styles.container}>
        {Array.from({ length: params.limit ?? DEFAULT_CARD_LIMIT }).map((_, index) => (
          <PhotoCardSkeleton key={index} />
        ))}
      </div>
    );
  if (isError && !data)
    return (
      <div className={styles.wrapper}>
        <p className={styles.informText}>앗! 조회에 실패했습니다.</p>
        <Button className={styles.retryButton} onClick={() => refetch()}>
          다시 시도하기
        </Button>
      </div>
    );

  const sales = data.pages.flatMap((page) => page.data);

  if (sales.length === 0)
    return (
      <div className={styles.wrapper}>
        <p className={styles.informText}>조회 결과가 없습니다.</p>
      </div>
    );

  return (
    <>
      <div className={styles.container}>
        {sales.map((sale) => (
          <Link key={sale.id} href={`/sales/${sale.id}`}>
            <PhotoCard
              key={sale.id}
              category={genre_label_map(sale.card.genre)}
              grade={sale.card.grade}
              imageId={sale.card.imagePublicId}
              isSoldOut={sale.remainingQuantity === 0}
              nickname={sale.seller.nickname}
              price={sale.price}
              remainCount={sale.remainingQuantity}
              title={sale.card.name}
              totalCount={sale.totalQuantity}
            />
          </Link>
        ))}
        {isFetchingNextPage &&
          Array.from({ length: NEXT_PAGE_SKELETON_COUNT }).map((_, index) => (
            <PhotoCardSkeleton key={`next-skeleton-${index}`} />
          ))}
      </div>

      {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}
      {isFetchNextPageError && (
        <div className={styles.wrapper}>
          <p className={styles.informText}>추가 목록을 조회에 실패했습니다.</p>
          <Button className={styles.retryButton} onClick={() => fetchNextPage()}>
            다시 시도하기
          </Button>
        </div>
      )}
    </>
  );
}
