"use client";

import { useState } from "react";

import { usePointDrawStatus } from "@/hooks/usePointDrawStatus";

import { Modal } from "@/components/ui/Modal";

export default function PointDrawModal() {
  const [isDismissed, setIsDismissed] = useState(false);
  const { canDraw } = usePointDrawStatus();

  const isModalOpen = canDraw && !isDismissed;

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsDismissed(true)}>
        모달이 뜹니까?
      </Modal>
    </>
  );
}
