import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import TProduct from '../../../common/types/TProduct';
import IStore from '../store/IStore';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  TProductAction,
} from './TProductAction';

//
export const listProducts =
  (): ThunkAction<void, IStore, unknown, TProductAction> =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const response = await axios('/api/v1/products');
      const data: Array<TProduct> = response.data;
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
