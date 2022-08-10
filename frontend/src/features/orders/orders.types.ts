import { Document } from 'mongoose';
import { ICartActionShippingAddress, TCartItem } from '../cart/cart.types';

export interface IOrderObject extends Document {
  orderItems: TCartItem[];
  shippingAddress: ICartActionShippingAddress | undefined;
  paymentMethod: string;
  itemsPrice: number | undefined;
  shippingPrice: number | undefined;
  taxPrice: number | undefined;
  totalPrice: number | undefined;
}

export interface IOrderState {
  order: IOrderObject;
  isLoading: boolean;
  isSuccess: boolean;
  error?: string | unknown;
}
