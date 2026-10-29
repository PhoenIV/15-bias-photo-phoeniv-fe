import Image from "next/image";

import * as styles from "./IconButton.css";

export default function IconButton({ label, icon, size = 22, onClick }) {
  return (
    <button aria-label={label} type="button" className={styles.iconBtn} onClick={onClick}>
      <Image alt={label} height={size} src={icon} unoptimized width={size} />
    </button>
  );
}
