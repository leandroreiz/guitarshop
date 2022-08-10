import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IOrderState } from './orders.types';
import { RootState } from '../../app/store';

export const createOrder = createAsyncThunk<any, any, { state: RootState }>(
  'orders/createOrder',
  async (order, APIThunk) => {
    const { token } = APIThunk.getState().userLogin.userData!;

    try {
      const response = await axios.post(`/api/v1/orders`, order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return APIThunk.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  order: {},
  isLoading: false,
  isSuccess: false,
} as IOrderState;

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
