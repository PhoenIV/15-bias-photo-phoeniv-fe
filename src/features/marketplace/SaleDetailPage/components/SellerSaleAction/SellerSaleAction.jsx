import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saleKeys } from "@/services/queryKeys";
import { deleteSale } from "@/services/saleService";
import { gradeTextRecipe } from "@/styles/grade.css";

import { Button } from "@/components/ui/Button";
import { AlertModal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

import { SaleEditModal } from "@/features/sale/SaleEditModal";

import * as styles from "./SellerSaleAction.css";

// 판매자가 보는 판매글 교환 정보 및 수정, 삭제 버튼 영역
export default function SellerSaleAction({ sale }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteSale,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: saleKeys.lists() });
      toast.success("판매글을 내렸습니다.");
      setIsDeleteConfirmModalOpen(false);
      router.push("/marketplace");
    },
    onError: () => {
      toast.error("판매글 내리기에 실패했습니다.");
    },
  });

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
      {/* 열 때마다 지금 판매글 값으로 새로 채우려고 열렸을 때만 그림 */}
      {isEditModalOpen && (
        <SaleEditModal isOpen sale={sale} onClose={() => setIsEditModalOpen(false)} />
      )}
      <AlertModal
        confirmText={isPending ? "판매글 내리는 중..." : "확인"}
        description="판매글을 삭제하시겠습니까?"
        isOpen={isDeleteConfirmModalOpen}
        title="판매 내리기"
        onClose={() => {
          setIsDeleteConfirmModalOpen(false);
        }}
        onConfirm={() => {
          if (isPending) return;
          mutate(sale.id);
        }}
      />
    </>
  );
}
