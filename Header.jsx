import Link from "next/link";

import clsx from "clsx";

import { Logo } from "@/components/common/Logo";
import { IconButton } from "@/components/ui/IconButton";

import DesktopNav from "./DesktopNav";
import { MenuButton } from "./HeaderButtons";

import * as styles from "./Header.css";

export default function Header({ isLoggedIn = false, nickname = "", points = 0 }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.mobileSide}>
          <MenuButton />
        </div>

        <div className={styles.centerOrLeftArea}>
          <Logo />
        </div>

        <div className={clsx(styles.mobileSide, styles.mobileSideEnd)}>
          {isLoggedIn ? (
            <IconButton icon="/images/ic-alarm-default.svg" label="알림" />
          ) : (
            <Link href="/login" className={styles.authLink}>
              로그인
            </Link>
          )}
        </div>

        <DesktopNav isLoggedIn={isLoggedIn} nickname={nickname} points={points} />
      </div>
    </header>
  );
}
