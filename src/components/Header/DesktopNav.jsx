import Link from "next/link";

import { LogoutButton } from "./HeaderButtons";
import { NotificationPopover } from "./NotificationMenu";
import { ProfileDropdown } from "./ProfileMenu";

import * as styles from "./Header.css";

/**
 * 태블릿 / PC 전용 우측 네비게이션 영역
 *
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 * @param {string} [props.nickname=""] - 사용자 닉네임
 * @param {number} [props.points=0] - 보유 포인트
 */
export default function DesktopNav({ isLoggedIn = false, nickname = "", points = 0 }) {
  return (
    <nav className={styles.desktopNav}>
      {isLoggedIn ? (
        <>
          <span className={styles.pointText}>{points.toLocaleString()} P</span>
          <NotificationPopover isLoggedIn={isLoggedIn} />
          <ProfileDropdown nickname={nickname} points={points} />
          <span className={styles.divider} />
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login" className={styles.authLink}>
            로그인
          </Link>
          <Link href="/signup" className={styles.authLink}>
            회원가입
          </Link>
        </>
      )}
    </nav>
  );
}
