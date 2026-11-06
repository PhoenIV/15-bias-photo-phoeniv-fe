import Link from "next/link";

import clsx from "clsx";

import { Logo } from "@/components/common/Logo";

import DesktopNav from "./DesktopNav";
import { MenuButton } from "./HeaderButtons";
import { MobileNotificationModal } from "./NotificationMenu";

import * as styles from "./Header.css";

/**
 * 기본 GNB 헤더 컴포넌트
 *
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 * @param {string} [props.nickname=""] - 사용자 닉네임
 * @param {number} [props.points=0] - 보유 포인트
 */
export default function Header({ isLoggedIn = false, nickname = "", points = 0 }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.mobileSide}>
          <MenuButton isLoggedIn={isLoggedIn} nickname={nickname} points={points} />
        </div>

        <div className={styles.centerOrLeftArea}>
          <Logo />
        </div>

        <div className={clsx(styles.mobileSide, styles.mobileSideEnd)}>
          {isLoggedIn ? (
            <MobileNotificationModal isLoggedIn={isLoggedIn} />
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
