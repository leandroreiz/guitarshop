import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { IUserState, TUser } from './users.types';

export const updateProfile = createAsyncThunk<
  TUser,
  TUser,
  { state: RootState }
>('user/updateProfile', async (user, APIThunk) => {
  try {
    const { token } = APIThunk.getState().userLogin.userData!;

    const response = await axios.put(`/api/v1/users/profile`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return APIThunk.rejectWithValue(error.response.data.message);
  }
});

const initialState: IUserState = {
  isLoading: false,
  userData: null,
  error: '',
};

const userProfileUpdateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.userData = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userProfileUpdateSlice.reducer;
