import React from 'react';
import styles from './OrderButtonContent.module.css';

export default function OrderItem({ item }) {
  return (
    <div className={styles.card} >
      <div className={styles.cardRow}>
        <span className={styles.cardName}>{item.name}</span>
        <span className={styles.cardSize}>{item.size}</span>
      </div>
      <div className={styles.cardRow}>
        <span className={styles.cardQty}>Qty: {item.quantity}</span>
        <span className={styles.cardPrice}>{item.unitPrice.toFixed(2)}$</span>
      </div>
      <div className={styles.cardRowTotal}>
        <span>Total</span>
        <span className={styles.cardTotal}>{item.Total.toFixed(2)}$</span>
      </div>
    </div>
  );
}
