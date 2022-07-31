export type TCart = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
};

export type TCartState = {
  cartItems: Array<TCart>;
};
