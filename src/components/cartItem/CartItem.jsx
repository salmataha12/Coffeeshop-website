import React from 'react';
import styles from './CartItem.module.css';
import { updateQuantity, removeItem } from '@/redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleDecrement = () => {
    if (item.quantity == 1) {
      dispatch(removeItem({ id: item.id, size: item.size }));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          size: item.size,
          quantity: Math.max(0, item.quantity - 1),
        })
      );
    }
  };
  const handleIncrement = () => {
    dispatch(
      updateQuantity({
        id: item.id,
        size: item.size,
        quantity: item.quantity + 1,
      })
    );
  };

  return (
    <div className={styles.card}>
      <LazyLoadImage
        src={item.product.imageUrl}
        alt={item.product.name}
        effect="blur"
        placeholderSrc="https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className={styles.icon}
      />
      <div className={styles.info}>
        <div className={styles.title}>{item.product.name}</div>
        <div className={styles.desc}>{item.product.description}</div>
        <div className={styles.price}>
          {item.product.sizes.find((size) => size.name == item.size).price}$
        </div>
      </div>
      <div className={styles.qtyBlock}>
        <button
          className={styles.circleBtn}
          onClick={handleDecrement}
          aria-label="Decrease quantity"
        >
          <span className={styles.minus}>-</span>
        </button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          className={styles.circleBtn}
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          <span className={styles.plus}>+</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
