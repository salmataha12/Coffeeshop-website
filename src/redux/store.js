import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { DrinksApi } from '@/redux/DrinksApi';
import { userInfoReducer } from './userInfo';
import cartReducer from './cart/cartSlice';
import { PaymentApi } from './PaymentApi';
import { paymentReducer } from './PaymentSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo', 'cart']
};

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  cart: cartReducer,
  payment: paymentReducer,
  
  [DrinksApi.reducerPath]: DrinksApi.reducer,
  [PaymentApi.reducerPath]: PaymentApi.reducer,
});

const persistantReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistantReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    })
      .concat(DrinksApi.middleware)
      .concat(PaymentApi.middleware),
  
  
});

export const persistor = persistStore(store);

export default store;