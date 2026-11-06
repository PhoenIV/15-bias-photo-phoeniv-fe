import clsx from "clsx";

import * as styles from "./PageTitle.css.js";

/**
 * 페이지 상단 타이틀 (태블릿·PC 전용)
 * 모바일에서는 헤더(SubPageHeader)에 타이틀이 들어가므로 숨김 처리합니다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 페이지 제목
 * @param {React.ReactNode} [props.action] - 제목 우측에 배치할 요소 (버튼 등)
 * @param {boolean} [props.divider=true] - 하단 구분선 표시 여부
 * @param {string} [props.className] - 외부 주입 커스텀 클래스
 */
export default function PageTitle({ action, children, className, divider = true }) {
  return (
    <div className={clsx(styles.wrapper({ divider }), className)}>
      <h1 className={styles.title}>{children}</h1>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
