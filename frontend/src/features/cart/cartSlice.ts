import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ICartActionAttributes, ICart, TCartItem } from './cart.types';

export const addToCart = createAsyncThunk<TCartItem, ICartActionAttributes>(
  'cart/addToCart',
  async ({ productId, quantity }, APIThunk) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${productId}`);

      return {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      };
    } catch (error: any) {
      return APIThunk.rejectWithValue(error.response.data.message);
    }
  }
);

// @TODO set cartItems to localStorage
// localStorage.setItem('cartItems', JSON.stringify(getState().cartItems));

// @TODO load cartItems from localStorage to initialState
// const cartItemsFromStorage =
//   localStorage.getItem('cartItems') !== null
//     ? JSON.parse(localStorage.getItem('cartItems') as string)
//     : [];

const initialState: ICart = { cart: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.product !== action.payload);
      // @TODO update localStorage
      // localStorage.setItem('cartItems', JSON.stringify(getState().cart))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const newItem = action.payload;

      // Check if the new item is already in cart
      const hasItem = state.cart.find(
        (item) => item.product === newItem.product
      );

      if (hasItem)
        state.cart = state.cart.map((item) =>
          item.product === newItem.product ? newItem : item
        );

      // Add new item to cart
      if (!hasItem) state.cart = [...state.cart, newItem];
    });
  },
});

export const { removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
