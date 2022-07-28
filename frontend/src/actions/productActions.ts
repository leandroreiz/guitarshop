import axios from 'axios';
import { AppDispatch } from '../store';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from './productActionTypes';

export const listProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios('/api/v1/products');

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    // @TODO check for correct error type (using type guard)
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
