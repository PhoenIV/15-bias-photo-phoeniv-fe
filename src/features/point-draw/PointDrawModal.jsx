"use client";

import Image from "next/image";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usePointDrawStatus } from "@/hooks/usePointDrawStatus";
import { drawPoint } from "@/services/pointDrawService";
import { pointDrawKeys, userKeys } from "@/services/queryKeys";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

import * as styles from "./PointDrawModal.css";

export default function PointDrawModal() {
  const BOXES = [1, 2, 3];

  const [isDismissed, setIsDismissed] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const { canDraw } = usePointDrawStatus();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: drawPoint,
    onSuccess: (data) => {
      setResult(data.amount); //-> onSuccess안에서 포인트 상태값을 amount로 할당

      //위에서 포인트 뽑기가 끝나고 난 후 아래부터는 유저 상태, 뽑기 여부를 다시 조회한다.
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      queryClient.invalidateQueries({ queryKey: pointDrawKeys.status() });
    },
  });

  //1번째 모달 오픈 조건
  const isModalOpen = canDraw && !isDismissed && result === null;

  //2번 째 모달 오픈 조건
  const isResultOpen = result !== null;
  //2번 째 모달 닫는 함수
  const handleClose = () => {
    setResult(null);
    setIsDismissed(true);
  };

  const handleSubmitBox = () => {
    if (selectedBox === null) return;
    mutate(selectedBox);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsDismissed(true)}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              랜덤<span>포인트</span>
            </div>
            <div className={styles.content}>
              1시간마다 돌아오는 기회! 랜덤 상자 뽑기를 통해 포인트를 획득하세요
            </div>
            <div className={styles.time}>
              <div className={styles.timeText}>다음 기회까지 남은 시간</div>
              <div className={styles.drawTime}>59분</div>
            </div>
          </div>
          <div className={styles.boxImage}>
            {BOXES.map((number) => (
              <button
                key={number}
                aria-pressed={selectedBox === number}
                type="button"
                onClick={() => setSelectedBox(number)}
              >
                <Image
                  alt={`랜덤박스-${number}`}
                  height={191}
                  src={`/images/random-box-${number}.png`}
                  width={246}
                />
              </button>
            ))}
          </div>
          <Button
            disabled={selectedBox === null || isPending}
            type="button"
            className={styles.selectBtn}
            onClick={handleSubmitBox}
          >
            선택완료
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isResultOpen} onClose={() => handleClose()}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              랜덤<span>포인트</span>
            </div>
            <div className={styles.pointImage}>
              <Image alt="포인트 이미지" height={191} src={`/images/point.png`} width={246} />
            </div>
            <div className={styles.time}>
              <div className={styles.timeText}>다음 기회까지 남은 시간</div>
              <div className={styles.drawTime}>59분</div>
            </div>
          </div>

          <Button
            disabled={selectedBox === null || isPending}
            type="button"
            className={styles.selectBtn}
            onClick={handleSubmitBox}
          >
            선택완료
          </Button>
        </div>
        포인트 {result}
      </Modal>
    </>
  );
}
