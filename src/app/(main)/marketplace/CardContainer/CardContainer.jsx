import { getSales } from "@/services/saleService";

import { PhotoCard } from "@/components/common/PhotoCard";

import * as styles from "./CardContainer.css";

export default async function CardContainer() {
  const sales = await getSales({ excludeSoldOut: "include" });

  return (
    <div className={styles.container}>
      {sales.data.map((sale) => (
        <PhotoCard
          key={sale.id}
          category={sale.card.genre}
          grade={sale.card.grade}
          imageId="cld-sample-5"
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
