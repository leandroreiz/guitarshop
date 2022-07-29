import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type TProduct from '../../../common/types/TProduct';

interface ProductState {
  loading: boolean;
  products: Array<TProduct>;
  error?: any;
}

const initialState: ProductState = { loading: false, products: [] };

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    PRODUCTS_REQUEST: (state) => {
      state.loading = true;
    },
    PRODUCTS_SUCCESS: (state, action: PayloadAction<Array<TProduct>>) => {
      state.loading = false;
      state.products = action.payload;
    },
    PRODUCTS_FAIL: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL } =
  productSlice.actions;

export default productSlice.reducer;
