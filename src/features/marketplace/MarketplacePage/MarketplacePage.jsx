"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

import CardContainer from "@/features/marketplace/MarketplacePage/components/CardContainer/CardContainer.jsx";
import PageQueryRow from "@/features/marketplace/MarketplacePage/components/PageQueryRow/PageQueryRow.jsx";

import * as styles from "./MarketplacePage.css.js";

export default function Marketplace() {
  const [params, setParmas] = useState({ sort: "latest", limit: 15, excludeSoldOut: "include" });
  const updateParam = (key, value) => {
    setParmas((prev) => {
      return { ...prev, [key]: value || undefined };
    });
  };

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
    <div className={styles.page}>
      <div className={styles.topRow}>
        <h1 className={styles.pageTitle}>마켓플레이스</h1>
        <Button size="responsive" thickness="thin" variant="primary" className={styles.sellButton}>
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
  );
}
