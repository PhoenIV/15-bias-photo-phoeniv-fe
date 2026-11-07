import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getOffersBySale, updateExchangeStatus } from "@/services/exchangeService";
import { exchangeKeys } from "@/services/queryKeys";

import { ExchangePhotoCard } from "@/components/common/PhotoCard";
import { AlertModal } from "@/components/ui/Modal";

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
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isConfirmRejectModalOpen, setIsConfirmRejectModalOpen] = useState(false);
  const [isConfirmApproveModalOpen, setIsConfirmApproveModalOpen] = useState(false);

  if (isPending) return <p>불러오는 중입니다...</p>;
  if (error) return <p>오류가 발생했습니다.</p>;
  const offers = response.data;
  console.log(offers);
  return (
    <>
      <div>
        <div>
          <h3>교환 제시 목록</h3>
          <div>
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
        </div>
      </div>
      <AlertModal
        description={`[${selectedOffer?.offeredCard.grade}|${selectedOffer?.offeredCard.name}] 카드와의 교환을 거절하시겠습니까?`}
        isOpen={isConfirmRejectModalOpen}
        title="교환 제시 거절"
        onClose={() => setIsConfirmRejectModalOpen(false)}
        onConfirm={() => {
          updateExchangeStatus({ exchangeId: selectedOffer?.id, status: "REJECTED" });
          setIsConfirmRejectModalOpen(false);
        }}
      />
      <AlertModal
        description={`[${selectedOffer?.offeredCard.grade}|${selectedOffer?.offeredCard.name}] 카드와의 교환을 승인하시겠습니까?`}
        isOpen={isConfirmApproveModalOpen}
        title="교환 제시 승인"
        onClose={() => setIsConfirmApproveModalOpen(false)}
        onConfirm={() => {
          updateExchangeStatus({ exchangeId: selectedOffer?.id, status: "APPROVED" });
          setIsConfirmApproveModalOpen(false);
        }}
      />
    </>
  );
}
