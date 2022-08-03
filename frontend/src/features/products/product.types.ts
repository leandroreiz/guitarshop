export interface IProductProps {
  product: TProduct;
}

export interface IProductList {
  isLoading: boolean;
  products: Array<TProduct>;
  error?: string | unknown;
}

export interface IProductDetails {
  isLoading: boolean;
  product: TProduct;
  error?: string | unknown;
}

export type TProduct = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};
