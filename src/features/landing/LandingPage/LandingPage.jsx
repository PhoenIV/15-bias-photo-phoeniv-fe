import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";

import HoloPhotoCard from "@/features/landing/components/HoloPhotoCard.jsx";
import LandingSection from "@/features/landing/components/LandingSection";
import ResponsiveGraphic from "@/features/landing/components/ResponsiveGraphic";

import * as styles from "./LandingPage.css";

export default function LandingPage() {
  return (
    <main className={styles.container}>
      {/* {히어로 배너 섹션} */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          {/* 배경 전용 레이어 */}
          <div className={styles.heroBgLayer} />

          {/* 컨텐츠 레이어 */}
          <div className={styles.heroContent}>
            <div className={styles.heroTextContent}>
              <div className={styles.heroTitleWrapper}>
                <div className={styles.heroLogoWrapper}>
                  <Image alt="최애의 포토" height={26} src="/images/logo.svg" width={140} />
                </div>

                <h1 className={styles.heroTitle}>
                  구하기 어려웠던
                  <br />
                  <span className={styles.highlightText}>나의 최애</span>가 여기에!
                </h1>
              </div>

              <Button
                as={Link}
                href="/marketplace"
                size="responsive"
                thickness="thin"
                variant="primary"
                className={styles.landingCtaButton}
              >
                최애 찾으러 가기
              </Button>
            </div>
            <div className={styles.heroGraphicWrapper}>
              <ResponsiveGraphic
                alt="마켓플레이스 메인 배너"
                srcLg="/images/hero-pc.png"
                srcMd="/images/hero-tablet.png"
                srcSm="/images/hero-mobile.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 포인트 거래 소개 섹션 */}
      <LandingSection
        bgImage="/images/landing1-bg.png"
        subtitle={"내 포토카드를 포인트로 팔고, 원하는 포토카드를\n포인트로 안전하게 교환하세요"}
        title="포인트로 안전하게 거래하세요"
        titleHighlight="안전하게 거래"
      >
        <ResponsiveGraphic
          alt="포인트 거래 예시 화면"
          srcLg="/images/landing1-pc.png"
          srcMd="/images/landing1-tablet.png"
          srcSm="/images/landing1-mobile.png"
        />
      </LandingSection>

      {/* 실시간 알림 기능 소개 섹션 */}
      <LandingSection
        bgImage="/images/landing2-bg.png"
        highlightColor="blue"
        subtitle={"교환 제안부터 판매 완료까지,\n실시간 알림으로 놓치지 마세요"}
        title="알림으로 보다 빨라진 거래"
        titleHighlight="빨라진 거래"
      >
        <ResponsiveGraphic
          alt="실시간 알림 예시 화면"
          srcLg="/images/landing2-pc.png"
          srcMd="/images/landing2-tablet.png"
          srcSm="/images/landing2-mobile.png"
        />
      </LandingSection>

      {/* 랜덤 상자 포인트 소개 섹션 */}
      <LandingSection
        bgImage="/images/landing3-bg.png"
        subtitle={"한 시간마다 주어지는 랜덤 상자를 열고,\n포인트를 획득하세요"}
        title="랜덤 상자로 포인트 받자! 🎉"
        titleHighlight="포인트 받자!"
      >
        <ResponsiveGraphic
          alt="랜덤 상자 포인트 뽑기 화면"
          srcLg="/images/landing3-pc.png"
          srcMd="/images/landing3-tablet.png"
          srcSm="/images/landing3-mobile.png"
        />
      </LandingSection>

      {/* 최하단 CTA 섹션 (홀로그램 포토카드 + 타이틀 + 버튼) */}
      <section className={styles.bottomCtaSection}>
        {/* 마우스 움직임에 반응하는 3D 홀로그램 포토카드 */}
        <HoloPhotoCard alt="최애 포토카드" src="/images/main-photocard.jpg" />
        <h2 className={styles.bottomCtaTitle}>나의 최애를 지금 찾아보세요!</h2>

        <Button
          as={Link}
          href="/marketplace"
          size="responsive"
          thickness="thin"
          variant="primary"
          className={styles.landingCtaButton}
        >
          최애 찾으러 가기
        </Button>
      </section>
    </main>
  );
}
