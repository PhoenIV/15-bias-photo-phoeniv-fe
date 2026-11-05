"use client";

import Image from "next/image";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usePointDrawStatus } from "@/hooks/usePointDrawStatus";
import { drawPoint } from "@/services/pointDrawService";
import { pointDrawKeys, userKeys } from "@/services/queryKeys";

import { Button } from "@/components/ui/Button";
import { AlertModal, Modal } from "@/components/ui/Modal";

import RemainingTime from "./components/RemainingTime";

import * as styles from "./PointDrawModal.css";

export default function PointDrawModal() {
  const BOXES = [1, 2, 3];

  const [isDismissed, setIsDismissed] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [drawError, setDrawError] = useState("");
  const { canDraw, data } = usePointDrawStatus();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: drawPoint,
    onSuccess: (data) => {
      setResult(data); //-> onSuccess안에서 data로 result에 할당 (골라서 사용)

      //위에서 포인트 뽑기가 끝나고 난 후 아래부터는 유저 상태, 뽑기 여부를 다시 조회한다.
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
      queryClient.invalidateQueries({ queryKey: pointDrawKeys.status() });
    },
    onError: (error) => {
      //429 다중탭, 다른 기기에서 중복 뽑기 막기
      if (error.code === "BOX_COOLDOWN") {
        setIsDismissed(true);
        queryClient.invalidateQueries({ queryKey: pointDrawKeys.status() });
        setDrawError(error.message);
        return;
      }

      //401 포인트 뽑으려다 로그인 끊김
      if (error.status === 401) {
        setIsDismissed(true);
        queryClient.invalidateQueries({ queryKey: userKeys.me() });
        setDrawError(error.message);
        return;
      }

      //그 외 에러: 500
      setDrawError(error.status ? error.message : "네트워크 오류가 발생했습니다.");
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
      <Modal isOpen={isModalOpen} className={styles.modal} onClose={() => setIsDismissed(true)}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              랜덤<div className={styles.highlight}>포인트</div>
            </div>
            <div className={styles.content}>
              1시간마다 돌아오는 기회! <br /> 랜덤 상자 뽑기를 통해 포인트를 획득하세요
            </div>
            <div className={styles.time}>
              <div className={styles.timeText}>다음 기회까지 남은 시간</div>
              <div className={styles.drawTime}>
                <RemainingTime nextAvailableAt={data?.nextAvailableAt} />
              </div>
            </div>
          </div>
          <div className={styles.boxImage}>
            {BOXES.map((number) => {
              const isGray = selectedBox !== null && selectedBox !== number;
              return (
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
                    width={245}
                    className={`${styles.boxImgdetail} ${isGray ? styles.boxGray : ""}`}
                  />
                </button>
              );
            })}
          </div>
          <Button
            disabled={selectedBox === null || isPending}
            fullWidth
            thickness="thin"
            type="button"
            className={selectedBox ? styles.selectBtn : styles.noBtn}
            onClick={handleSubmitBox}
          >
            선택완료
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isResultOpen} className={styles.modal} onClose={() => handleClose()}>
        <div className={styles.container2}>
          <div className={styles.title}>
            랜덤<div className={styles.highlight}>포인트</div>
          </div>
          <div className={styles.pointImage}>
            <Image alt="포인트 이미지" height={191} src={`/images/point.png`} width={246} />
          </div>
          <div className={styles.point}>
            <div className={styles.highlightpoint}>{result?.amount}P</div> 획득!
          </div>
          <div className={styles.time}>
            <div className={styles.timeText}>다음 기회까지 남은 시간</div>
            <div className={styles.drawTime}>
              <RemainingTime nextAvailableAt={result?.nextAvailableAt} />
            </div>
          </div>
        </div>
      </Modal>

      <AlertModal
        description={drawError} //-> error.message가 담김
        isOpen={Boolean(drawError)}
        title="뽑기 실패"
        onClose={() => setDrawError("")}
      />
    </>
  );
}
