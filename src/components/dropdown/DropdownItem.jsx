import React from 'react';
import styles from './dropdown.module.css';
import { Link } from 'react-router-dom';

export default function DropdownItem({ product }) {
  return (
    <Link to={`/product/${product.id}`} className={styles.link_container}>
      <div className={styles.dropdown_item_container}>
        <div className={styles.dropdown_item_info_container}>
          <span className="truncate">{product.name}</span>
          <span className="truncate subtext">{product.description}</span>
        </div>
        <div className={styles.dropdown_item_infometrics_container}>
          <span>{product.defaultPrice}$</span>
        </div>
      </div>
    </Link>
  );
}
