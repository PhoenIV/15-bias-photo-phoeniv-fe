"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import * as styles from "./HoloPhotoCard.css";

export default function HoloPhotoCard({ src, alt }) {
  const cardRef = useRef(null);

  const [transformStyle, setTransformStyle] = useState("");
  const [foilStyle, setFoilStyle] = useState({ opacity: 0 });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 자연스러운 입체감을 위해 회전 각도를 15도로 부드럽게 세팅
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setTransformStyle(
      `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`,
    );

    // 파스텔 오로라 홀로그램
    setFoilStyle({
      opacity: 0.65, // 과하지 않고 사진 본연의 색감을 살리는 투명도
      backgroundPosition: `${percentX}% ${percentY}%`,
    });

    // 코팅지 빛 반사
    setGlareStyle({
      opacity: 0.8,
      background: `radial-gradient(
        farthest-corner circle at ${percentX}% ${percentY}%,
        rgba(255, 255, 255, 0.7) 0%,
        rgba(255, 255, 255, 0.25) 35%,
        rgba(0, 0, 0, 0.1) 90%
      )`,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
    setFoilStyle({ opacity: 0 });
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={styles.holoCardWrapper}
      style={{
        transform: transformStyle || undefined,
        transition: transformStyle
          ? "transform 0.1s ease-out"
          : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* 원본 포토카드 이미지 */}
      <Image alt={alt} height={360} src={src} width={240} className={styles.holoCardImage} />

      {/* 줄무늬 없는 부드러운 오로라 홀로그램 코팅 */}
      <div className={styles.holoFoil} style={foilStyle} />

      {/* 마우스를 따라다니는 부드러운 표면 광택 */}
      <div className={styles.holoGlare} style={glareStyle} />
    </div>
  );
}
