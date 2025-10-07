import React from 'react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, children, ariaLabel }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal} role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeIcon}
          onClick={onClose}
          aria-label="Close"
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
}
