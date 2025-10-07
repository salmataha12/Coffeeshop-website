import styles from './CreditCardModal.module.css';
import { FaCreditCard } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import useConfirmPayment from '@/hooks/useConfirmPayment';
import { FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CreditCardDrawer({ subtotal, setShowModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [handlePayment] = useConfirmPayment();
  const elems = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (!isLoading) return;

    handlePayment(subtotal, stripe, elems)
      .then(() => {
        setIsLoading(false);
        setShowModal(2);
      })
      .catch((e) => {
        toast.error('There has been an error, try again');
        console.error(e);
        setIsLoading(false);
        setShowModal(0);
      });
  }, [isLoading]);

  return (
    <div className={styles.overlay}>
      <div className={styles.dropdown}>
        <div className={styles.header}>
          <h3>Card Information</h3>
          <button
            className={styles.closeButton}
            onClick={() => setShowModal(0)}
            aria-label="Close dropdown"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.element_container}>
            <FaCreditCard />
            <CardNumberElement className={styles.flexed_element} />
          </div>
          <div className={styles.separating_container}>
            <div className={styles.halfed_container}>
              <FaCreditCard />
              <CardExpiryElement className={styles.flexed_element} />
            </div>
            <div className={styles.halfed_container}>
              <FaCreditCard />
              <CardCvcElement className={styles.flexed_element} />
            </div>
          </div>
          <button
            disabled={!stripe || !elems || isLoading}
            onClick={() => setIsLoading(true)}
            className={styles.submit_button}
          >
            {isLoading ? (
              <FiLoader className={styles.spinny} />
            ) : (
              `Pay ${subtotal} $`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
