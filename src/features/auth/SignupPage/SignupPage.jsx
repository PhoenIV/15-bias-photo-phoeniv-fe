import Link from "next/link";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";

import * as styles from "./SignupPage.css.js";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <div className={styles.signupContainer}>
        <Logo className={styles.logoSize} />
        <div className={styles.formContainer}>
          <Input label="이메일" placeholder="이메일을 입력해주세요" />
          <Input label="닉네임" placeholder="닉네임을 입력해주세요" />
          <PasswordInput
            // error="비밀번호가 일치하지 않습니다."
            label="비밀번호"
            placeholder="8자 이상 입력해주세요"
          />
          <PasswordInput
            // error="비밀번호가 일치하지 않습니다."
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
        </div>
        <Button fullWidth thickness="thin" type="submit" className={styles.buttonText}>
          가입하기
        </Button>
        <div className={styles.navLogin}>
          <div className={styles.text}>이미 최애의포토 회원이신가요?</div>
          <Link href="/login" className={styles.link}>
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
