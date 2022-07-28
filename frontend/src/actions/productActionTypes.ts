import TProduct from '../types/TProduct';

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

interface ProductRequest {
  type: typeof PRODUCT_LIST_REQUEST;
}

interface ProductSuccess {
  type: typeof PRODUCT_LIST_SUCCESS;
  payload: Array<TProduct>;
}

interface ProductFail {
  type: typeof PRODUCT_LIST_FAIL;
  payload: any;
}

export type ProductDispatchTypes =
  | ProductRequest
  | ProductSuccess
  | ProductFail;
