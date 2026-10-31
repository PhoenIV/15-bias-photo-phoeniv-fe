import clsx from "clsx";

import { Button } from "@/components/ui/Button";

import { CardImage, GradeCategory } from "./PhotoCardParts";

import * as styles from "./PhotoCard.css";

/**
 * 다른 사용자가 보낸 교환 요청을 보여주고 승인/거절할 수 있는 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.imageId - Cloudinary public ID
 * @param {string} props.title - 카드 제목
 * @param {"COMMON" | "RARE" | "SUPER_RARE" | "LEGENDARY"} [props.grade="COMMON"] - 카드 등급
 * @param {string} props.category - 카드 카테고리 (예: 풍경)
 * @param {string} props.nickname - 교환을 요청한 사용자 닉네임
 * @param {number} props.price - 구매 포인트 ("4 P 에 구매"로 표시)
 * @param {string} props.message - 교환 요청 메시지 (2줄을 넘으면 말줄임)
 * @param {"received" | "sent"} [props.requestType="received"] - received: 받은 요청(거절/승인), sent: 보낸 요청(취소)
 * @param {() => void} [props.onApprove] - 승인하기 버튼 클릭 콜백
 * @param {() => void} [props.onReject] - 거절하기 버튼 클릭 콜백
 * @param {() => void} [props.onCancel] - 취소하기 클릭 콜백 (sent)
 * @param {string} [props.className] - 외부 주입 클래스
 */
export default function ExchangePhotoCard({
  imageId,
  title,
  grade = "COMMON",
  category,
  nickname,
  price,
  message,
  requestType = "received",
  onApprove,
  onReject,
  onCancel,
  className,
}) {
  return (
    <article className={clsx(styles.cardWrapperRecipe({ type: "exchange" }), className)}>
      <CardImage imageId={imageId} title={title} />

      <div className={styles.contentBox}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.exchangeMeta}>
          <GradeCategory category={category} grade={grade} />
          <div className={styles.exchangeMetaRight}>
            <span className={styles.purchaseText}>
              <span className={styles.purchasePrice}>{price} P</span> 에 구매
            </span>
            <span className={styles.nicknameText}>{nickname}</span>
          </div>
        </div>

        <div className={styles.horizontalDivider} />

        <p className={styles.exchangeText}>{message}</p>

        {/* 버튼 */}
        <div className={styles.actionRow}>
          {requestType === "received" ? (
            <>
              <Button size="responsive" thickness="thin" variant="secondary" onClick={onReject}>
                <span className={styles.hideOnMobile}>거절하기</span>
                <span className={styles.showOnMobile}>거절</span>
              </Button>
              <Button size="responsive" thickness="thin" variant="primary" onClick={onApprove}>
                <span className={styles.hideOnMobile}>승인하기</span>
                <span className={styles.showOnMobile}>승인</span>
              </Button>
            </>
          ) : (
            <Button size="responsive" thickness="thin" variant="secondary" onClick={onCancel}>
              취소하기
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
