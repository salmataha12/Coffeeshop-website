import React, { useEffect, useState } from 'react';
import './PromoDropdown.css';
import { useGetPromosListQuery } from '../../redux/DrinksApi'; // Adjust path as needed
import { useDispatch, useSelector } from 'react-redux';
import { applyPromo } from '@/redux/cart/cartSlice';
import svg from '../../assets/discount.svg';

const PromoDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPromoId, setSelectedPromoId] = useState(null);
  const { data: promos = [], error, isLoading } = useGetPromosListQuery();
  const promoStore = useSelector((state) => state.cart.promo);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelectedPromoId(promoStore?.id || null);
  },[]);

  const handlePromoClick = (promo) => {
    setSelectedPromoId(promo.id);
    dispatch(applyPromo(promo));
    setIsOpen(false);
  };

  const selectedPromo = promos.find(p => p.id === selectedPromoId);

  return (
    <div className="promo-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="promo-icon"><img src={svg} alt="Discount Icon" /></span>
        <span className="promo-label">
          {isLoading
            ? 'Loading...'
            : error
            ? 'Error loading promos'
            : selectedPromo
            ? 'Discount Applied'
            : 'Available Discounts'}
        </span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▶</span>
      </div>

      {isOpen && !isLoading && !error && (
        <ul className="dropdown-list">
          {promos.map((promo) => (
            promo.active && (
              <li
                key={promo.id}
                className={`dropdown-item ${selectedPromoId === promo.id ? 'selected' : ''}`}
                onClick={() => handlePromoClick(promo)}
              >
                {promo.name}
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default PromoDropdown;
