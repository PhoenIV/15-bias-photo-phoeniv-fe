import { Modal } from "@/components/ui/Modal";

import SalePickModalChildren from "./SalePickModalChild";

export default function SalePickModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SalePickModalChildren />
    </Modal>
  );
}
