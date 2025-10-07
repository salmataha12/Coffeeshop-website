import React from 'react';
import HomePage from '@/pages/homepage/HomePage';
import Onboarding from '@pages/OnboardingPage/OnboardingPage';
import OrderPage from '@/pages/OrderPage/OrderPage';
import Favourites from '@/pages/Favourites/Favourites';
import ProductPage from '@/pages/productdetails/ProductDetails';
import OrderTrackPage from '@/pages/OrderTrack/OrderTrack';

const routes = [
  {
    path: '/',
    element: <Onboarding />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/order',
    element: <OrderPage />,
  },
  {
    path: '/favourites',
    element: <Favourites />,
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
  
  {
    path: '/orderTrack',
    element: <OrderTrackPage />,
  },
];

export default routes;
