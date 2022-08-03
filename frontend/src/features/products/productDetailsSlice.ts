import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IProductDetails, TProduct } from './product.types';

// List a specific product based on its `id`
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (productId: string, APIThunk) => {
    try {
      const response = await axios(`/api/v1/products/${productId}`);
      return response.data;
    } catch (error: any) {
      return APIThunk.rejectWithValue(error.response.data.message);
    }
  }
);

// Define initial state
const initialState: IProductDetails = {
  isLoading: false,
  // @WHY is not possible to define an empty object here?
  product: {} as TProduct,
  error: '',
};

export const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
