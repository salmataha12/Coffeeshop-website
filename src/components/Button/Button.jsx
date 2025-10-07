import React from 'react';
import styles from './button.module.css';

export default function Button({ text, icon, onClick, style, ...props }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={style}
      {...props}
    >
      {icon && <span className={styles.button_icon}>{icon}</span>}
      {text && <span className={styles.button_text}>{text}</span>}
    </button>
  );
}
