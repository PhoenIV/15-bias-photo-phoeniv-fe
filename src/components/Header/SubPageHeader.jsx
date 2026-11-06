import { Logo } from "@/components/common/Logo";

import DesktopNav from "./DesktopNav";
import { BackButton } from "./HeaderButtons";

import * as styles from "./Header.css";

/**
 * 서브페이지 전용 헤더 컴포넌트 (모바일에서 뒤로가기 버튼과 페이지 타이틀 노출)
 *
 * @param {Object} props
 * @param {string} props.title - 모바일 헤더 중앙에 표시할 서브페이지 타이틀
 * @param {boolean} [props.isLoggedIn=false] - 로그인 여부
 * @param {string} [props.nickname=""] - 사용자 닉네임
 * @param {number} [props.points=0] - 보유 포인트
 */
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
