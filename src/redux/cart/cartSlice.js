import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  promo: {},
  totalCount: 0,
  status: 'incomplete',
};

const keyOf = (id, size) => `${id}-${size}`;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const { id, size = 'medium', qty = 1, product } = payload;
      const k = keyOf(id, size);

      const existingItem = state.orders.find(
        (item) => keyOf(item.id, item.size) === k
      );

      if (existingItem) {
        existingItem.quantity += qty;
        existingItem.product = product;
      } else {
        state.orders.push({ id, size, quantity: qty, product });
      }

      state.totalCount += qty;
    },

    removeItem: (state, { payload }) => {
      const { id, size } = payload;
      const k = keyOf(id, size);
      const itemIndex = state.orders.findIndex(
        (item) => keyOf(item.id, item.size) === k
      );

      if (itemIndex >= 0) {
        state.totalCount -= state.orders[itemIndex].quantity;
        state.orders.splice(itemIndex, 1);
        state.orders = state.orders.filter(
          (order) => !(order.id === id && order.size === size)
        );
      }
    },

    updateQuantity: (state, { payload }) => {
      const { id, size, quantity } = payload;
      const k = keyOf(id, size);

      const item = state.orders.find((item) => keyOf(item.id, item.size) === k);

      if (item && quantity > 0) {
        const oldQuantity = item.quantity;
        item.quantity = quantity;
        state.totalCount = state.totalCount - oldQuantity + quantity;

        const orderIndex = state.orders.findIndex(
          (order) => order.id === id && order.size === size
        );
        if (orderIndex >= 0) {
          state.orders[orderIndex].quantity = quantity;
        }
      } else if (item && quantity <= 0) {
        state.totalCount -= item.quantity;
        state.orders = state.orders.filter(
          (item) => keyOf(item.id, item.size) !== k
        );
        state.orders = state.orders.filter(
          (order) => !(order.id === id && order.size === size)
        );
      }
    },

    clearCart: (state) => {
      state.orders = [];
      state.promo = {};
      state.totalCount = 0;
    },
    applyPromo: (state, { payload }) => {
      state.promo = payload;
    },
  },
});

export const { addItem, applyPromo, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
