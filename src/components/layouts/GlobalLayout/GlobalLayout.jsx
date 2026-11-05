import HeaderContainer from "@/components/Header/HeaderContainer";

import { PointDrawModal } from "@/features/point-draw";

export default function GlobalLayout({ children }) {
  return (
    <div>
      <HeaderContainer />
      <PointDrawModal />
      <main>{children}</main>
    </div>
  );
}
