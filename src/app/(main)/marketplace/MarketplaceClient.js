"use client";

import { Button } from "@/components/ui/Button";

import CardContainer from "./CardContainer/CardContainer.jsx";
import PageQueryRow from "./PageQueryRow/PageQueryRow.jsx";

import * as styles from "./page.css.js";

export default function MarketplaceClient() {
  return (
    <>
      <div className={styles.topRow}>
        <h1 className={styles.pageTitle}>마켓플레이스</h1>
        <Button size="lg" thickness="thin" className={styles.createSaleButton}>
          나의 포토카드 판매하기
        </Button>
      </div>
      <hr />
      <PageQueryRow />
      <CardContainer />
    </>
  );
}
