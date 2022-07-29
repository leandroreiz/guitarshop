import axios from 'axios';
import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
} from '../slices/productSlice';
import type { AppThunk } from '../store/store';

export const listProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_REQUEST });

    const { data } = await axios(`/api/v1/products`);
    dispatch({ type: PRODUCTS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
