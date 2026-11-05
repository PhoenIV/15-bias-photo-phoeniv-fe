import * as styles from "./Toast.css";

const ICONS = {
  error: "🚨",
  success: "✅",
  warning: "⚠️",
};

export default function Toast({ message, type = "warning" }) {
  const icon = ICONS[type] || ICONS.warning;

  return (
    <div role="status" className={styles.toastItem}>
      <span aria-hidden="true" className={styles.iconWrapper}>
        {icon}
      </span>
      <span>{message}</span>
    </div>
  );
}
