import Image from "next/image";
import Link from "next/link";

import * as styles from "./Logo.css";

export default function Logo({ className }) {
  return (
    <Link href="/" className={className}>
      <Image
        alt="최애의 포토"
        height={24}
        priority
        src="/images/logo.svg"
        width={138}
        className={styles.logoImage}
      />
    </Link>
  );
}
