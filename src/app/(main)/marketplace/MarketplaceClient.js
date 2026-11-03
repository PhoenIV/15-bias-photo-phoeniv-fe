"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

import CardContainer from "./CardContainer/CardContainer.jsx";
import PageQueryRow from "./PageQueryRow/PageQueryRow.jsx";

import * as styles from "./page.css.js";

export default function MarketplaceClient() {
  const [params, setParmas] = useState({ sort: "latest", limit: 15, excludeSoldOut: "include" });
  const updateParam = (key, value) => {
    setParmas((prev) => {
      return { ...prev, [key]: value || undefined };
    });
  };

  const onSearch = (keyword) => {
    updateParam("keyword", keyword);
  };
  const onFilterChange = (key, value) => {
    updateParam(key, value);
  };
  const onSortChange = (sort) => {
    updateParam("sort", sort);
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
        onFilterChange={onFilterChange}
        onSearch={onSearch}
        onSortChange={onSortChange}
      />
      <CardContainer params={params} />
    </div>
  );
}
