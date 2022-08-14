import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IOrderPay } from './orders.types';
import { RootState } from '../../app/store';

export const payOrder = createAsyncThunk<any, any, { state: RootState }>(
  'orders/payOrder',
  async ({ orderId, paymentResult }, APIThunk) => {
    const { token } = APIThunk.getState().userLogin.userData!;

    try {
      const response = await axios.put(
        `/api/v1/orders/${orderId}/pay`,
        paymentResult,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return APIThunk.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccess: false,
  error: null,
} as IOrderPay;

const orderPaySlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPayment } = orderPaySlice.actions;

export default orderPaySlice.reducer;
