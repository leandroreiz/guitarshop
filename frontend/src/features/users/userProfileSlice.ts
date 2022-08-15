import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IUserState } from './users.types';
import { RootState } from '../../app/store';

export const getProfile = createAsyncThunk<any, string, { state: RootState }>(
  'user/getProfile',
  async (userId, APIThunk) => {
    try {
      const token = APIThunk.getState().userLogin.userData?.token;

      const response = await axios.get(`/api/v1/users/${userId}`, {
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

const initialState: IUserState = {
  isLoading: false,
  userData: null,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.isLoading = false;
      state.userData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
