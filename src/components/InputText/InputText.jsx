import React from 'react';
import styles from './inputText.module.css';

export default function InputText({ label, placeholder, required, ...props }) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </div>
      <input className={styles.input} placeholder={placeholder} {...props} />
    </div>
  );
}
