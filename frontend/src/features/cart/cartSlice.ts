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
const cartItemsFromStorage = {
  cartItems:
    localStorage.getItem('cartItems') !== null
      ? JSON.parse(localStorage.getItem('cartItems') as string)
      : [],
};

// Load shipping address from localStorage
const shippingAddressFromStorage =
  localStorage.getItem('shippingAddress') !== null
    ? JSON.parse(localStorage.getItem('shippingAddress') as string)
    : {};

// Load payment method from localStorage
const paymentMethodFromStorage =
  localStorage.getItem('paymentMethod') !== null
    ? JSON.parse(localStorage.getItem('paymentMethod') as string)
    : '';

const initialState: ICart = {
  cart: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
    },
    saveShippingAddress: (
      state,
      action: PayloadAction<ICartActionShippingAddress>
    ) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const newItem = action.payload;

      // Check if the new item is already in cart
      const hasItem = state.cart.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (hasItem)
        state.cart.cartItems = state.cart.cartItems.map((item) =>
          item.product === newItem.product ? newItem : item
        );

      // Add new item to cart
      if (!hasItem) state.cart.cartItems = [...state.cart.cartItems, newItem];

      // Set cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
    });
  },
});

export const { removeFromCart, saveShippingAddress, savePaymentMethod } =
  cartSlice.actions;

export default cartSlice.reducer;
