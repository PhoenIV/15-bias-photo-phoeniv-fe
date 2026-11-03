"use client";

import Link from "next/link";
import { useState } from "react";

import { login } from "@/services/authService.js";
import { validateLogin } from "@/utils/validators.js";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertModal } from "@/components/ui/Modal/";
import { PasswordInput } from "@/components/ui/PasswordInput";

import * as styles from "./LoginPage.css.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateLogin({ email, password });
    setFieldError(errors);

    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsLoading(true);
    try {
      const { user } = await login({ email, password });
    } catch (error) {
      if (error.code === "VALIDATION_FAILED") {
        setFieldError(error.fieldErrors);
        //여기 안에 들어가는 error.fieldErrors는 apiFetch가 던지는 에러로서
        //미리 정해진 거임
        //catch에서 꺼낸 error는 리턴문에선 쓸 수 없음 따라서 fieldError를 써야됨
      } else if (error.code === "INVALID_CREDENTIALS") {
        setLoginError(error.message);
      } else {
        setLoginError(error.status ? error.message : "네트워크 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.loginContainer}>
          <Logo className={styles.logoSize} />
          <div className={styles.formContainer}>
            <Input
              error={fieldError.email}
              label="이메일"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setFieldError((prev) => ({ ...prev, email: "" }));
                // 에러 후 다시 입력하면 에러문구 없어짐
              }}
            />
            <PasswordInput
              error={fieldError.password}
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setFieldError((prev) => ({ ...prev, password: "" }));
              }}
            />
          </div>
          <Button
            disabled={isLoading}
            fullWidth
            thickness="thin"
            type="submit"
            className={styles.loginBtn}
          >
            {isLoading ? (
              <span role="status">
                <span aria-hidden="true" className={styles.spinner} />
                <span className={styles.srOnly}>로그인 중</span>
              </span>
            ) : (
              "로그인"
            )}
          </Button>
          <div className={styles.navRegister}>
            <div className={styles.text}>최애의 포토가 처음이신가요?</div>
            <Link href="/signup" className={styles.link}>
              회원가입하기
            </Link>
          </div>
        </div>
      </form>
      {/* 랜덤 포인트 모달 등 커스텀 화면을 만들 때 사용하세요. */}
      <AlertModal
        description={loginError}
        isOpen={Boolean(loginError)}
        title="로그인 실패"
        onClose={() => setLoginError("")}
      />
    </>
  );
}
