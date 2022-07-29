import TProduct from '../../../common/types/TProduct';

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

interface IProductRequest {
  type: typeof PRODUCT_LIST_REQUEST;
}

interface IProductSuccess {
  type: typeof PRODUCT_LIST_SUCCESS;
  payload: Array<TProduct>;
}

interface IProductFail {
  type: typeof PRODUCT_LIST_FAIL;
  payload: any;
}

export type TProductAction = IProductRequest | IProductSuccess | IProductFail;
