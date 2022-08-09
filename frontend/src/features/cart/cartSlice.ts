import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  ICartActionAttributes,
  ICart,
  TCartItem,
  ICartActionShippingAddress,
} from './cart.types';

export const addToCart = createAsyncThunk<TCartItem, ICartActionAttributes>(
  'cart/addToCart',
  async ({ productId, quantity }, APIThunk) => {
    try {
      const response = await axios.get(`/api/v1/products/${productId}`);

      const data = response.data;

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

// Load cartItems from localStorage to fill initialState
const cartItemsFromStorage =
  localStorage.getItem('cartItems') !== null
    ? JSON.parse(localStorage.getItem('cartItems') as string)
    : [];

// Load shipping address from localStorage
const shippingAddressFromStorage =
  localStorage.getItem('shippingAddress') !== null
    ? JSON.parse(localStorage.getItem('shippingAddress') as string)
    : {};

const initialState: ICart = {
  cart: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.product !== action.payload);
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    saveShippingAddress: (
      state,
      action: PayloadAction<ICartActionShippingAddress>
    ) => {
      state.shippingAddress = action.payload;
      // Set address to localStorage
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
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

      // Set cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    });
  },
});

export const { removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;
