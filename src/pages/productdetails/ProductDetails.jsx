import ProductDetailsLower from '@/pages/productdetails/ProductDetailsLower';
import ProductDetailsUpper from './ProductDetailsUpper';
import { useGetDrinksListQuery } from '@/redux/DrinksApi';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';
import styles from './ProductDetails.module.css';
import { FaHeart } from 'react-icons/fa6';
import { GrFavorite } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { addToFavourite, removeFromFavourites } from '@/redux/userInfo';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import PromotionalCard from '@/components/promotionalcard/PromotionalCard';

export default function ProductPage() {
  const { data, error, isLoading } = useGetDrinksListQuery();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('medium');
  const [product, setProduct] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();
  const favourites = useSelector((state) => state.userInfo.favourites);

  let dispatch = useDispatch();

  const toggleLike = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product.id));
    } else {
      dispatch(addToFavourite(product.id));
    }
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      const sizeNames = product.sizes.map((size) => size.name);
      if (sizeNames.includes('medium')) {
        setSelectedSize('medium');
      } else {
        setSelectedSize(sizeNames[0]);
      }
    }
  }, [product]);

  useEffect(() => {
    if (!id || !data) return;

    setProduct(data.find((item) => item.id == id));
    setIsFavourite(favourites.find((fav) => fav.id == id) ? true : false);
  }, [id, data]);

  const handleSizeChange = (size) => {
    setSelectedSize(size.name);
  };

  if (error) {
    return (
      <div>Error loading products: {error.message || 'Failed to fetch'}</div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className={styles.loading_container}>
        <FiLoader className={styles.loader_icon} />
        <span>Loading...</span>
      </div>
    );
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className={styles.main_box}>
      <div className={styles.header}>
        <FaChevronLeft className={styles.icon} onClick={() => navigate(-1)} />
        <h3>Detail</h3>
        {isFavourite ? (
          <FaHeart
            color="var(--primary-color)"
            className={styles.icon}
            onClick={toggleLike}
          />
        ) : (
          <GrFavorite className={styles.icon} onClick={toggleLike} />
        )}
      </div>

      <div className={styles.container}>
        <ProductDetailsUpper product={product} />
        <ProductDetailsLower
          description={product.description}
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={handleSizeChange}
          product={product}
        />
      </div>
    </div>
  );
}
