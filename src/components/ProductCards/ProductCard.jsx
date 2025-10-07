import React from 'react';
import styles from './ProductsCards.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AddToCartButton from '../AddButton/AddButton';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles['product-card']}
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <span className={styles.rating}>
        ⭐ {product.rating ? Number(product.rating).toFixed(1) : 'N/A'}
      </span>
      <div>
        <LazyLoadImage
          src={product.imageUrl}
          effect="blur"
          placeholderSrc="https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={product.name || 'Product image'}
          className={styles['product-image']}
        />
        <div className={styles['details-part']}>
          <span className={styles['product-name']}>{product.name}</span>
          <span className={styles['product-description']}>
            {product.description ?? 'No description available.'}
          </span>
        </div>
      </div>
      <div className={styles.separator}>
        <span className={styles['product-price']}>
          {product.defaultPrice
            ? `$${Number(product.defaultPrice).toFixed(2)}`
            : 'Price not available'}
        </span>
        <AddToCartButton product={product} size={product.sizes[0].name} />
      </div>
    </div>
  );
}
