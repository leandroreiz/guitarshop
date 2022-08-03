import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userLoginReducer from '../features/users/userLoginSlice';
import productListReducer from '../features/products/productListSlice';
import productDetailsReducer from '../features/products/productDetailsSlice';
import cartReducer from '../features/cart/cartSlice';

// @TODO load cart and userData from localStorage

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userLoginReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Default `ThunkAction` type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
