import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IUserState, IUserActionAttributes } from './users.types';

// @TODO verify return type
/**
 * Login user and return token
 * @param email     user's email
 * @param password  user's password
 */
export const login = createAsyncThunk<any, IUserActionAttributes>(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = { email, password };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const userData = await axios.post(`/api/v1/users/login`, data, config);

      localStorage.setItem('userData', JSON.stringify(userData));

      return userData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userDataFromLocalStorage = localStorage.getItem('userData');

const initialState: IUserState = {
  userData: JSON.parse(userDataFromLocalStorage as string),
} as IUserState;

const userLoginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userLoginSlice.reducer;
