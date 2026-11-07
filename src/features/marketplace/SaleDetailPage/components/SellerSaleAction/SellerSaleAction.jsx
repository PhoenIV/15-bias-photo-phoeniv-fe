import Image from "next/image";
import { useState } from "react";

import { deleteSale } from "@/services/saleService";
import { gradeTextRecipe } from "@/styles/grade.css";

import { Button } from "@/components/ui/Button";
import { AlertModal, Modal } from "@/components/ui/Modal";

import * as styles from "./SellerSaleAction.css";

// 판매자가 보는 판매글 교환 정보 및 수정, 삭제 버튼 영역
export default function SellerSaleAction({ sale }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <Image alt="교환" height={25} src={"/images/ic-exchange.svg"} width={25} />
          <span>교환 희망 정보</span>
        </div>
        <div className={styles.exchangeInfoContainer}>
          <span className={styles.exchangeInfo}>
            <span className={gradeTextRecipe({ grade: sale.exchangeGrade, type: "inherit" })}>
              {sale.exchangeGrade}
            </span>{" "}
            <span className={styles.divider}>|</span> {sale.exchangeGenre}
          </span>
        </div>
        <div className={styles.exchangeDescription}>
          <p>{sale.exchangeDescription}</p>
        </div>
        <div className={styles.actionButtons}>
          <Button size="responsive" thickness="thick" onClick={() => setIsEditModalOpen(true)}>
            수정하기
          </Button>
          <Button
            size="responsive"
            thickness="thick"
            variant="secondary"
            onClick={() => setIsDeleteConfirmModalOpen(true)}
          >
            판매 내리기
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
      ></Modal>
      <AlertModal
        description="판매글을 삭제하시겠습니까?"
        isOpen={isDeleteConfirmModalOpen}
        title="판매 내리기"
        onClose={() => {
          setIsDeleteConfirmModalOpen(false);
        }}
        onConfirm={() => {
          deleteSale(sale.id);
          setIsDeleteConfirmModalOpen(false);
        }}
      />
    </>
  );
}
