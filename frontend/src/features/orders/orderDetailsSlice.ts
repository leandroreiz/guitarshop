import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IOrderState } from './orders.types';
import { RootState } from '../../app/store';

export const getOrderDetails = createAsyncThunk<any, any, { state: RootState }>(
  'orders/getOrderDetails',
  async (id: string, APIThunk) => {
    const { token } = APIThunk.getState().userLogin.userData!;

    try {
      const response = await axios.get(`/api/v1/orders/${id}`, {
        headers: {
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
  isLoading: true,
  isSuccess: false,
} as IOrderState;

const orderDetailsSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderDetailsSlice.reducer;
