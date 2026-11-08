"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

import SalePickModal from "../SalePickModal/SalePickModal.jsx";
import CardContainer from "@/features/marketplace/MarketplacePage/components/CardContainer/CardContainer.jsx";
import PageQueryRow from "@/features/marketplace/MarketplacePage/components/PageQueryRow/PageQueryRow.jsx";
import { SaleForm } from "@/features/sale/SaleForm";

import * as styles from "./MarketplacePage.css.js";

export default function Marketplace() {
  const [params, setParams] = useState({ sort: "latest", limit: 15, excludeSoldOut: "include" });
  const updateParam = (key, value) => {
    setParams((prev) => {
      return { ...prev, [key]: value || undefined };
    });
  };

  const [isSalePickModalOpen, setIsSalePickModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // 판매할 카드 (있으면 판매하기 모달 열림)

  const onSearch = (keyword) => {
    updateParam("keyword", keyword);
  };
  const onFilterChange = (filterKey, value) => {
    updateParam(filterKey, value);
  };
  const onSortChange = (sort) => {
    updateParam("sort", sort);
  };

  /**
   * 모바일 버전에서 전달받은 필터를 한꺼번에 반영하기
   * @param {object} filters
   */
  const onMultipleFilterChange = (filters) => {
    Object.entries(filters).forEach(([key, value]) => {
      updateParam(key, value);
    });
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.topRow}>
          <h1 className={styles.pageTitle}>마켓플레이스</h1>
          <Button
            size="responsive"
            thickness="thin"
            variant="primary"
            className={styles.sellButton}
            onClick={() => setIsSalePickModalOpen(true)}
          >
            나의 포토카드 판매하기
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
