import React, { useState } from 'react';
import './PaymentDropdown.css';
import { PAYMENT_METHODS } from './paymentMethods';

import { useSelector } from 'react-redux';
import { selectCartTotalWithPromo } from '@/redux/cart/selectors';

const fmt = (v) => `$${Number(v || 0).toFixed(2)}`;

export default function PaymentDropdown({
  price,
  selectedMethod,
  setSelectedMethod,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { total } = useSelector(selectCartTotalWithPromo);
  const { deliveryFee = 0 } = useSelector((state) => state.payment || {});

  const computedTotal = total + Number(deliveryFee || 0);
  const displayPrice = price != null ? price : fmt(computedTotal);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    setIsOpen(false);
  };

  return (
    <div className="payment-dropdown">
      {isOpen && (
        <ul className="dropdown-menu">
          {PAYMENT_METHODS.map((method) => (
            <li
              key={method.id}
              className="dropdown-item"
              onClick={() => handleSelect(method)}
            >
              <img
                src={method.icon}
                alt={method.label}
                className="dropdown-icon"
              />
              <span className="payment-label">{method.label}</span>
            </li>
          ))}
        </ul>
      )}

      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={selectedMethod.icon}
          alt={selectedMethod.label}
          className="dropdown-icon"
        />

        <div className="label-total-wrapper">
          <span className="payment-label">{selectedMethod.label}</span>
          <div className="total-display">
            <strong>{displayPrice}</strong>
          </div>
        </div>

        <span className={`chevron ${isOpen ? 'up' : 'down'}`}></span>
      </button>
    </div>
  );
}
