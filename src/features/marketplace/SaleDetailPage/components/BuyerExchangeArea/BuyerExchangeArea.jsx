import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getOffersBySale, updateExchangeStatus } from "@/services/exchangeService";
import { exchangeKeys } from "@/services/queryKeys";

import { ExchangePhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { AlertModal } from "@/components/ui/Modal";

import { ExchangeModal } from "@/features/exchange/ExchangeModal";

// 구매자가 보는 교환 희망 정보
export default function BuyerExchangeArea({ sale, user }) {
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
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);

  if (isPending) return <p>불러오는 중입니다...</p>;
  if (error) return <p>오류가 발생했습니다.</p>;
  const myOffers = response.data;
  console.log(myOffers);
  console.log("selectedOffer:", selectedOffer);

  return (
    <>
      <div>
        <div>
          <span>교환 희망 정보</span>
          <Button
            disabled={sale.remainingQuantity === 0}
            size="responsive"
            thickness="thin"
            onClick={() => setIsExchangeModalOpen(true)}
          >
            포토카드 교환하기
          </Button>
        </div>
        <div>
          <p>{sale.exchangeDescription}</p>
          <span>
            <span>{sale.exchangeGrade}</span>|{sale.exchangeGenre}
          </span>
        </div>
        <div>
          <p>내가 제시한 카드</p>
          <div>
            {myOffers?.map((offer) => (
              <ExchangePhotoCard
                key={offer.id}
                card={offer.offeredCard}
                category={offer.offeredCard.genre}
                grade={offer.offeredCard.grade}
                imageId={offer.offeredCard.imagePublicId}
                message={offer.description}
                nickname={offer.proposer.nickname}
                requestType="sent"
                title={offer.offeredCard.name}
                onCancel={() => {
                  (setSelectedOffer(offer), setIsConfirmCancelModalOpen(true));
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <AlertModal
        description={`[${selectedOffer?.offeredCard.grade}|${selectedOffer?.offeredCard.name}] 카드 교환 제시를 취소하시겠습니까?`}
        isOpen={isConfirmCancelModalOpen}
        title="교환 제시 취소"
        onClose={() => setIsConfirmCancelModalOpen(false)}
        onConfirm={async () => {
          await updateExchangeStatus({ exchangeId: selectedOffer?.id, status: "CANCELLED" });
          await queryClient.invalidateQueries({
            queryKey: exchangeKeys.perSale(sale.id, user.id, params),
          });
          setIsConfirmCancelModalOpen(false);
        }}
      />
      <ExchangeModal
        exchangeGenre={sale.exchangeGenre}
        exchangeGrade={sale.exchangeGrade}
        isOpen={isExchangeModalOpen}
        saleId={sale.id}
        onClose={() => setIsExchangeModalOpen(false)}
      />
    </>
  );
}
