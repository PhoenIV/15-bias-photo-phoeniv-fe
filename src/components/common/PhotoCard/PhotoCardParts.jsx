import Image from "next/image";

import { gradeTextRecipe } from "@/styles/grade.css";

import * as styles from "./PhotoCard.css";

const IMAGE_SIZES = "(max-width: 1023px) 50vw, 33vw";

const STATUS = {
  selling: { label: "판매 중", color: "white" },
  exchangePending: { label: "교환 제시 대기 중", color: "main" },
};

/**
 * 포토카드 상단의 썸네일 영역 (이미지 + 상태 칩 + 품절 오버레이)
 *
 * @param {Object} props
 * @param {string} props.imageId - Cloudinary public ID
 * @param {string} props.title - 이미지 alt 텍스트로 사용되는 카드 제목
 * @param {"selling" | "exchangePending"} [props.status] - 이미지 좌상단에 표시할 상태 칩
 * @param {boolean} [props.isSoldOut=false] - 품절 오버레이 표시 여부
 */
export function CardImage({ imageId, title, status, isSoldOut = false }) {
  // status가 없거나 STATUS에 없는 키면 null
  const statusInfo = status ? STATUS[status] : null;

  return (
    <div className={styles.imageBox}>
      {imageId && (
        <Image alt={title} fill sizes={IMAGE_SIZES} src={imageId} style={{ objectFit: "cover" }} />
      )}

      {/* 상태 배지 */}
      {statusInfo && (
        <div className={styles.statusBadgeOverlay}>
          <span className={styles.statusBadgeRecipe({ color: statusInfo.color })}>
            {statusInfo.label}
          </span>
        </div>
      )}

      {/* 품절 오버레이 */}
      {isSoldOut && (
        <div className={styles.soldOutOverlay}>
          <div className={styles.soldOutImageWrapper}>
            <Image alt="SOLD OUT" fill src="/images/soldout.png" style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 등급과 카테고리를 "COMMON | MD" 형태로 보여주는 조각
 *
 * @param {Object} props
 * @param {"COMMON" | "RARE" | "SUPER_RARE" | "LEGENDARY"} props.grade - 카드 등급
 * @param {string} props.category - 카드 카테고리
 */
export function GradeCategory({ grade, category }) {
  return (
    <div className={styles.metaLeft}>
      <span className={gradeTextRecipe({ grade, type: "card" })}>{grade.replaceAll("_", " ")}</span>
      <span className={styles.divider} />
      <span className={styles.categoryText}>{category}</span>
    </div>
  );
}
