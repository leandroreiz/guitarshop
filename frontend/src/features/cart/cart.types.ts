export type TCartItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
};

export type TCart = {
  cart: Array<TCartItem>;
};
