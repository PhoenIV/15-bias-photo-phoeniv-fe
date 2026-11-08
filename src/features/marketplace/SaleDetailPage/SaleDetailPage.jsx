"use client";

import Image from "next/image";
import Link from "next/link";

import { useMe } from "@/hooks/useMe";
import { useSaleDetail } from "@/hooks/useSale";

import { BuyerExchangeArea } from "./components/BuyerExchangeArea";
import { BuyerSaleAction } from "./components/BuyerSaleAction";
import CommonSaleInfo from "./components/CommonSaleInfo/CommonSaleInfo";
import { SellerExchangeArea } from "./components/SellerExchangeArea";
import { SellerSaleAction } from "./components/SellerSaleAction";

import * as styles from "./SaleDetailPage.css";

export default function SaleDetailPage({ saleId }) {
  const { user } = useMe();
  const { data: sale, isPending, error } = useSaleDetail(saleId);
  if (isPending) return <p>로딩중...</p>;
  if (error) return <p>판매글을 불러오지 못했습니다.</p>;
  const { card } = sale;
  const isSeller = sale.seller.id === user.id;

  return (
    <div className={styles.container}>
      <Link href="/marketplace">
        <h2 className={styles.pageTitle}>마켓플레이스</h2>
      </Link>
      <h3 className={styles.cardTitle}>{card.name}</h3>
      <div className={styles.saleContainer}>
        <div className={styles.imageWrapper}>
          <Image alt="포토카드 이미지" fill src={card.imagePublicId} className={styles.cardImage} />
        </div>
        <div className={styles.saleArea}>
          <CommonSaleInfo card={card} sale={sale} className={styles.commonSaleInfo} />
          {isSeller ? (
            <SellerSaleAction sale={sale} className={styles.saleActionArea} />
          ) : (
            <BuyerSaleAction sale={sale} className={styles.saleActionArea} />
          )}
        </div>
      </div>
      <div className={styles.exchangeContainer}>
        {isSeller ? (
          <SellerExchangeArea sale={sale} user={user} className={styles.exchangeArea} />
        ) : (
          <BuyerExchangeArea sale={sale} user={user} className={styles.exchangeArea} />
        )}
      </div>
    </div>
  );
}
