import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryFee: 1.0,
  totalAmount: 0,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload.subtotal + state.deliveryFee;
    },
  },
});

export const { setDeliveryFee, setTotalAmount } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;