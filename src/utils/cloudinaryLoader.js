export default function cloudinaryLoader({ src, width, quality }) {
  // 로컬 이미지(public/)는 별도 변환 서버가 없어 쿼리가 의미 없으므로 그대로 반환.
  // 용량 최적화는 파일 자체를 WebP로 변환해서 처리한다.
  if (src.startsWith("/")) {
    return src;
  }

  // 그 외(Cloudinary)
  // quality가 100이면 화질 최우선(best), 그 외 기본 auto
  // 포토카드 상세 등 좋은 화질이 필요한 경우 100으로 설정함
  const qOption = quality === 100 ? "auto:best" : "auto";

  const params = ["f_auto", "c_limit", `w_${width}`, `q_${qOption}`];

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(",")}/${src}`;
}
