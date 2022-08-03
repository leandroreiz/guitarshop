import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IUserState, IUserActionAttributes, TUser } from './users.types';

// @TODO verify return type
/**
 * Login user and return token
 * @param email     user's email
 * @param password  user's password
 */
export const login = createAsyncThunk<TUser, IUserActionAttributes>(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const userData = await axios.post(
        `/api/v1/users/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Set user data to localStorage
      localStorage.setItem('userData', JSON.stringify(userData.data));

      return userData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Get user data from localStorage
const userDataFromLocalStorage = localStorage.getItem('userData') as string;
const data = userDataFromLocalStorage
  ? JSON.parse(userDataFromLocalStorage)
  : null;

const initialState: IUserState = {
  isLoading: false,
  userData: data,
  error: '',
};

const userLoginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userData');
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userLoginSlice.actions;

export default userLoginSlice.reducer;
