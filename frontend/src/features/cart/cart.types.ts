export interface ICart {
  cart: {
    cartItems: Array<TCartItem>;
    itemsPrice?: number;
    shippingPrice?: number;
    taxPrice?: number;
    totalPrice?: number;
  };
  shippingAddress?: ICartActionShippingAddress;
  paymentMethod: string;
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
