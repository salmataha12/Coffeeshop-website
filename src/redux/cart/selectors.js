import { createSelector } from '@reduxjs/toolkit';
// import { selectPromo } from '../promoSlice';
import { applyPromotionToCart } from './promoUtils';

export const selectCart = (state) => state.cart;

// quantity by product id + size
export const selectQuantityBySku = (productId, size = 'medium') =>
  createSelector(
    selectCart,
    (cart) => cart.items[`${productId}-${size}`]?.quantity || 0
  );

export const selectCartTotalWithPromo = createSelector([selectCart], (cart) => {
  let result = null;
  if (cart?.promo?.id) {
    result = applyPromotionToCart(cart.orders, cart.promo);

    if (result.error) {
      return { total: null, error: result.error };
    }
  }

  const baseTotal = Object.values(cart.orders).reduce((sum, item) => {
    const price =
      item.product.sizes.find((s) => s.name === item.size)?.price ||
      item.product.defaultPrice;
    return sum + item.quantity * price;
  }, 0);

  let total = 0;
  if (result) {
    total = result?.newTotal ?? baseTotal - (result?.discount || 0);
  } else {
    total = baseTotal;
  }
  return { total, discount: result?.discount, baseTotal };
});

// items array
export const selectCartItems = createSelector(selectCart, (cart) =>
  Object.values(cart.orders || [])
);

// total count
export const selectCartCount = createSelector(
  selectCart,
  (cart) => cart.totalCount
);

// helper to get unit price from product in multiple shapes
export const getUnitPrice = (product, size = 'medium') => {
  if (!product) return 0;
  const s = (size || 'medium').toLowerCase();

  if (typeof product.price === 'number') return Number(product.price);

  if (product.price && typeof product.price === 'object') {
    const key = Object.keys(product.price).find((k) => k.toLowerCase() === s);
    if (key) return Number(product.price[key]) || 0;
  }

  if (Array.isArray(product.sizes)) {
    const hit = product.sizes.find(
      (v) => (v.size || v.name || v.label || '').toLowerCase() === s
    );
    if (hit && hit.price != null) return Number(hit.price) || 0;
  }

  if (product[`price_${s}`] != null) return Number(product[`price_${s}`]) || 0;
  if (product[`${s}Price`] != null) return Number(product[`${s}Price`]) || 0;

  return 0;
};

// total price
export const selectCartTotal = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((sum, item) => {
    const unit = getUnitPrice(item.product, item.size);
    const qty = item.quantity || 0;
    return sum + unit * qty;
  }, 0)
);
