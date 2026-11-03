import { useQuery } from "@tanstack/react-query";

import { saleKeys } from "@/services/queryKeys";
import { getSales } from "@/services/saleService";

import { PhotoCard } from "@/components/common/PhotoCard";

import * as styles from "./CardContainer.css";

export default function CardContainer({}) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: saleKeys.lists(),
    queryFn: () => getSales(),
  });
  console.log(data, isPending, isError, error);

  if (isPending) return <p>로딩중...</p>;
  if (isError) return <p>조회에 실패했습니다.</p>;

  const sales = data;

  return (
    <div className={styles.container}>
      {sales.data.map((sale) => (
        <PhotoCard
          key={sale.id}
          category={sale.card.genre}
          grade={sale.card.grade}
          imageId={sale.card.imagePublicId}
          price={sale.price}
          remainCount={sale.remainingQuantity}
          title={sale.card.name}
          totalCount={sale.totalQuantity}
          className={styles.photoCard}
        />
      ))}
    </div>
  );
}
