import * as styles from "./LandingSection.css.js";

export default function LandingSection({
  title,
  subtitle,
  titleHighlight,
  highlightColor = "main",
  bgImage,
  children,
}) {
  const highlightClass = highlightColor === "blue" ? styles.highlightBlue : styles.highlightMain;

  return (
    <section
      className={styles.section}
      style={bgImage ? { backgroundImage: `url('${bgImage}')` } : undefined}
    >
      <div className={styles.sectionInner}>
        {/* 텍스트 요소들만 묶어서 gap으로 간격 제어 */}
        <div className={styles.textWrapper}>
          <h2 className={styles.sectionTitle}>
            {titleHighlight ? (
              <>
                {title.split(titleHighlight)[0]}
                <span className={highlightClass}>{titleHighlight}</span>
                {title.split(titleHighlight)[1]}
              </>
            ) : (
              title
            )}
          </h2>

          <p className={styles.sectionSubtitle}>
            {subtitle.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className={styles.graphicWrapper}>{children}</div>
      </div>
    </section>
  );
}
