import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { addItem } from '../../redux/cart/cartSlice';
import styles from './AddButton.module.css';

export default function AddToCartButton({ product, size = 'medium', className }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => {
    const item = state.cart.orders.find((item) => item.id === product.id);
    return item?.quantity || 0;
  });

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(addItem({ id: product.id,product, size, qty: 1 }));
  };
  
  return (
    <>
    <div className={`${styles.add_btn} ${className || ''}`}>
      {quantity > 0 && (
        <div className={styles.number_disp}>{quantity}</div>
      )}
      <Button aria-label="Add to cart" text="+" className={styles.add_button_style} onClick={handleClick} />
    </div>
    </>
    
  );
}
