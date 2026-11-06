"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { GENRE_OPTIONS, GRADE_OPTIONS, MAX_TOTAL_QUANTITY } from "@/constants/card";
import { useCardQuota, useCreatePhotoCard } from "@/hooks/useCard";

import { PageTitle } from "@/components/common/PageTitle";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { FileInput } from "@/components/ui/FileInput";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";

import * as styles from "./CreatePhotoCardPage.css";

const DEFAULT_VALUES = {
  description: "",
  genre: "",
  grade: "",
  image: null,
  minPrice: "",
  name: "",
  totalCreated: "",
};

const MAX_PRICE = 100000;
const NUMBER_PATTERN = { message: "숫자만 입력해 주세요.", value: /^\d+$/ };

export default function CreatePhotoCardPage() {
  const router = useRouter();
  const toast = useToast();
  const hasAlertedQuotaRef = useRef(false);
  const timerRef = useRef(null);
  const [isSuccessRedirecting, setIsSuccessRedirecting] = useState(false);

  const { data: quota } = useCardQuota();
  const { isPending, mutate } = useCreatePhotoCard();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm({ defaultValues: DEFAULT_VALUES, mode: "onChange" });

  const isQuotaExhausted = quota?.remainingQuota === 0;

  // 컴포넌트 언마운트 시 예약된 이동 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // 진입 시 생성 한도를 이미 모두 소진한 경우에만 토스트 안내
  useEffect(() => {
    if (isQuotaExhausted && !hasAlertedQuotaRef.current && !isSuccessRedirecting) {
      toast.warning("이번달 모든 생성 기회를 소진했어요");
      hasAlertedQuotaRef.current = true;
    }
  }, [isQuotaExhausted, isSuccessRedirecting, toast]);

  const onSubmit = useCallback(
    (values) => {
      // 중복 제출 및 성공 후 이동 중 차단
      if (isPending || isSuccessRedirecting) return;

      // 한도 초과 시 제출 차단
      if (isQuotaExhausted) {
        toast.warning("이번달 모든 생성 기회를 소진했어요");
        return;
      }

      const payload = { ...values };
      // 설명은 비어 있으면 전송 제외
      if (!payload.description.trim()) delete payload.description;

      mutate(payload, {
        onError: (error) => {
          // 한도 초과 에러 시 중복 토스트 방지를 위해 플래그 설정
          if (error.code === "CARD_QUOTA_EXCEEDED") {
            hasAlertedQuotaRef.current = true;
            toast.warning("이번달 모든 생성 기회를 소진했어요");
            return;
          }

          // 서버 필드 유효성 검증 에러 표시
          const fieldErrors = error.fieldErrors ?? {};
          Object.entries(fieldErrors).forEach(([name, message]) => {
            if (name in DEFAULT_VALUES) {
              setError(name, { message: [message].flat()[0], type: "server" });
            }
          });

          // 실패 시 토스트
          toast.error("포토카드 생성에 실패했습니다.");
        },
        onSuccess: () => {
          setIsSuccessRedirecting(true);
          toast.success("포토카드가 성공적으로 생성되었습니다.");
          // 토스트 표시 이후 마이갤러리로 이동
          timerRef.current = setTimeout(() => {
            router.push("/my-gallery");
          }, 1200);
        },
      });
    },
    [isPending, isSuccessRedirecting, isQuotaExhausted, toast, mutate, setError, router],
  );

  return (
    <div className={styles.page}>
      <PageTitle>포토카드 생성</PageTitle>

      <form
        noValidate
        className={styles.form}
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <Input
          error={errors.name?.message}
          label="포토카드 이름"
          placeholder="포토카드 이름을 입력해 주세요"
          variant="display"
          {...register("name", {
            maxLength: { message: "포토카드 이름은 최대 30자까지 가능합니다.", value: 30 },
            required: "포토카드 이름을 입력해 주세요.",
            validate: (v) => v.trim().length > 0 || "포토카드 이름을 입력해 주세요.",
          })}
        />

        <Controller
          name="grade"
          control={control}
          render={({ field, fieldState }) => (
            <Dropdown
              error={fieldState.error?.message}
              label="등급"
              options={GRADE_OPTIONS}
              placeholder="등급을 선택해 주세요"
              value={field.value}
              className={styles.dropdown}
              onChange={field.onChange}
            />
          )}
          rules={{ required: "등급을 선택해 주세요." }}
        />

        <Controller
          name="genre"
          control={control}
          render={({ field, fieldState }) => (
            <Dropdown
              error={fieldState.error?.message}
              label="장르"
              options={GENRE_OPTIONS}
              placeholder="장르를 선택해 주세요"
              value={field.value}
              className={styles.dropdown}
              onChange={field.onChange}
            />
          )}
          rules={{ required: "장르를 선택해 주세요." }}
        />

        <Input
          error={errors.minPrice?.message}
          inputMode="numeric"
          label="가격"
          placeholder="가격을 입력해 주세요"
          variant="display"
          {...register("minPrice", {
            max: {
              message: `가격은 ${MAX_PRICE.toLocaleString()}원 이하여야 합니다.`,
              value: MAX_PRICE,
            },
            pattern: NUMBER_PATTERN,
            required: "가격을 입력해 주세요.",
          })}
        />

        <Input
          error={errors.totalCreated?.message}
          inputMode="numeric"
          label="총 발행량"
          placeholder="총 발행량을 입력해 주세요"
          variant="display"
          {...register("totalCreated", {
            max: {
              message: `총 발행량은 ${MAX_TOTAL_QUANTITY}장 이하로 선택 가능합니다.`,
              value: MAX_TOTAL_QUANTITY,
            },
            min: { message: "최소 1장 이상 발행해야 합니다.", value: 1 },
            pattern: NUMBER_PATTERN,
            required: "총 발행량을 입력해 주세요.",
          })}
        />

        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <FileInput
              error={fieldState.error?.message}
              label="사진 업로드"
              placeholder="사진 업로드"
              onChange={field.onChange}
            />
          )}
          rules={{ required: "사진을 업로드해 주세요." }}
        />

        <Textarea
          error={errors.description?.message}
          label="포토카드 설명"
          placeholder="카드 설명을 입력해 주세요"
          {...register("description", {
            maxLength: { message: "상세 설명은 최대 100자까지 입력할 수 있습니다.", value: 100 },
          })}
        />

        <div>
          <Button
            disabled={!isValid || isPending || isQuotaExhausted || isSuccessRedirecting}
            fullWidth
            size="md"
            thickness="thin"
            type="submit"
            className={styles.submitButton}
          >
            생성하기
          </Button>
        </div>
      </form>
    </div>
  );
}
