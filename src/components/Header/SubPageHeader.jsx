import { Logo } from "@/components/common/Logo";

import DesktopNav from "./DesktopNav";
import { BackButton } from "./HeaderButtons";

import * as styles from "./Header.css";

export default function SubPageHeader({ title, ...navProps }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.mobileSide}>
          <BackButton />
        </div>

        <div className={styles.centerOrLeftArea}>
          <h1 className={styles.mobileTitle}>{title}</h1>
          <Logo className={styles.hideLogoOnMobile} />
        </div>

        <DesktopNav {...navProps} />
      </div>
    </header>
  );
}
