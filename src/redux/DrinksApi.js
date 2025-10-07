import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * @example - const {data, error, isLoading} = useGetDrinksListQuery();
 */
export const DrinksApi = createApi({
  reducerPath: 'drinksList',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getDrinksList: builder.query({
      query: () => '/products',
      providesTags: ['Drinks'],
    }),
    getPromosList: builder.query({
      query: () => '/promotions',
      providesTags: ['Promotions'],
    }),
  }),
});

export const { useGetDrinksListQuery, useGetPromosListQuery } = DrinksApi;
