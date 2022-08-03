import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IUserActionAttributes, IUserState, TUser } from './users.types';
import { login } from './userLoginSlice';

export const register = createAsyncThunk<TUser, IUserActionAttributes>(
  'user/register',
  async ({ name, email, password }, APIThunk) => {
    try {
      const newUser = await axios.post(
        `/api/v1/users`,
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Login after user registration
      APIThunk.dispatch(login({ email, password }));

      return newUser.data;
    } catch (error: any) {
      return APIThunk.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState: IUserState = {
  isLoading: false,
  userData: null,
  error: '',
};

const userRegisterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userRegisterSlice.reducer;
