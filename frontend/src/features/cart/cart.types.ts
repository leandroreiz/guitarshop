export interface ICart {
  cart: Array<TCartItem>;
}

export interface ICartActionAttributes {
  productId: string;
  quantity: number;
}

export type TCartItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
};
