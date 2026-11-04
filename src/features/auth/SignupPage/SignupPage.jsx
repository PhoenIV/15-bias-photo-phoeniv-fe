"use client";

import Link from "next/link";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

import { signup } from "@/services/authService.js";
import { validateSignup } from "@/utils/validators.js";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertModal } from "@/components/ui/Modal/index.js";
import { PasswordInput } from "@/components/ui/PasswordInput";

import * as styles from "./SignupPage.css.js";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const [signupError, setSignupError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    //서버와 통신 전에 입력값 검증을 미리 해서 errors 객체에 값이 있으면 서버로 요청을 보내지 않고
    //화면(FE)에서 바로 에러를 띄운다
    const errors = validateSignup({ email, nickname, password, passwordConfirm });
    setFieldError(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsLoading(true);
    try {
      const { user } = await signup({ email, nickname, password, passwordConfirm });
      router.push("/marketplace");
    } catch (error) {
      if (
        error.code === "VALIDATION_FAILED" ||
        error.code === "EMAIL_DUPLICATE" ||
        error.code === "NICKNAME_DUPLICATE"
      ) {
        setFieldError(error.fieldErrors);
      } else {
        setSignupError(error.status ? error.message : "네트워크 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //onChange안에 들어갈 함수
  const handleChange = (field, setter) => (event) => {
    //입력값을 상태로 저장
    setter(event.target.value);

    //검증 후 재 입력할 때 fieldError를 비워주는 역할
    setFieldError((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.signupContainer}>
          <Logo className={styles.logoSize} />
          <div className={styles.formContainer}>
            <Input
              error={fieldError.email}
              label="이메일"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleChange("email", setEmail)}
            />
            <Input
              error={fieldError.nickname}
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={handleChange("nickname", setNickname)}
            />
            <PasswordInput
              error={fieldError.password}
              label="비밀번호"
              placeholder="8자 이상 입력해주세요"
              value={password}
              onChange={handleChange("password", setPassword)}
            />
            <PasswordInput
              error={fieldError.passwordConfirm}
              label="비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해주세요"
              value={passwordConfirm}
              onChange={handleChange("passwordConfirm", setPasswordConfirm)}
            />
          </div>
          <Button
            disabled={isLoading}
            fullWidth
            thickness="thin"
            type="submit"
            className={styles.buttonText}
          >
            {isLoading ? (
              <span role="status">
                <span aria-hidden="true" className={styles.spinner} />
                <span className={styles.srOnly}>회원가입 중</span>
              </span>
            ) : (
              "가입하기"
            )}
          </Button>
          <div className={styles.navLogin}>
            <div className={styles.text}>이미 최애의포토 회원이신가요?</div>
            <Link href="/login" className={styles.link}>
              로그인하기
            </Link>
          </div>
        </div>
      </form>
      <AlertModal
        description={signupError}
        isOpen={Boolean(signupError)}
        title="회원가입 실패"
        onClose={() => setSignupError("")}
      />
    </>
  );
}
