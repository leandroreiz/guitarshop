import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IOrderObject, IOrdersState } from './orders.types';
import { RootState } from '../../app/store';

export const getActiveUserOrders = createAsyncThunk<
  any,
  void,
  { state: RootState }
>('orders/getActiveUserOrders', async (_, APIThunk) => {
  const { token } = APIThunk.getState().userLogin.userData!;

  try {
    const response = await axios.get(`/api/v1/orders/myorders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return APIThunk.rejectWithValue(error.response.data.message);
  }
});

const initialState = {
  orders: [] as IOrderObject[],
  isLoading: false,
  isSuccess: false,
  error: null,
} as IOrdersState;

const orderMyListSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActiveUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getActiveUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderMyListSlice.reducer;
