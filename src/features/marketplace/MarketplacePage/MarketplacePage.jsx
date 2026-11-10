"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

import { DEFAULT_CARD_LIMIT } from "@/constants/card";
import { useMe } from "@/hooks/useMe.js";

import { Button } from "@/components/ui/Button";
import { AlertModal } from "@/components/ui/Modal/index.js";

import SalePickModal from "../SalePickModal/SalePickModal.jsx";
import CardContainer from "@/features/marketplace/MarketplacePage/components/CardContainer/CardContainer.jsx";
import PageQueryRow from "@/features/marketplace/MarketplacePage/components/PageQueryRow/PageQueryRow.jsx";
import { SaleForm } from "@/features/sale/SaleForm";

import * as styles from "./MarketplacePage.css.js";

export default function Marketplace() {
  // 키워드, 필터링, 정렬과 관련된 부분
  const [params, setParams] = useState({
    sort: "latest",
    limit: DEFAULT_CARD_LIMIT,
    excludeSoldOut: "include",
  });
  const updateParam = (key, value) => {
    setParams((prev) => {
      return { ...prev, [key]: value || undefined };
    });
  };
  const onSearch = (keyword) => {
    updateParam("keyword", keyword);
  };
  const onFilterChange = (filterKey, value) => {
    if (filterKey === "excludeSoldOut") {
      updateParam(filterKey, value);
      return;
    }

    // 등급 필터, 장르 필터에만 같은 값을 다시 클릭하면 필터가 해제되는 기능
    setParams((prev) => ({ ...prev, [filterKey]: prev[filterKey] === value ? undefined : value }));
  };

  const onSortChange = (sort) => {
    updateParam("sort", sort);
  };
  // 모바일 필터에서 필터 변경을 적용을 한꺼번에 적용할 때
  const onMultipleFilterChange = (filters) => {
    Object.entries(filters).forEach(([key, value]) => {
      updateParam(key, value);
    });
  };

  // 인증과 관련된 부분
  const { isPending, isFetching, refetch: refetchMe } = useMe();
  const router = useRouter();
  const [isNeedLoginModalOpen, setIsNeedLoginModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleClick = async () => {
    const result = await refetchMe();

    if (result.isError) {
      setIsErrorModalOpen(true);
      return;
    }

    if (!result.data) {
      setIsNeedLoginModalOpen(true);
      return;
    }
    setIsSalePickModalOpen(true);
  };

  // 인증된 유저가 판매하기를 눌렀을 때와 관련된 부분
  const [isSalePickModalOpen, setIsSalePickModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // 판매할 카드 (있으면 판매하기 모달 열림)

  return (
    <>
      <div className={styles.page}>
        <div className={styles.topRow}>
          <h1 className={styles.pageTitle}>마켓플레이스</h1>
          <Button
            disabled={isFetching || isPending}
            size="responsive"
            thickness="thin"
            variant="primary"
            className={styles.sellButton}
            onClick={handleClick}
          >
            {isFetching || isPending ? "로딩중..." : "나의 포토카드 판매하기"}
          </Button>
        </div>
        <PageQueryRow
          params={params}
          onFilterChange={onFilterChange}
          onMultipleFilterChange={onMultipleFilterChange}
          onSearch={onSearch}
          onSortChange={onSortChange}
        />
        <CardContainer params={params} />
      </div>
      <AlertModal
        description="잠시 후 다시 시도해주세요."
        isOpen={isErrorModalOpen}
        title="일시적인 오류"
        onClose={() => setIsErrorModalOpen(false)}
        onConfirm={() => setIsErrorModalOpen(false)}
      />
      <AlertModal
        description={"로그인 하시겠습니까?\n다양한 서비스를 편리하게 이용하실 수 있습니다."}
        isOpen={isNeedLoginModalOpen}
        title="로그인이 필요합니다."
        onClose={() => setIsNeedLoginModalOpen(false)}
        onConfirm={() => router.push("/login")}
      />
      <SalePickModal
        isOpen={isSalePickModalOpen}
        onClose={() => setIsSalePickModalOpen(false)}
        onSelect={(card) => {
          setIsSalePickModalOpen(false);
          setSelectedCard(card);
        }}
      />
      {selectedCard && (
        <SaleForm card={selectedCard} isOpen onClose={() => setSelectedCard(null)} />
      )}
    </>
  );
}
