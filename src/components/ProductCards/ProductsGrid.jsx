import React, { useState, useEffect } from 'react';
import styles from './ProductsCards.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ProductCard from './ProductCard';

function ProductsGrid({ products, loading, errorMsg }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    updateContent();
  }, [products, loading, errorMsg]);

  function updateContent() {
    if (loading) {
      setContent(<p>Loading products...</p>);
    } else if (errorMsg) {
      setContent(<p>{errorMsg}</p>);
    } else if (!products.length) {
      setContent(<p>No products found.</p>);
    } else {
      setContent(
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      );
    }
  }

  return (
    <div className={styles['page-container']}>
      <div className={styles['products-container']}>{content}</div>
    </div>
  );
}

export default ProductsGrid;
