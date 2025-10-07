import React from 'react';
import styles from './ProductDetailsUpper.module.css';
import { FaStar } from 'react-icons/fa';
import { GiMilkCarton } from 'react-icons/gi';
import { PiCoffeeBeanFill } from 'react-icons/pi';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Tooltip from '@/components/tooltip/Tooltip';

const ProductDetailsUpper = ({ product }) => {
  const ratingCount = Math.max(30, Math.trunc(Math.random() * 200));
  return (
    <>
      <div className={styles.container}>
        <LazyLoadImage
          src={product.imageUrl}
          effect="blur"
          width="100%"
          placeholderSrc="https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={product.name || 'Product image'}
          className={styles.imageWrapper}
        />

        <div className={styles.info}>
          <h2>{product?.name || 'Product'}</h2>
        </div>

        <div className={styles.flexor}>
          <div className={styles.rating}>
            <FaStar className={styles.star} />
            <span>{product?.rating || '5.0'}</span>
            <span className={styles.count}>({ratingCount})</span>
          </div>
          <div className={styles.iconsRow}>
            <div className={styles.featureIcon}>
              <MdOutlineDeliveryDining
                color="#c67c4e"
              />
            </div>
            <div className={styles.featureIcon}>
              <PiCoffeeBeanFill
                color="#c67c4e"
              />
            </div>
            <div className={styles.featureIcon}>
              <GiMilkCarton color="#c67c4e" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetailsUpper;
