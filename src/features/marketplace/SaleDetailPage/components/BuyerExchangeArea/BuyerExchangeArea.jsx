import { Button } from "@/components/ui/Button";

// 구매자가 보는 교환 희망 정보
export default function BuyerExchangeArea({ sale }) {
  return (
    <div>
      <div>
        <span>교환 희망 정보</span>
        <Button size="responsive" thickness="thin">
          포토카드 교환하기
        </Button>
      </div>
      <div>
        <p>{sale.exchangeDescription}</p>
        <span>
          <span>{sale.exchangeGrade}</span>|{sale.exchangeGenre}
        </span>
      </div>
    </div>
  );
}
