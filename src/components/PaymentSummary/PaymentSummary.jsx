import React from 'react';
import { useSelector } from 'react-redux';
import styles from './PaymentSummary.module.css';
import { selectCartTotalWithPromo } from '@/redux/cart/selectors';

const fmt = (v) => `${Number(v || 0).toFixed(2)}$`;

const PaymentSummary = () => {
  const { total, baseTotal, discount } = useSelector(selectCartTotalWithPromo);

  const { deliveryFee } = useSelector(
    (state) => state.payment || { deliveryFee: 0 }
  );

  return (
    <div className={styles.paymentSummary}>
      <h2>Payment Summary</h2>
      <div className={styles.summaryItem}>
        <span>Price:</span>
        <span>{fmt(baseTotal)}</span>
      </div>
      <div className={styles.summaryItem}>
        <span>Delivery Fee:</span>
        <span>
          <del>$2.0</del>{' '}
          <span className={styles.discounted}>{fmt(deliveryFee)}</span>
        </span>
      </div>
      {discount !== 0 && discount && (
        <div className={styles.summaryItem}>
          <span>discount:</span>
          <span>{fmt(-1 * discount)}</span>
        </div>
      )}
      <div className={styles.summaryItem}>
        <span>total:</span>
        <span>{fmt(total + deliveryFee)}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
