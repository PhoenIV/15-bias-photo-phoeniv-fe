import Link from "next/link";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";

import * as styles from "./LoginPage.css.js";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <Logo className={styles.logoSize} />
        <div className={styles.formContainer}>
          <Input label="이메일" placeholder="이메일을 입력해주세요" />
          <PasswordInput
            error="비밀번호가 일치하지 않습니다."
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <Button fullWidth thickness="thin" type="submit" className={styles.buttonText}>
          로그인
        </Button>
        <div className={styles.navRegister}>
          <div className={styles.text}>최애의 포토가 처음이신가요?</div>
          <Link href="/signup" className={styles.link}>
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
