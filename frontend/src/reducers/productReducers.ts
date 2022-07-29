import IStore from '../store/IStore';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  TProductAction,
} from '../actions/TProductAction';

const initialState: IStore = { loading: false, products: [] };

export const productListReducer = (
  state: IStore = initialState,
  action: TProductAction
) => {
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
