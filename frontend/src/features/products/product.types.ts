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

export type TProductProps = {
  product: TProduct;
};

export type TProductList = {
  isLoading: boolean;
  products: Array<TProduct>;
  error?: string | unknown;
};

export type TProductDetails = {
  isLoading: boolean;
  product: TProduct;
  error?: string | unknown;
};
