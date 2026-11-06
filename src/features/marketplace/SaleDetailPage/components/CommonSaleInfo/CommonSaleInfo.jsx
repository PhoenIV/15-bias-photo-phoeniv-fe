import { gradeTextRecipe } from "@/styles/grade.css.js";

import * as styles from "./CommonSaleInfo.css.js";

// 판매자, 구매자 공통 포토카드 정보 영역
export default function CommonSaleInfo({ sale, card }) {
  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <span className={styles.cardInfo}>
          <span styles={gradeTextRecipe({ grade: card.grade })}>{card.grade}</span>| {card.genre}
        </span>
        <span className={styles.sellerInfo}>{sale.seller.nickname}</span>
      </div>
      <div className={styles.secondRow}>
        <p className={styles.descriptionInfo}>{card.description}</p>
      </div>
      <div className={styles.thirdRow}>
        <span>가격</span>
        <span>{sale.price}P</span>
      </div>
      <div className={styles.thirdRow}>
        <span>잔여</span>
        <span>
          {sale.remainingQuantity}/{sale.totalQuantity}
        </span>
      </div>
    </div>
  );
}
