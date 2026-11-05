import { useEffect, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { saleKeys } from "@/services/queryKeys";
import { getSales } from "@/services/saleService";

import { PhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";

import * as styles from "./CardContainer.css";

export default function CardContainer({ params }) {
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
      <div className={styles.wrapper}>
        <p className={styles.informText}>최애가 나를 기다린다!</p>
        <p className={styles.informText}>로딩중...</p>
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
          <PhotoCard
            key={sale.id}
            category={sale.card.genre}
            grade={sale.card.grade}
            imageId={sale.card.imagePublicId}
            isSoldOut={sale.remainingQuantity === 0}
            nickname={sale.seller.nickname}
            price={sale.price}
            remainCount={sale.remainingQuantity}
            title={sale.card.name}
            totalCount={sale.totalQuantity}
          />
        ))}
      </div>

      {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}
      {isFetchingNextPage && <p className={styles.informText}>더 많은 포토카드 불러오는 중...</p>}
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
