
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity, clearCart } from '@/redux/cart/cartSlice';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addItemToCart = (id, size, quantity = 1, product) => {
    dispatch(addItem({ id, size, qty: quantity, product }));
  };

  const removeItemFromCart = (id, size) => {
    dispatch(removeItem({ id, size }));
  };

  const updateItemQuantity = (id, size, quantity) => {
    dispatch(updateQuantity({ id, size, quantity }));
  };

  const clearAllCart = () => {
    dispatch(clearCart());
  };

  const getItemQuantity = (id, size) => {
    const key = `${id}-${size}`;
    return cart.items[key]?.quantity || 0;
  };

  const getTotalItems = () => {
    return cart.totalCount;
  };

  const getOrdersList = () => {
    return cart.orders;
  };

  return {
    cart: cart.items,
    orders: cart.orders,
    totalCount: cart.totalCount,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart: clearAllCart,
    getItemQuantity,
    getTotalItems,
    getOrdersList,
  };
}

