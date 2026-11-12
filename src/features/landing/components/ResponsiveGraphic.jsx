import { breakpoints } from "@/styles/theme.css.js";

/**
 * 뷰포트에 맞는 이미지 1장만 내려받도록 <picture> + <source media>를 사용한다.
 * (기존에는 3장을 모두 렌더링하고 CSS로 숨겨서 불필요한 다운로드가 발생했음)
 *
 * @param {object} props
 * @param {[number, number]} props.sizeSm [width, height] - CLS 방지를 위한 원본 비율
 * @param {boolean} [props.priority] LCP 이미지는 true (eager + fetchPriority high)
 */
export default function ResponsiveGraphic({
  alt,
  srcSm,
  srcMd,
  srcLg,
  sizeSm,
  sizeMd,
  sizeLg,
  priority = false,
}) {
  return (
    <picture>
      <source
        height={sizeLg[1]}
        media={`(min-width: ${breakpoints.pc})`}
        srcSet={srcLg}
        width={sizeLg[0]}
      />
      <source
        height={sizeMd[1]}
        media={`(min-width: ${breakpoints.tablet})`}
        srcSet={srcMd}
        width={sizeMd[0]}
      />
      {}
      <img
        alt={alt}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        height={sizeSm[1]}
        loading={priority ? "eager" : "lazy"}
        src={srcSm}
        width={sizeSm[0]}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </picture>
  );
}
