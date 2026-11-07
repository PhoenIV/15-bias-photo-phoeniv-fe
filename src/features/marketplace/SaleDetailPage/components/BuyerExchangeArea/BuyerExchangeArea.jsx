import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getOffersBySale, updateExchangeStatus } from "@/services/exchangeService";
import { exchangeKeys } from "@/services/queryKeys";
import { gradeTextRecipe } from "@/styles/grade.css";

import { ExchangePhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { AlertModal } from "@/components/ui/Modal";

import { ExchangeModal } from "@/features/exchange/ExchangeModal";

import * as styles from "./BuyerExchangeArea.css";

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
        <div className={styles.areaTitleRow}>
          <span>교환 희망 정보</span>
          <Button
            disabled={sale.remainingQuantity === 0}
            size="responsive"
            thickness="thin"
            className={styles.exchangeButtonInTitleRow}
            onClick={() => setIsExchangeModalOpen(true)}
          >
            포토카드 교환하기
          </Button>
        </div>
        <div>
          <div className={styles.exchangeDescription}>
            <p>{sale.exchangeDescription}</p>
          </div>
          <div className={styles.exchangeInfoContainer}>
            <span className={styles.exchangeInfo}>
              <span className={gradeTextRecipe({ grade: sale.exchangeGrade, type: "inherit" })}>
                {sale.exchangeGrade}
              </span>{" "}
              <span className={styles.divider}>|</span> {sale.exchangeGenre}
            </span>
          </div>
        </div>
        <div>
          <p>내가 제시한 카드</p>
          <div className={styles.cardContainer}>
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
        <Button
          disabled={sale.remainingQuantity === 0}
          size="responsive"
          thickness="thin"
          className={styles.exchangeButtonBelowMyOffers}
          onClick={() => setIsExchangeModalOpen(true)}
        >
          포토카드 교환하기
        </Button>
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
