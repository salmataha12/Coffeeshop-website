import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './orderPage.module.css';
import DeliveryAddress from '@/components/DeliveryAddress/DeliveryAddress';
import EditAddressModal from '@/components/EditAddressModal/EditAddressModal';
import NoteModal from '@/components/NoteModal/NoteModal';
import PaymentSummary from '@/components/PaymentSummary/PaymentSummary';
import PaymentDropdown from '@/components/paymentDropdown/paymentDropdown';
import OrderButton from '@/components/OrderButton/OrderButton';
import { useSelector } from 'react-redux';
import CartItem from '@/components/cartItem/CartItem';
import { PAYMENT_METHODS } from '@/components/paymentDropdown/paymentMethods';
import PromoDropdown from '@/components/promoDropdown/PromoDropdown';
import toast from 'react-hot-toast';

export default function OrderPage() {
  const navigate = useNavigate();
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
  const cartItems = useSelector((state) => state.cart.orders);
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty(
        '--footer-h',
        `${el.offsetHeight}px`
      );
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    window.addEventListener('orientationchange', setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setVar);
      window.removeEventListener('orientationchange', setVar);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button
          className={styles.icon}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaChevronLeft />
        </button>
        <h3 className={styles.title}>Order</h3>
      </div>

      <DeliveryAddress
        onOpenNote={() => setIsNoteOpen(true)}
        onOpenEdit={() => setIsPopupOpen(true)}
      />

      <hr className={styles.hr} />

      {!cartItems || cartItems.length == 0 ? (
        <p className={styles.no_results_text}>your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => {
            return <CartItem key={index} item={item} />;
          })}
          <PromoDropdown />

          <div className={styles.summary}>
            <PaymentSummary />
          </div>
        </>
      )}

      <div ref={footerRef} className={styles.stickyFooter} role="contentinfo">
        <div className={styles.footerInner}>
          <div className={styles.paymentBlock}>
            <PaymentDropdown
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </div>
          <div className={styles.orderBar}>
            <OrderButton paymentMethod={selectedMethod} />
          </div>
        </div>
      </div>

      <NoteModal
        isOpen={isNoteOpen}
        onClose={() => {
          toast.success('Note saved');
          setIsNoteOpen(false);
        }}
      />
      <EditAddressModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}
