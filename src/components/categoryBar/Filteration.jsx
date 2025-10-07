import React, { useEffect } from 'react';
import styles from './CategoryBar.module.css';
import useCategoryFilteration from '../../hooks/useCategoryFilteration';

export default function Filteration({ productsList, setDetails }) {
  const { categories, selectedItems, selected, setSelected } =
    useCategoryFilteration({ products: productsList });
  const Onclickhandler = (category) => {
    setSelected(category);
  };

  useEffect(() => {
    if (!selectedItems) return;
    setDetails(selectedItems);
  }, [selectedItems]);

  return (
    <div className={styles.bar}>
      <div
        className={styles.category_bar}
        role="tablist"
        aria-label="Product categories"
      >
        {categories.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={selected === category}
            className={`${styles.category_tab} ${selected === category ? styles.active : ''}`}
            onClick={() => Onclickhandler(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
