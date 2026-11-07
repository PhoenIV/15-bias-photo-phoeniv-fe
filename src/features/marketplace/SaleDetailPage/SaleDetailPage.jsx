"use client";

import Image from "next/image";

import { useMe } from "@/hooks/useMe";

import { BuyerExchangeArea } from "./components/BuyerExchangeArea";
import { BuyerSaleAction } from "./components/BuyerSaleAction";
import CommonSaleInfo from "./components/CommonSaleInfo/CommonSaleInfo";
import { SellerExchangeArea } from "./components/SellerExchangeArea";
import { SellerSaleAction } from "./components/SellerSaleAction";

import * as styles from "./SaleDetailPage.css";

export default function SaleDetailPage({ sale }) {
  const { card } = sale;
  const { user } = useMe();
  const isSeller = sale.seller.id === user.id;

  return (
    <>
      <h3>{card.name}</h3>
      <div className={styles.container}>
        <Image alt="포토카드 이미지" height={410} src={card.imagePublicId} width={713} />
        <CommonSaleInfo card={card} sale={sale} />
        {isSeller ? <SellerSaleAction sale={sale} /> : <BuyerSaleAction sale={sale} />}
      </div>
      {isSeller ? (
        <SellerExchangeArea sale={sale} user={user} />
      ) : (
        <BuyerExchangeArea sale={sale} user={user} />
      )}
    </>
  );
}
