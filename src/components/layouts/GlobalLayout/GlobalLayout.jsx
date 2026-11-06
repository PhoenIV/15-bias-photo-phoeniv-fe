import { HeaderContainer } from "@/components/Header";

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
