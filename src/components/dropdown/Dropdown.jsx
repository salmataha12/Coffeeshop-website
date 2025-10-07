import React from 'react';
import styles from './dropdown.module.css';
import { FcSearch } from 'react-icons/fc';
import DropdownItem from './DropdownItem';
import { Fragment } from 'react';

export default function Dropdown({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className={styles.dropdown_container}>
        <NoResults />
      </div>
    );
  }
  return (
    <div className={styles.dropdown_container}>
      {items.map(({ item }, index) => (
        <Fragment key={item.id}>
          <DropdownItem product={item} />
          {index < items.length - 1 && <hr className={styles.divider}></hr>}
        </Fragment>
      ))}
    </div>
  );
}

function NoResults() {
  return (
    <div className={styles.dropdown_no_result_container}>
      <FcSearch />
      <span>No results found</span>
    </div>
  );
}
