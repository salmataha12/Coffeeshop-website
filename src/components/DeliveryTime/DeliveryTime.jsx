import React from 'react';
import styles from './DeliveryTime.module.css';
import deliveryIcon from '../../assets/Deliver.png';
import indicatorIcon from '../../assets/Indicator.png';

const DeliveryTime = () => {
  const deliveryTime = '5 minutes left';
  const deliveryAddress = 'Delivery to Heliopolis';

  return (
    <div className={styles.wrapper}>
      <img
        src={indicatorIcon}
        alt="Progress indicator"
        className={styles.indicator}
      />
      <div className={styles.header}>
        <h2 className={styles.time}>{deliveryTime}</h2>
        <p className={styles.address}>{deliveryAddress}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.progressBar}>
          <div className={styles.segmentCompleted}></div>
          <div className={styles.segmentCompleted}></div>
          <div className={styles.segmentCompleted}></div>
          <div className={styles.segmentPending}></div>
        </div>

        <div className={styles.status}>
          <img
            src={deliveryIcon}
            alt="Delivery icon"
            className={styles.icon}
          />
          <div>
            <p className={styles.statusText}>Delivered your order</p>
            <span className={styles.statusSubtext}>
              We will deliver your goods to you in the shortest possible time.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTime;