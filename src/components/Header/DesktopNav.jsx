import Link from "next/link";

import { IconButton } from "@/components/common/IconButton";

import { LogoutButton } from "./HeaderButtons";

import * as styles from "./Header.css";

export default function DesktopNav({ isLoggedIn, nickname, points }) {
  return (
    <nav className={styles.desktopNav}>
      {isLoggedIn ? (
        <>
          <span className={styles.pointText}>{points.toLocaleString()} P</span>
          <IconButton icon="/images/ic-alarm-default.svg" label="알림" size={24} />
          <span className={styles.nicknameText}>{nickname}</span>
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
