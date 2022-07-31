import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TCart, TCartState } from './cart.types';
import { AppDispatch } from '../../app/store';

export interface ActionAttributes {
  productId: string;
  quantity: number;
}

export const addToCart = createAsyncThunk<
  TCart,
  ActionAttributes,
  { dispatch: AppDispatch; state: TCartState }
>(
  'cart/addItem',
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${productId}`);

      localStorage.setItem('cartItems', JSON.stringify(getState().cartItems));

      return {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      } as TCart;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Load cartItems from localStorage to fill initialState
// const cartItemsFromStorage =
//   localStorage.getItem('cartItems') !== null
//     ? JSON.parse(localStorage.getItem('cartItems') as string)
//     : [];

const initialState: TCartState = { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const newItem = action.payload;

      // Check if the new item is already in cart
      const hasItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (hasItem)
        state.cartItems = state.cartItems.map((item) =>
          item.product === newItem.product ? newItem : item
        );

      // Add new item to cart
      if (!hasItem) state.cartItems = [...state.cartItems, newItem];
    });
  },
});

export default cartSlice.reducer;
