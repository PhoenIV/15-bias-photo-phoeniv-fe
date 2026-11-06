import Image from "next/image";
import { useState } from "react";

import { deleteSale } from "@/services/saleService";

import { Button } from "@/components/ui/Button";
import { AlertModal, Modal } from "@/components/ui/Modal";

// 판매자가 보는 판매글 교환 정보 및 수정, 삭제 버튼 영역
export default function SellerSaleAction({ sale }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const onClickEdit = () => {
    setIsEditModalOpen(true);
  }; // 게시글 수정 모달을 여는 함수
  const onConfirmDelete = () => {
    deleteSale(sale.id);
  };
  return (
    <>
      <div>
        <div>
          <Image alt="교환" height={25} src={"/images/ic-exchange.svg"} width={25} />
          <span>교환 희망 정보</span>
        </div>
        <div>
          <span>
            <span>{sale.exchangeGrade}</span>|{sale.exchangeGenre}
          </span>
        </div>
        <div>
          <p>{sale.exchangeDescription}</p>
        </div>
        <div>
          <Button size="responsive" thickness="thin">
            수정하기
          </Button>
          <Button
            size="responsive"
            thickness="thin"
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
        isOpen={isDeleteConfirmModalOpen}
        title="판매글을 삭제합니다."
        onClose={() => {
          setIsDeleteConfirmModalOpen(false);
        }}
      >
        <Button onClick={onConfirmDelete} />
      </AlertModal>
    </>
  );
}
