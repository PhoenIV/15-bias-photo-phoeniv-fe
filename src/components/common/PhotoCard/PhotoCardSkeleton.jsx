import clsx from "clsx";

import * as cardStyles from "./PhotoCard.css";
import * as styles from "./PhotoCardSkeleton.css";

/**
 * 포토카드 로딩 중에 표시할 스켈레톤 카드 컴포넌트
 * PhotoCard와 동일한 패딩, 비율, 레이아웃을 유지합니다.
 * 쉬머(빛 흐름) 애니메이션과 둥근 알약 텍스트 바가 적용되어 있습니다.
 *
 * @param {Object} props
 * @param {string} [props.className] - 외부 주입 클래스
 */
export default function PhotoCardSkeleton({ className }) {
  return (
    <article
      aria-hidden="true"
      className={clsx(cardStyles.cardWrapperRecipe({ type: "standard" }), className)}
    >
      {/* 썸네일 영역 */}
      <div className={styles.imageBox} />

      {/* 정보 영역 */}
      <div className={cardStyles.contentBox}>
        {/* 제목 */}
        <div className={styles.titleBar} />

        {/* 등급 / 카테고리 / 닉네임 */}
        <div className={styles.metaRow}>
          <div className={styles.metaLeftBar} />
          <div className={styles.metaRightBar} />
        </div>

        <div className={styles.divider} />

        {/* 가격 행 */}
        <div className={styles.infoRow}>
          <div className={styles.infoLabelBar} />
          <div className={styles.infoValueBar} />
        </div>

        {/* 수량 행 */}
        <div className={styles.infoRow}>
          <div className={styles.infoLabelBar} />
          <div className={styles.infoValueBar} />
        </div>

        {/* 하단 로고 (태블릿/PC) */}
        <div className={styles.logo} />
      </div>
    </article>
  );
}
