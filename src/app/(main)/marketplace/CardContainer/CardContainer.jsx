import { useEffect, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { saleKeys } from "@/services/queryKeys";
import { getSales } from "@/services/saleService";

import { PhotoCard } from "@/components/common/PhotoCard";

import * as styles from "./CardContainer.css";

export default function CardContainer({ params }) {
  const { data, isPending, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
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
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isPending) return <p>로딩중...</p>;
  if (isError) return <p>조회에 실패했습니다.</p>;

  const sales = data.pages.flatMap((page) => page.data);

  return (
    <>
      <div className={styles.container}>
        {sales.map((sale) => (
          <PhotoCard
            key={sale.id}
            category={sale.card.genre}
            grade={sale.card.grade}
            imageId="cld-sample-5" // {sale.card.imagePublicId}
            price={sale.price}
            remainCount={sale.remainingQuantity}
            title={sale.card.name}
            totalCount={sale.totalQuantity}
          />
        ))}
      </div>

      {hasNextPage && <div ref={loadMoreRef} aria-hidden="true" />}
      {isFetchingNextPage && <p>더 불러오는 중...</p>}
    </>
  );
}
