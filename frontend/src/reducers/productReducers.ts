import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  ProductDispatchTypes,
} from '../actions/productActionTypes';
import TProduct from '../types/TProduct';

export interface IState {
  loading: boolean;
  products?: Array<TProduct>;
  error?: any;
}

const initialState: IState = { loading: false, products: [] };

export const productListReducer = (
  state: IState = initialState,
  action: ProductDispatchTypes
): IState => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
