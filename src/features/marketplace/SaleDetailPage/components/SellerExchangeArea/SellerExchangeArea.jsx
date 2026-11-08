import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getOffersBySale, updateExchangeStatus } from "@/services/exchangeService";
import { exchangeKeys, saleKeys } from "@/services/queryKeys";

import { ExchangePhotoCard } from "@/components/common/PhotoCard";
import { AlertModal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

import * as styles from "./SellerExchangeArea.css";

// 판매자가 보는 제시받은 교환카드 목록
export default function SellerExchangeArea({ sale, user }) {
  const params = {};
  const {
    data: response,
    isPending,
    error,
  } = useQuery({
    queryKey: exchangeKeys.perSale(sale.id, user.id, params),
    queryFn: () => getOffersBySale(sale.id, params),
    enabled: Boolean(sale.id && user?.id),
  });
  const queryClient = useQueryClient();
  const toast = useToast();

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isConfirmRejectModalOpen, setIsConfirmRejectModalOpen] = useState(false);
  const [isConfirmApproveModalOpen, setIsConfirmApproveModalOpen] = useState(false);

  const { mutate: reject, isPending: isRejectionPending } = useMutation({
    mutationFn: updateExchangeStatus,
    onSuccess: async () => {
      toast.success("교환 제시를 거절했습니다.");
      setIsConfirmRejectModalOpen(false);
      await queryClient.invalidateQueries({
        queryKey: exchangeKeys.perSale(sale.id, user.id, params),
      });
    },
    onError: () => toast.error("교환 제시 거절에 실패했습니다."),
  });

  const { mutate: approve, isPending: isApprovalPending } = useMutation({
    mutationFn: updateExchangeStatus,
    onSuccess: async () => {
      toast.success("교환 제시를 승인했습니다.");
      setIsConfirmApproveModalOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: exchangeKeys.perSale(sale.id, user.id, params),
        }),
        queryClient.invalidateQueries({
          queryKey: saleKeys.detail(sale.id),
        }),
        queryClient.invalidateQueries({ queryKey: saleKeys.lists() }),
      ]);
    },
    onError: () => toast.error("교환 제시 승인에 실패했습니다."),
  });

  if (isPending) return <p>불러오는 중입니다...</p>;
  if (error) return <p>오류가 발생했습니다.</p>;
  const offers = response.data;

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.areaTitle}>교환 제시 목록</h3>
        {offers.length === 0 ? (
          <p className={styles.informText}>아직 들어온 교환 제시가 없습니다.</p>
        ) : (
          <div className={styles.cardsContainer}>
            {offers.map((offer) => (
              <ExchangePhotoCard
                key={offer.id}
                card={offer.offeredCard}
                category={offer.offeredCard.genre}
                grade={offer.offeredCard.grade}
                imageId={offer.offeredCard.imagePublicId}
                message={offer.description}
                nickname={offer.proposer.nickname}
                requestType="received"
                title={offer.offeredCard.name}
                onApprove={() => {
                  (setIsConfirmApproveModalOpen(true), setSelectedOffer(offer));
                }}
                onReject={() => {
                  (setIsConfirmRejectModalOpen(true), setSelectedOffer(offer));
                }}
              />
            ))}
          </div>
        )}
      </div>
      <AlertModal
        confirmText={isRejectionPending ? "교환 제시 거절 중..." : "확인"}
        description={`[${selectedOffer?.offeredCard.grade}|${selectedOffer?.offeredCard.name}] 카드와의 교환을 거절하시겠습니까?`}
        isOpen={isConfirmRejectModalOpen}
        title="교환 제시 거절"
        onClose={() => setIsConfirmRejectModalOpen(false)}
        onConfirm={() => {
          if (isRejectionPending) return;
          reject({ exchangeId: selectedOffer?.id, status: "REJECTED" });
        }}
      />
      <AlertModal
        confirmText={isApprovalPending ? "교환 제시 승인 중..." : "확인"}
        description={`[${selectedOffer?.offeredCard.grade}|${selectedOffer?.offeredCard.name}] 카드와의 교환을 승인하시겠습니까?`}
        isOpen={isConfirmApproveModalOpen}
        title="교환 제시 승인"
        onClose={() => setIsConfirmApproveModalOpen(false)}
        onConfirm={() => {
          if (isApprovalPending) return;
          approve({ exchangeId: selectedOffer?.id, status: "APPROVED" });
        }}
      />
    </>
  );
}
