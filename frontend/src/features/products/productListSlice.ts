import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IProductList } from './product.types';

// List all products in database
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, APIThunk) => {
    try {
      const response = await axios.get(`/api/v1/products`);
      return response.data;
    } catch (error: any) {
      return APIThunk.rejectWithValue(error.response.data.message);
    }
  }
);

// Define initial state
const initialState: IProductList = {
  isLoading: false,
  products: [],
  error: '',
};

export const productListSlice = createSlice({
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
        state.error = action.payload;
      });
  },
});

export default productListSlice.reducer;
