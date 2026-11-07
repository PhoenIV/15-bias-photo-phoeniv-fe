import { gradeTextRecipe } from "@/styles/grade.css.js";

import * as styles from "./CommonSaleInfo.css.js";

// 판매자, 구매자 공통 포토카드 정보 영역
export default function CommonSaleInfo({ sale, card }) {
  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <span className={styles.cardInfo}>
          <span className={gradeTextRecipe({ grade: card.grade, type: "inherit" })}>
            {card.grade}
          </span>{" "}
          <span className={styles.divider}>|</span> {card.genre}
        </span>
        <span className={styles.sellerInfo}>{sale.seller.nickname}</span>
      </div>
      <div className={styles.secondRow}>
        <p className={styles.descriptionInfo}>{card.description}</p>
      </div>
      <div className={styles.thirdRow}>
        <span className={styles.thirdRowFieldName}>가격</span>
        <span className={styles.thirdRowValue}>{sale.price}P</span>
      </div>
      <div className={styles.thirdRow}>
        <span className={styles.thirdRowFieldName}>잔여</span>
        <span className={styles.thirdRowValue}>
          {sale.remainingQuantity}
          <span className={styles.totalQuantity}> / {sale.totalQuantity}</span>
        </span>
      </div>
    </div>
  );
}
