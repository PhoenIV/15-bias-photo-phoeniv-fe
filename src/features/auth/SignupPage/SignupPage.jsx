"use client";

import Image from "next/image.js";
import Link from "next/link";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { signup } from "@/services/authService.js";
import { userKeys } from "@/services/queryKeys.js";
import { validateSignup } from "@/utils/validators.js";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertModal } from "@/components/ui/Modal/index.js";
import { PasswordInput } from "@/components/ui/PasswordInput";

import * as styles from "./SignupPage.css.js";

export default function SignupPage() {
  const queryClient = useQueryClient();
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
      await queryClient.cancelQueries({ queryKey: userKeys.me() });
      queryClient.setQueryData(userKeys.me(), user);

      router.push("/marketplace");
    } catch (error) {
      setIsLoading(false); //중복요청 방지
      //서버에서 보내는 에러코드가 있는지 판별
      const isFieldErrorCode =
        error.code === "VALIDATION_FAILED" ||
        error.code === "EMAIL_DUPLICATE" ||
        error.code === "NICKNAME_DUPLICATE";

      //fieldErrors가 빈 객체인지 판별
      const hasFieldErrors = Object.keys(error.fieldErrors ?? {}).length !== 0;

      //fieldErrors가 빈 객체여도 error.message를 띄워주기 위해
      if (isFieldErrorCode && hasFieldErrors) {
        setFieldError(error.fieldErrors);
      } else {
        setSignupError(error.status ? error.message : "네트워크 오류가 발생했습니다.");
      }
    }
  };

  //onChange안에 들어갈 함수
  const handleChange =
    (field, setter, linkedFields = []) =>
    (event) => {
      setter(event.target.value);

      //검증 후 재 입력할 때 해당 필드와 연관된 필드의 fieldError를 비워주는 역할
      setFieldError((prev) => {
        const next = { ...prev, [field]: "" };

        linkedFields.forEach((linked) => {
          next[linked] = "";
        });
        return next;
      });
    };

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.signupContainer}>
          <Logo className={styles.logoSize} />
          <div className={styles.formContainer}>
            <Input
              disabled={isLoading}
              error={fieldError.email}
              label="이메일"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleChange("email", setEmail)}
            />
            <Input
              disabled={isLoading}
              error={fieldError.nickname}
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={handleChange("nickname", setNickname)}
            />
            <PasswordInput
              disabled={isLoading}
              error={fieldError.password}
              label="비밀번호"
              placeholder="8자 이상 입력해주세요"
              value={password}
              onChange={handleChange("password", setPassword, ["passwordConfirm"])}
            />
            <PasswordInput
              disabled={isLoading}
              error={fieldError.passwordConfirm}
              label="비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해주세요"
              value={passwordConfirm}
              onChange={handleChange("passwordConfirm", setPasswordConfirm)}
            />
          </div>
          <div className={styles.buttonContainer}>
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
            <Button
              disabled={isLoading}
              fullWidth
              thickness="thin"
              type="submit"
              className={styles.googleBtn}
            >
              {isLoading ? (
                <span role="status">
                  <span aria-hidden="true" className={styles.spinner} />
                  <span className={styles.srOnly}>이동 중</span>
                </span>
              ) : (
                <span className={styles.googleBtnText}>
                  <Image alt="구글 로고" height={22} src="/images/google-logo.svg" width={22} />
                  <span>Google로 시작하기</span>
                </span>
              )}
            </Button>
          </div>
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
