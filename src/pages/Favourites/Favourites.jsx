import React from 'react';
import ProductsGrid from '@/components/ProductCards/ProductsGrid';
import { useSelector } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './favourites.module.css';
import Navbar from '@/components/navbar/Navbar';

export default function Favourites() {
  let navigate = useNavigate();
  const favourites = useSelector((state) => state.userInfo.favourites);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <FaChevronLeft className={styles.icon} onClick={() => navigate(-1)} />
          <h3 className={styles.center}>Favourites</h3>
        </div>
        <ProductsGrid products={favourites} errorMsg={false} loading={false} />
      </div>

      <Navbar></Navbar>
    </>
  );
}
