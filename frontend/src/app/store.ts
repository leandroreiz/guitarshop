import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice';

const store = configureStore({
  reducer: {
    productsData: productsReducer,
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
