import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {
  productDetailsReducer,
  productListReducer,
} from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    productsList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
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
