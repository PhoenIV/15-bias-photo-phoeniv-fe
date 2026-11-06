import Image from "next/image";
import Link from "next/link";

import * as styles from "./Logo.css";

export default function Logo({ className }) {
  return (
    <Link href="/" className={className}>
      <Image
        alt="최애의 포토"
        height={25}
        priority
        src="/images/logo.svg"
        unoptimized
        width={139}
        className={styles.logoImage}
      />
    </Link>
  );
}
