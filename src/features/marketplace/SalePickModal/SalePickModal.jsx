import { Modal } from "@/components/ui/Modal";

import SalePickModalChildren from "./SalePickModalChild";

export default function SalePickModal({ isOpen, onClose, onSelect }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SalePickModalChildren onSelect={onSelect} />
    </Modal>
  );
}
