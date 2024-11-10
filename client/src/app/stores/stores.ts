import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import categoryReducer from './category/slice';
import productReducer from './product/slice';
import profileReducer from './profile/slice';
import cartReducer from './cart/slice';
import paymentReducer from './payment/slice';
import orderReducer from './order/slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    product: productReducer,
    profile: profileReducer,
    cart: cartReducer,
    payment: paymentReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
