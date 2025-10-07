import styles from './tooltip.module.css';

export default function Tooltip({ text, children, distance = null }) {
  return (
    <div className={styles.tooltip_container}>
      <div className={styles.scaled_icon}>{children}</div>
      <div className={distance || styles.tooltip_box}>{text}</div>
    </div>
  );
}
