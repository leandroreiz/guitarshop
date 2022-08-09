export interface ICart {
  cart: Array<TCartItem>;
  shippingAddress: ICartActionShippingAddress;
}

export interface ICartActionAttributes {
  productId: string;
  quantity: number;
}

export interface ICartActionShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type TCartItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
};
