import { Document } from 'mongoose';
import { ICartActionShippingAddress, TCartItem } from '../cart/cart.types';
import { TUser } from '../users/users.types';

export interface IOrderObject extends Document {
  orderItems: TCartItem[];
  shippingAddress: ICartActionShippingAddress | undefined;
  paymentMethod: string;
  itemsPrice: number | undefined;
  shippingPrice: number | undefined;
  taxPrice: number | undefined;
  totalPrice: number | undefined;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  createdAt: Date;
  user?: TUser;
}

export interface IOrderState {
  order: IOrderObject;
  isLoading: boolean;
  isSuccess: boolean;
  error?: string | unknown;
}

export interface IOrdersState {
  orders: IOrderObject[];
  isLoading: boolean;
  isSuccess: boolean;
  error?: string | unknown;
}

export interface IOrderPay {
  isLoading: boolean;
  isSuccess: boolean;
  error?: string | unknown;
}
