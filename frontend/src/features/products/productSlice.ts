import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TProduct } from './product.types';

export const fetchProducts = createAsyncThunk('api/v1/products', async () => {
  const { data } = await axios(`/api/v1/products`);
  return data;
});

interface ProductState {
  isLoading: boolean;
  products: Array<TProduct>;
  errorMessage?: any;
}

const initialState: ProductState = { isLoading: false, products: [] };

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default productSlice.reducer;
