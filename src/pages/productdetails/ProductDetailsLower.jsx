import React, { useState } from 'react';
import styles from './ProductDetailsLower.module.css';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@/redux/cart/cartSlice';
import PromotionalCard from '@/components/promotionalcard/PromotionalCard';

export default function ProductDetailsLower({
  description,
  sizes,
  selectedSize,
  onSizeChange,
  product,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use internal state if no external state provided
  const [internalSelectedSize, setInternalSelectedSize] = useState(
    sizes && sizes.length > 1 ? sizes[1] : sizes?.[0]
  );

  // Find the current selected size object from sizes array
  const currentSelectedSize =
    sizes?.find((size) => size.name === selectedSize) ||
    sizes?.find((size) => size.name === internalSelectedSize?.name) ||
    sizes?.[0];

  const handleSizeChange = (size) => {
    if (onSizeChange) {
      onSizeChange(size);
    } else {
      setInternalSelectedSize(size);
    }
  };

  const handleAddToCart = () => {
    if (!product || !currentSelectedSize) return;

    dispatch(
      addItem({
        id: product.id,
        size: currentSelectedSize.name,
        qty: 1,
        product: product,
      })
    );
  };

  const handleBuyNow = () => {
    if (!product || !currentSelectedSize) return;

    dispatch(
      addItem({
        id: product.id,
        size: currentSelectedSize.name,
        qty: 1,
        product: product,
      })
    );

    navigate('/order');
  };

  return (
    <div className={styles.product_details_section}>
      {/* Description */}
      <section className={styles.description_section} id="description">
        <h3>Description</h3>
        <p>{description || 'Loading description...'}</p>
      </section>

      {/* Sizes */}
      <section className={styles.sizes_section}>
        <h4>Size</h4>
        <div className={styles.size_buttons}>
          {sizes?.map((size) => (
            <button
              key={size.name}
              className={
                styles.size_btn +
                ' ' +
                (currentSelectedSize?.name === size.name ? styles.active : '')
              }
              onClick={() => handleSizeChange(size)}
              type="button"
            >
              {size.name}
            </button>
          ))}
        </div>
      </section>

      {/* Price */}
      <section className={styles.price_section}>
        <div className={styles.price_and_actions}>
          <p className={styles.product_price}>
            ${currentSelectedSize?.price?.toFixed(2) || '0.00'}
          </p>
          <div className={styles.flexor}>
            <Button
              className={styles.main_button}
              text="Buy Now"
              onClick={handleBuyNow}
            />
            <Button
              className={styles.main_button}
              text="Add to Cart"
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </section>

      <div className={styles.promo_container}>
        <PromotionalCard />
      </div>
    </div>
  );
}
