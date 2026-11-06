import Image from "next/image";

import clsx from "clsx";

import { CardImage, GradeCategory } from "./PhotoCardParts";

import * as styles from "./PhotoCard.css";

/**
 * 판매/보유 중인 포토카드를 보여주는 일반 카드 컴포넌트
 * (교환 요청 카드는 ExchangePhotoCard를 사용합니다)
 *
 * @param {Object} props
 * @param {string} props.imageId - Cloudinary public ID
 * @param {string} props.title - 카드 제목
 * @param {"COMMON" | "RARE" | "SUPER_RARE" | "LEGENDARY"} [props.grade="COMMON"] - 카드 등급
 * @param {string} props.category - 카드 카테고리 (예: 풍경)
 * @param {string} props.nickname - 판매자(또는 작가) 닉네임
 * @param {number} [props.price] - 가격 (없으면 가격 행을 숨깁니다)
 * @param {string} [props.countLabel="잔여"] - 수량 행의 라벨 (내 카드 목록에서는 "수량")
 * @param {number} [props.remainCount] - 남은 수량 (없으면 수량 행을 숨깁니다)
 * @param {number} [props.totalCount] - 전체 수량 (있으면 "2 / 5" 형태로 표시)
 * @param {"selling" | "exchangePending"} [props.status] - 이미지 좌상단 상태 칩
 * @param {boolean} [props.isSoldOut=false] - 품절 오버레이 표시 여부
 * @param {string} [props.className] - 외부 주입 클래스
 */
export default function PhotoCard({
  imageId,
  title,
  grade = "COMMON",
  category,
  nickname,
  price,
  countLabel = "잔여",
  remainCount,
  totalCount,
  status,
  isSoldOut = false,
  className,
}) {
  // 가격이나 수량 중 하나라도 있을 때만 구분선을 보여줌
  const hasInfo = price !== undefined || remainCount !== undefined;

  return (
    <article className={clsx(styles.cardWrapperRecipe({ type: "standard" }), className)}>
      {/* 썸네일 영역 (이미지, 상태 칩, 품절 오버레이) */}
      <CardImage imageId={imageId} isSoldOut={isSoldOut} status={status} title={title} />

      <div className={styles.contentBox}>
        <h3 className={styles.title}>{title}</h3>

        {/* 메타 줄: 왼쪽은 등급|카테고리, 오른쪽은 닉네임 (space-between) */}
        <div className={styles.metaRow}>
          <GradeCategory category={category} grade={grade} />
          <span className={styles.nicknameText}>{nickname}</span>
        </div>

        {hasInfo && <div className={styles.horizontalDivider} />}

        {/* 가격 행: price가 있을 때만 표시 */}
        {price !== undefined && (
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>가격</span>
            <span className={styles.infoValue}>{price} P</span>
          </div>
        )}

        {/* 수량 : remainCount가 있을 때만 표시 */}
        {remainCount !== undefined && (
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>{countLabel}</span>
            <span className={styles.infoValue}>
              {remainCount}
              {totalCount !== undefined && (
                <span className={styles.totalCount}> / {totalCount}</span>
              )}
            </span>
          </div>
        )}

        {/* 하단 로고(모바일은 CSS에서 display: none) */}
        <div className={styles.logoWrapper}>
          <Image
            alt="최애의포토"
            height={16}
            src="/images/logo.svg"
            width={80}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </article>
  );
}
