import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { addOrder } from '../../redux/userInfo';
import { clearCart } from '@/redux/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import styles from './OrderButtonContent.module.css';
import { PAYMENT_METHODS } from '../paymentDropdown/paymentMethods';
import CreditCardDrawer from '@/components/CreditCardModal/CreditCardModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  selectCartTotalWithPromo,
} from '@/redux/cart/selectors';
import OrderItem from './orderItem';
import toast from 'react-hot-toast';

const getUnitPrice = (product, size = 'medium') => {
  if (!product) return 0;
  const s = (size || 'medium').toLowerCase();

  if (typeof product.price === 'number') return Number(product.price);

  if (product.price && typeof product.price === 'object') {
    const key = Object.keys(product.price).find((k) => k.toLowerCase() === s);
    if (key) return Number(product.price[key]) || 0;
  }

  if (Array.isArray(product.sizes)) {
    const hit = product.sizes.find(
      (v) => (v.size || v.name || v.label || '').toLowerCase() === s
    );
    if (hit && hit.price != null) return Number(hit.price) || 0;
  }

  if (product[`price_${s}`] != null) return Number(product[`price_${s}`]) || 0;
  if (product[`${s}Price`] != null) return Number(product[`${s}Price`]) || 0;

  return 0;
};

export default function OrderButton({ paymentMethod }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const { total, baseTotal, discount } = useSelector(selectCartTotalWithPromo);
  const cartCount = useSelector(selectCartCount);
  const { deliveryFee = 0 } = useSelector((state) => state.payment || {});
  const grandTotal = (total || 0) + Number(deliveryFee || 0);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const note = useSelector((state) => state.userInfo.orderNote);

  const [showCardModal, setShowCardModal] = useState(0);
  const timeoutRef = useRef(null);

  const handleOrderClick = () => setShowModal(true);
  const handleClose = () => {
    if (!loading) setShowModal(false);
  };

  const handleorder = () => {
    const order = {
      items: mapItemsForOrder(),
      subtotal: total ?? 0,
      deliveryFee: Number(deliveryFee || 0),
      total: grandTotal ?? 0,
      count: cartCount ?? 0,
      createdAt: Date.now(),
      status: 'completed',
      note: note || '',
    };
    toast.success('Order placed successfully');
    timeoutRef.current = setTimeout(() => {
      dispatch(addOrder(order));
      dispatch(clearCart());
      setLoading(false);
      setShowModal(false);
      navigate('/orderTrack', { replace: true, state: { lastOrder: order } });
    }, 1500);
  };

  const options = {
    mode: 'payment',
    amount: Math.trunc(grandTotal * 100),
    currency: 'usd',
  };

  const STRIPE_PROMISE = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

  const pillButtonStyle = {
    width: '100%',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: 600,
    padding: '12px 20px',
  };

  const mapItemsForOrder = () =>
    cartItems.map((cartItem) => {
      const product = cartItem.product || {};
      const unitPrice = getUnitPrice(product, cartItem.size);
      const qty = cartItem.quantity || 0;

      return {
        id: cartItem.id,
        name: product.name || 'Item',
        size: cartItem.size,
        quantity: qty,
        unitPrice,
        Total: unitPrice * qty,
      };
    });

  const handleConfirm = () => {
    setLoading(true);
    if (paymentMethod == PAYMENT_METHODS[0]) {
      setShowCardModal(1);
      setShowModal(false);
      setLoading(false);
    } else {
      handleorder();
    }
  };

  useEffect(() => {
    if (showCardModal == 2) {
      handleorder();
      setShowCardModal(0);
    }
  }, [showCardModal]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <Button
        text="Order"
        onClick={handleOrderClick}
        disabled={cartItems?.length === 0}
        style={pillButtonStyle}
      />

      {showCardModal !== 0 && (
        <Elements options={options} stripe={STRIPE_PROMISE}>
          <CreditCardDrawer
            setShowModal={setShowCardModal}
            subtotal={grandTotal}
          />
        </Elements>
      )}
      <Modal isOpen={showModal} onClose={handleClose} ariaLabel="Order summary">
        <h3 className={styles.heading}>Confirm Your Order</h3>

        <div className={styles.cards}>
          {mapItemsForOrder().map((item) => (
            <OrderItem key={`${item.id}-${item.size}`} item={item} />
          ))}
        </div>

        <div className={styles.footer}>
          {/* Subtotal + Delivery + Grand total */}
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span className={styles.totalValue}>
              {(baseTotal || 0).toFixed(2)}$
            </span>
          </div>
          <div className={styles.totalRow}>
            <span>Delivery</span>
            <span className={styles.totalValue}>
              {Number(deliveryFee || 0).toFixed(2)}$
            </span>
          </div>
          {discount !== 0 && discount && (
            <div className={styles.totalRow}>
              <span>Discount</span>
              <span className={styles.totalValue}>
                {(-1 * discount || 0).toFixed(2)}$
              </span>
            </div>
          )}
          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalValue}>
              {(grandTotal || 0).toFixed(2)}$
            </span>
          </div>

          <div className={styles.confirmRow}>
            <Button
              text={loading ? 'Placing...' : 'Confirm '}
              onClick={handleConfirm}
              disabled={loading}
              style={pillButtonStyle}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
