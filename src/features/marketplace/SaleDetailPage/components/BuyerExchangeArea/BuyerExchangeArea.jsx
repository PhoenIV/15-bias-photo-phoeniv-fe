import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getOffersBySale, updateExchangeStatus } from "@/services/exchangeService";
import { exchangeKeys } from "@/services/queryKeys";
import { gradeTextRecipe } from "@/styles/grade.css";

import { ExchangePhotoCard } from "@/components/common/PhotoCard";
import { Button } from "@/components/ui/Button";
import { AlertModal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

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
  const toast = useToast();

  const { mutate: cancelOffer, isPending: isCancelPending } = useMutation({
    mutationFn: updateExchangeStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: exchangeKeys.perSale(sale.id, user.id, params),
      });
      toast.success("교환 제시를 취소했습니다.");
      setIsConfirmCancelModalOpen(false);
    },
    onError: () => {
      toast.error("교환 제시 취소에 실패했습니다.");
    },
  });

  if (isPending) return <p>불러오는 중입니다...</p>;
  if (error) return <p>오류가 발생했습니다.</p>;
  const myOffers = response.data;

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
            <p>{sale.exchangeDescription ?? "판매자가 교환 희망 설명을 등록하지 않았습니다."}</p>
          </div>
          <div className={styles.exchangeInfoContainer}>
            <span className={styles.exchangeInfo}>
              <span className={gradeTextRecipe({ grade: sale.exchangeGrade, type: "inherit" })}>
                {sale.exchangeGrade ?? "모든 등급"}
              </span>{" "}
              <span className={styles.divider}>|</span> {sale.exchangeGenre ?? "모든 장르"}
            </span>
          </div>
        </div>
        {myOffers.length === 0 ? null : (
          <div>
            <p className={styles.myOfferTitleRow}>내가 제시한 카드</p>
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
        )}
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
        confirmText={isCancelPending ? "제시 취소 중..." : "확인"}
        description={`[${selectedOffer?.offeredCard.grade}|${selectedOffer?.offeredCard.name}] 카드 교환 제시를 취소하시겠습니까?`}
        isOpen={isConfirmCancelModalOpen}
        title="교환 제시 취소"
        onClose={() => setIsConfirmCancelModalOpen(false)}
        onConfirm={() => {
          if (isCancelPending) return;
          cancelOffer({ exchangeId: selectedOffer?.id, status: "CANCELLED" });
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
