import { gradeTextRecipe } from "@/styles/grade.css.js";
import { formatNumber } from "@/utils/formatNumber";

import { genre } from "@/features/marketplace/MarketplaceConfig.js";

import * as styles from "./CommonSaleInfo.css.js";

// 판매자, 구매자 공통 포토카드 정보 영역
export default function CommonSaleInfo({ sale, card }) {
  const genre_label_map = (value) => {
    return genre.options.find((option) => option.value === value)?.label ?? value;
  };

  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <span className={styles.cardInfo}>
          <span className={gradeTextRecipe({ grade: card.grade, type: "inherit" })}>
            {card.grade}
          </span>{" "}
          <span className={styles.divider}>|</span> {genre_label_map(card.genre)}
        </span>
        <span className={styles.sellerInfo}>{sale.seller.nickname}</span>
      </div>
      <div className={styles.secondRow}>
        <p className={styles.descriptionInfo}>{card.description}</p>
      </div>
      <div className={styles.thirdRow}>
        <span className={styles.thirdRowFieldName}>가격</span>
        <span className={styles.thirdRowValue}>{formatNumber(sale.price)}P</span>
      </div>
      <div className={styles.thirdRow}>
        <span className={styles.thirdRowFieldName}>잔여</span>
        <span className={styles.thirdRowValue}>
          {formatNumber(sale.remainingQuantity)}
          <span className={styles.totalQuantity}> / {formatNumber(sale.totalQuantity)}</span>
        </span>
      </div>
    </div>
  );
}
