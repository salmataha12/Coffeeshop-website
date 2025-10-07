import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (price) => ({
        url: '/create-payment-intent',
        method: 'POST',
        body: { amount: price },
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = PaymentApi;
