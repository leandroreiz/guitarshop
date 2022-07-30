import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TProductList, TProductDetails } from './product.types';

// --------------------------------------
// Product list
// --------------------------------------

// List all products in database
export const fetchProducts = createAsyncThunk(
  'products/listAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(`/api/v1/products`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initialize state
const initialListState: TProductList = {
  isLoading: false,
  products: [],
  error: '',
};

export const productListSlice = createSlice({
  name: 'products',
  initialState: initialListState,
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

// --------------------------------------
// Product details
// --------------------------------------

// List a specific product based on its `_id`
export const fetchProduct = createAsyncThunk(
  'product/details',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios(`/api/v1/products/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initialize state
const initialDetailsState: TProductDetails = {
  isLoading: false,
  product: {
    _id: '',
    name: '',
    image: '',
    description: '',
    brand: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  error: '',
};

export const productDetailsSlice = createSlice({
  name: 'products',
  initialState: initialDetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
